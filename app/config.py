from typing import Any

from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
    )

    # FastAPI Settings
    PROJECT_NAME: str = "Agents API"
    STACK_NAME: str = "fastapi-ai-agents"

    # Database
    DB_LOADED: bool = False
    DB_NAME: str = "flights"
    DB_TABLES: list[str] = ["flights", "flights-id"]

    # CrewAI
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_TRACING_V2: str = "true"
    OPENAI_MODEL_NAME: str = "gpt-4-turbo"
    OPENAI_API_KEY: str

    # Azure OpenAI
    AZURE_API_BASE: str = ""
    AZURE_API_KEY: str = ""               # "my-azure-api-key"
    AZURE_API_VERSION: str = ""                 # "2023-05-15"
    AZURE_MODEL_NAME: str = "azure/gpt4o"                 # "my-azure-model-name"


settings = Settings()
