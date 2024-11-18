from pydantic import BaseModel

class Input(BaseModel):
    question: str

class Output(BaseModel):
    summary: str
    dataset: dict
    visuals: dict