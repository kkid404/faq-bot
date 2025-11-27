from fastapi import APIRouter, HTTPException

from schemas import LandingLead
from telegram_client import TelegramConfigError, send_telegram_message


router = APIRouter()


@router.post("/landing/lead")
def landing_lead(payload: LandingLead) -> dict:
    contact = payload.contact.strip()
    if not contact:
        raise HTTPException(status_code=400, detail="contact must not be empty")

    text = f"Новая заявка с лендинга FAQ-бота:\n{contact}"

    try:
        send_telegram_message(text)
    except TelegramConfigError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"Telegram error: {e}") from e

    return {"status": "ok"}
