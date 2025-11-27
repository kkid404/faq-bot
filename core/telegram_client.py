# core/telegram_client.py

import os
from typing import Optional

import requests


class TelegramConfigError(RuntimeError):
    pass


def _get_bot_token() -> str:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise TelegramConfigError("TELEGRAM_BOT_TOKEN is not set")
    return token


def _get_chat_id() -> str:
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if not chat_id:
        raise TelegramConfigError("TELEGRAM_CHAT_ID is not set")
    return chat_id


def send_telegram_message(text: str, chat_id: Optional[str] = None) -> None:
    """Отправить текстовое сообщение в Telegram.

    Бросает TelegramConfigError, если не настроены переменные окружения,
    и requests.HTTPError, если Telegram API вернул ошибку.
    """

    token = _get_bot_token()
    target_chat_id = chat_id or _get_chat_id()

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {"chat_id": target_chat_id, "text": text}

    resp = requests.post(url, json=payload, timeout=10)
    resp.raise_for_status()

    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(f"Telegram API error: {data}")
