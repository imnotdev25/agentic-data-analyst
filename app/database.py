from langchain_community.utilities.sql_database import SQLDatabase


db = SQLDatabase.from_uri("sqlite:///flights.db")