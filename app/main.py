from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.base import base_router
from app.api.question import question_router
from app.lifetime import startup, shutdown

app = FastAPI()

app.add_event_handler("startup", startup(app))
app.add_event_handler("shutdown", shutdown(app))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    expose_headers=["*"],
)


app.include_router(base_router)
app.include_router(question_router, tags=["question"])
