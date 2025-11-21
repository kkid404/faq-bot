from fastapi import APIRouter

from schemas import DemoMessageRequest, DemoMessageResponse
from demo_logic import process_demo_message

router = APIRouter()


@router.post("/demo/message", response_model=DemoMessageResponse)
def demo_message(payload: DemoMessageRequest) -> DemoMessageResponse:
    reply_text = process_demo_message(payload.session_id, payload.text)
    return DemoMessageResponse(reply_text=reply_text)