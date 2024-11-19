from textwrap import dedent

from crewai import Agent, Crew, Process, Task

from app.llms.azure_openai import llm, azure_llm
from app.tools.sql_tools import list_tables, tables_schema, execute_sql
from app.models.crew_response import CrewResponse

sql_dev = Agent(
    role="Senior Database Developer",
    goal="Construct and execute SQL queries based on a request",
    backstory=dedent(
    """
        You are an experienced database engineer who is master at creating efficient and complex SQL queries.
        You have a deep understanding of how different databases work and how to optimize queries.
        Use the `list_tables` to find available tables.
        Use the `tables_schema` to understand the metadata for the tables.
        Use the `execute_sql` to check your queries for correctness.

    """
    ),
    llm=azure_llm,
    max_iter=3,
    tools=[list_tables, tables_schema, execute_sql],
    allow_delegation=False,
)

data_analyst = Agent(
    role="Senior Data Analyst",
    goal="You receive data from the database developer and analyze it",
    backstory= dedent(
        """
        You have deep experience with analyzing datasets using Python.
        Your work is always based on the provided data and is clear,
        easy-to-understand and to the point. You have attention
        to detail and always produce very detailed work (as long as you need).
    """
    ),
    max_iter=4,
    llm=azure_llm,
    allow_delegation=False,
)


report_writer = Agent(
    role="Senior Report Editor",
    goal="Write an executive summary type of report based on the work of the analyst",
    backstory=dedent(
        """
        Your writing still is well known for clear and effective communication.
        You always summarize long texts into bullet points that contain the most
        important details.
        
        Return your report in json format.
        - summary: A short summary of the report
        - visuals: Any visuals that you think are important for the report use only if needed.
            Return the visuals in a dictionary format.
            like:
            [
            - type: pie or bar or line
            - data: data for the visual ( x and y axis, x and y numerical values only, for pie chart x is main & labels are secondary)
            - title: title of the visual
            ] use if multiple visuals are needed.
        
        """
    ),
    max_iter=4,
    llm=azure_llm,
    allow_delegation=False,
)

etl_dev = Agent(
    role="Senior ETL Developer",
    goal="Extract, Transform and Load data from different sources",
    backstory=dedent(
        """
        You are an experienced ETL developer with a deep understanding of how to extract data from different sources,
        transform it and load it into a database. You have experience with different ETL tools and can write custom
        scripts to extract data from different sources. You can clean and transform data to make it ready for analysis.
        Use the `list_tables` to find available tables.
        Use the `tables_schema` to understand the metadata for the tables.
        Use the `execute_sql` to check your queries for correctness.
        """
    ),
    max_iter=2,
    tools=[list_tables, tables_schema, execute_sql],
    llm=azure_llm,
    allow_delegation=False,
)

etl_data = Task(
    description=dedent("""
        Extract data from the source and load it into the database.
        First Check for missing data use mean or median to fill the missing data according to the column type numeric or categorical.
        Then load the data into the database.
    """),
    expected_output="Database result for the query",
    agent=etl_dev,
)

extract_data = Task(
    description="Extract data that is required for the query {question}.",
    expected_output="Database result for the query",
    agent=sql_dev,
)
analyze_data = Task(
    description="Analyze the data from the database and write an analysis for {question}.",
    expected_output="Detailed analysis text",
    agent=data_analyst,
    context=[extract_data],
)

write_report = Task(
    description=dedent(
        """
        Write an executive summary of the report from the analysis. The report
        must be less than 250 words.
    """
    ),
    output_json=CrewResponse,
    expected_output="Json report",
    agent=report_writer,
    context=[analyze_data],
)

crew = Crew(
    agents=[sql_dev, data_analyst, report_writer],
    tasks=[extract_data, analyze_data, write_report],
    process=Process.sequential,
    verbose=True,
    memory=False,
    output_log_file="crew.log",
)

etl_crew = Crew(
    agents=[etl_dev],
    tasks=[etl_data],
    process=Process.sequential,
    verbose=True,
    memory=False,
    output_log_file="etl_crew.log",
)


def etl_crew_delegate():
    result = etl_crew.kickoff()
    return result


def crew_delegate(inputs: dict):
    result = crew.kickoff(inputs=inputs)
    return result

