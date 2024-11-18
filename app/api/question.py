from fastapi import APIRouter

from app.models.api_models import Input
from app.crew_init import crew_delegate

question_router = APIRouter()


@question_router.post("/questions")
def create_question(data: Input):
    result = crew_delegate({
        "question": data.question
    })
    return result.json_dict


# @question_router.options("/questions",status_code=204)
# def options_question():
#     return {"Access-Control-Allow-Methods": "POST, GET"}


