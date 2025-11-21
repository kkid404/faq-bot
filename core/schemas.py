from pydantic import BaseModel


class DemoMessageRequest(BaseModel):
    session_id: str
    text: str


class DemoMessageResponse(BaseModel):
    reply_text: str