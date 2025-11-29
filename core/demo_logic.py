from typing import Tuple
import re

DEMO_BUSINESS = {
    "name": "Салон красоты «Луна»",
    "address": "г. Город, ул. Примерная, 1",
    "schedule": "ежедневно с 10:00 до 21:00",
    "services_summary": (
        "дневной и вечерний макияж, свадебный макияж невесты, макияж для фотосессий, "
        "коррекция бровей, макияж + лёгкая укладка, а также пробные варианты образа"
    ),
    "base_price": 1500,
    "price_day": 2000,
    "price_evening": 2500,
    "price_wedding": 5000,
    "price_photoshoot": 3000,
    "price_brows": 1200,
    "price_link": "https://example.com/luna-prices",
    "contact_channel": "Telegram @luna_salon",
    "duration_day": 60,  # минуты
    "duration_evening": 75,
    "duration_wedding": 120,
    "duration_photoshoot": 90,
    "duration_brows": 30,
}


# Простое хранилище состояния записи по session_id для демо-режима
BOOKING_STATE: dict[str, dict[str, str]] = {}

INTENTS = {
    "price": {
        "keywords": ["цена", "прайс", "стоимость", "сколько стоит"],
        "template": "Базовая цена услуг в {name} начинается от {base_price} ₽. "
                    "Подробный прайс: {price_link}.",
    },
    "booking": {
        "keywords": ["записаться", "запись", "записать", "запишите"],
        "template": (
            "Вы можете оставить здесь заявку на запись в {name}: напишите, пожалуйста, своё имя, желаемую дату и время, "
            "формат услуги (например, дневной, вечерний или свадебный макияж) и удобный способ связи. "
            "Я передам ваши данные администратору, и он свяжется с вами для подтверждения. При желании вы также можете написать напрямую в {contact_channel}."
        ),
    },
    "duration": {
        "keywords": [
            "сколько по времени",
            "сколько длится",
            "по времени",
            "длительность",
            "долго ли",
        ],
        "template": (
            "По длительности услуги в {name} выглядят так: дневной макияж — примерно {duration_day} минут, "
            "вечерний макияж — около {duration_evening} минут, свадебный образ невесты — примерно {duration_wedding} минут, "
            "макияж для фотосессии — около {duration_photoshoot} минут, коррекция бровей — примерно {duration_brows} минут. "
            "Точное время всегда зависит от задач и исходных данных, но эти оценки помогут при планировании."
        ),
    },
    "address": {
        "keywords": ["адрес", "где находитесь", "как добраться"],
        "template": "{name} находится по адресу: {address}.",
    },
    "schedule": {
        "keywords": ["график", "режим работы", "во сколько", "часы работы"],
        "template": "{name} работает {schedule}.",
    },
    "services": {
        "keywords": ["услуги", "что делаете", "что вы делаете"],
        "template": (
            "{name} предоставляет такие услуги, как {services_summary}. "
            "Можете спросить про конкретный формат — например, свадебный макияж, макияж для фотосессии "
            "или макияж с выездом, и я подскажу детали."
        ),
    },
}


def _normalize(text: str) -> str:
    return text.lower().replace("ё", "е")


def _detect_intent(session_id: str, text: str) -> Tuple[str | None, int]:
    norm = _normalize(text)

    best_intent: str | None = None
    best_score = 0

    for name, cfg in INTENTS.items():
        score = sum(1 for kw in cfg["keywords"] if kw in norm)
        if score > best_score:
            best_score = score
            best_intent = name

    # Если явно выбрали сценарий записи, помечаем его как активный для этой сессии
    if best_intent == "booking":
        state = BOOKING_STATE.setdefault(session_id, {})
        state["active"] = "1"

    # Если по ключевым словам ничего не нашли, но сообщение похоже на данные для записи,
    # считаем это продолжением сценария записи.
    if best_intent is None:
        has_time = _extract_time(text) is not None
        has_contact = bool(re.search(r"@|\+?\d{7,}", text))
        has_date_like = bool(re.search(r"\b\d{1,2}[./-]\d{1,2}\b", text))

        # если есть время, контакт или что-то похожее на дату — считаем, что это продолжение записи
        if has_time or has_contact or has_date_like:
            best_intent = "booking"
            best_score = 1
            state = BOOKING_STATE.setdefault(session_id, {})
            state["active"] = "1"

    # Если интент всё ещё не распознан, но по сессии уже идёт сценарий записи,
    # то считаем, что это продолжение записи (человек, например, пишет только имя).
    if best_intent is None:
        state = BOOKING_STATE.get(session_id)
        if state and state.get("active"):
            best_intent = "booking"
            best_score = 1

    return best_intent, best_score


def _extract_time(text: str) -> str | None:
    """Вытащить первое время формата ЧЧ:ММ из текста, если оно есть."""
    match = re.search(r"\b(\d{1,2}:\d{2})\b", text)
    if not match:
        return None
    return match.group(1)


