from crewai import LLM

from app.config import settings

azure_llm = LLM(
    model=settings.AZURE_MODEL_NAME ,
    api_key=settings.AZURE_API_KEY,
    api_base=settings.AZURE_API_BASE,
    api_version=settings.AZURE_API_VERSION,
)

llm = LLM(
    model=settings.OPENAI_MODEL_NAME,
    api_key=settings.OPENAI_API_KEY,
)
