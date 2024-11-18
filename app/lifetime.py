from fastapi import FastAPI

from app.config import settings
from app.etl.extract import extract_data


def startup(app: FastAPI):
    async def _startup():
        extract_data(path='data/flight.csv', table_name=settings.DB_TABLES[0])
        extract_data(path='data/flight-name.csv', table_name=settings.DB_TABLES[1])
        # etl_crew_delegate()


    return _startup


def shutdown(app: FastAPI):
    async def _shutdown():
        pass
    return _shutdown
