FROM python:3.11

RUN echo "deb http://deb.debian.org/debian/ unstable main contrib non-free" >> /etc/apt/sources.list.d/debian.list
RUN apt-get update && apt-get install -y wget curl

RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

WORKDIR /app

COPY pyproject.toml poetry.lock ./
COPY data/ /app/data/

RUN poetry install --no-root --only main

ENV PYTHONPATH=/app

COPY app/ /app/app/

COPY ./docker-entrypoint.sh /app/

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT [ "sh", "/app/docker-entrypoint.sh" ]

EXPOSE 8000