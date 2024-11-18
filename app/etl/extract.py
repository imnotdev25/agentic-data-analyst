import pandas as pd
from sqlalchemy import create_engine

def extract_data(path, table_name, connection_string="sqlite:///flights.db"):
    """
    Loads CSV data from the given path into a pandas DataFrame
    and then writes it to a database table with the specified name.

    Parameters:
    - path: str, the file path to the CSV file.
    - table_name: str, the name of the database table where data will be loaded.
    - connection_string: str, the SQLAlchemy database connection string.

    Returns:
    - None
    """
    engine = create_engine(connection_string)
    try:
        # Read the CSV file into a pandas DataFrame
        df = pd.read_csv(path)
        print(f"CSV data loaded successfully from '{path}'.")


        # Write the DataFrame to a SQL table
        df.to_sql(table_name, con=engine, if_exists='fail', index=False)
        print(f"Data loaded into table '{table_name}' successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        # Dispose the engine
        engine.dispose()
        print("Database engine disposed.")
