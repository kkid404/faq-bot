from typing import Tuple

DEMO_BUSINESS = {
    "name": "Салон красоты «Луна»",
    "address": "г. Город, ул. Примерная, 1",
    "schedule": "ежедневно с 10:00 до 21:00",
    "services_summary": "стрижки, укладки, окрашивание, уход за волосами",
    "base_price": 1500,
    "price_link": "https://example.com/luna-prices",
    "contact_channel": "Telegram @luna_salon",
}


INTENTS = {
    "price": {
        "keywords": ["цена", "прайс", "стоимость", "сколько стоит"],
        "template": "Базовая цена услуг в {name} начинается от {base_price} ₽. "
                    "Подробный прайс: {price_link}.",
    },
    "booking": {
        "keywords": ["записаться", "запись", "записать", "запишите"],
        "template": "Записаться в {name} можно, написав в {contact_channel} "
                    "или оставив заявку в форме на сайте.",
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
        "template": "{name} предоставляет услуги: {services_summary}.",
    },
}


def _normalize(text: str) -> str:
    return text.lower().replace("ё", "е")


def _detect_intent(text: str) -> Tuple[str | None, int]:
    norm = _normalize(text)
    best_intent: str | None = None
    best_score = 0

    for name, cfg in INTENTS.items():
        score = sum(1 for kw in cfg["keywords"] if kw in norm)
        if score > best_score:
            best_score = score
            best_intent = name

    return best_intent, best_score


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
    intent, _score = _detect_intent(text)
    return _build_reply(intent)