from typing import Any, Dict

from crewai_tools import tool
from langchain_community.tools.sql_database.tool import (
    InfoSQLDatabaseTool,
    ListSQLDatabaseTool,
    QuerySQLDataBaseTool,
)

from app.database import db


@tool("list_tables")
def list_tables(config: Dict[str, Any] = None) -> str:
    """
    List the available tables in the database.
    This function returns a list of tables from the connected database.

    Args:
        config (Dict[str, Any], optional): A dictionary for any configuration options needed for listing tables.

    Returns:
        str: A string representation of the available tables in the database.
    """
    if config is None:
        config = {}
    db_tool = ListSQLDatabaseTool(db=db, config=config)  # Passing config if necessary
    return db_tool.invoke("")

@tool("execute_sql")
def execute_sql(sql_query: str) -> str:
    """Execute a SQL query against the database. Returns the result"""
    return QuerySQLDataBaseTool(db=db).invoke(sql_query)


@tool("tables_schema")
def tables_schema(tables: str) -> str:
    """
    Input is a comma-separated list of tables, output is the schema and sample rows
    for those tables. Be sure that the tables actually exist by calling `list_tables` first!
    Example Input: table1, table2, table3
    """
    tool_ = InfoSQLDatabaseTool(db=db)
    return tool_.invoke(tables)

