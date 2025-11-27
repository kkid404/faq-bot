FROM python:3.11-slim

WORKDIR /app

# Устанавливаем зависимости
COPY core/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir requests

# Копируем исходники сервиса
COPY core /app

# Запускаем uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]