def _build_price_reply(norm_text: str) -> str:
    """Построить ответ по цене, учитывая, какую услугу спросили."""
    name = DEMO_BUSINESS["name"]
    link = DEMO_BUSINESS["price_link"]

    if "вечерн" in norm_text:
        return (
            f"В {name} вечерний макияж стоит от {DEMO_BUSINESS['price_evening']} ₽. "
            f"Подробный прайс и дополнительные опции можно посмотреть здесь: {link}."
        )
    if "дневн" in norm_text or "нюд" in norm_text:
        return (
            f"Дневной/нюдовый макияж в {name} стоит от {DEMO_BUSINESS['price_day']} ₽. "
            f"Полный прайс по другим форматам макияжа доступен по ссылке: {link}."
        )
    if "свадеб" in norm_text or "невест" in norm_text:
        return (
            f"Свадебный макияж невесты в {name} стоит от {DEMO_BUSINESS['price_wedding']} ₽. "
            f"В прайсе по ссылке {link} есть детали по пробному макияжу и дополнительным услугам."
        )
    if "фотосес" in norm_text or "фотосъе" in norm_text or "фото" in norm_text:
        return (
            f"Макияж для фотосессии в {name} стоит от {DEMO_BUSINESS['price_photoshoot']} ₽. "
            f"Точный прайс и варианты пакетов см. здесь: {link}."
        )
    if "бров" in norm_text:
        return (
            f"Коррекция бровей в {name} стоит от {DEMO_BUSINESS['price_brows']} ₽. "
            f"Подробнее о ценах можно посмотреть в прайсе: {link}."
        )

    # если конкретная услуга не распознана, даём общий ответ по базовой цене
    template = INTENTS["price"]["template"]
    return template.format(**DEMO_BUSINESS)


def _build_booking_reply(session_id: str, text: str) -> str:
    """Имитация записи с ограниченной доступностью времени с простым стейтом по сессии."""
    name = DEMO_BUSINESS["name"]
    contact = DEMO_BUSINESS["contact_channel"]

    state = BOOKING_STATE.setdefault(session_id, {})

    # Парсим время и контакт из текущего сообщения
    time_in_msg = _extract_time(text)
    contact_match = re.search(r"(@\S+|\+?\d{7,})", text)
    contact_in_msg = contact_match.group(1) if contact_match else None

    # Обновляем состояние, если что-то новое пришло
    if time_in_msg:
        state["time"] = time_in_msg
    if contact_in_msg:
        state["contact"] = contact_in_msg

    time_str = state.get("time")
    contact_str = state.get("contact")

    if not time_str and not contact_str:
        # почти нет структурированных данных — используем базовый текст с инструкцией
        template = INTENTS["booking"]["template"]
        return template.format(**DEMO_BUSINESS)

    if time_str and not contact_str:
        # знаем время, но не знаем, как связаться
        return (
            f"Я вижу время {time_str} для записи в {name}. "
            f"Пожалуйста, напишите ещё ваш удобный способ связи (телефон или @ник), "
            f"чтобы администратор смог подтвердить запись. При желании можно написать сразу в {contact}."
        )

    if contact_str and not time_str:
        # есть контакт, но нет времени — просим его указать
        return (
            f"Спасибо, контакт {contact_str} я записал. Чтобы передать заявку в {name}, напишите, пожалуйста, "
            f"желаемую дату и время, а также формат услуги (например, дневной, вечерний или свадебный макияж)."
        )

    # Простое правило: чётные часы считаем занятыми, нечётные — свободными.
    hour_str = time_str.split(":")[0]
    try:
        hour = int(hour_str)
    except ValueError:
        hour = None

    if hour is not None and hour % 2 == 0:
        # В это время "нет мест" — предлагаем пару альтернативных слотов
        alt1 = f"{max(hour - 1, 8):02d}:00"
        alt2 = f"{min(hour + 1, 21):02d}:00"
        return (
            f"На {time_str} у {name} уже нет свободных слотов. "
            f"Могу предложить ближайшие варианты: {alt1} или {alt2}. "
            f"Если один из вариантов вам подходит, напишите его вместе с именем и контактом — "
            f"я передам заявку администратору. Также вы всегда можете написать напрямую в {contact}."
        )

    # Время считаем условно свободным и контакт уже есть — финальное подтверждение.
    # После этого очищаем стейт, чтобы следующая запись начиналась с нуля.
    BOOKING_STATE.pop(session_id, None)

    return (
        f"Я зафиксировал вашу заявку в {name}: время {time_str}, контакт {contact_str}. "
        f"Передам данные администратору, он свяжется с вами для подтверждения. "
        f"Если потребуется, вы также можете написать напрямую в {contact}."
    )


def _build_reply(intent: str | None) -> str:
    if intent is None:
        return (
            "Я могу помочь с ценами, записью, адресом, режимом работы и услугами салона. "
            "Пожалуйста, уточните, что именно вас интересует: цена, запись, адрес, график или услуги?"
        )

    template = INTENTS[intent]["template"]
    return template.format(**DEMO_BUSINESS)


def process_demo_message(session_id: str, text: str) -> str:
    # session_id пока не используем, но оставляем для будущей логики
    intent, _score = _detect_intent(session_id, text)

    if intent == "price":
        norm_text = _normalize(text)
        return _build_price_reply(norm_text)

    if intent == "booking":
        return _build_booking_reply(session_id, text)

    return _build_reply(intent)