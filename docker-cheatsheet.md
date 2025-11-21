# Шпаргалка по Docker для faq-bot

## Базовые команды docker-compose (из корня проекта)

### Запуск сервисов core + db

```bash
docker-compose up --build
```

- Собирает образы (если нужно) и запускает контейнеры.
- `--build` желательно добавлять, когда меняешь зависимости или Dockerfile.

Фоновый запуск:

```bash
docker-compose up -d
```

### Запуск базового compose-файла (новый синтаксис)

```bash
docker compose -f docker-compose.yml up -d --build
```

- Использует только базовый `docker-compose.yml` (без dev-конфига).
- Запускает сервисы в фоне и при необходимости пересобирает образы.

### Остановка

```bash
docker-compose down
```

- Останавливает и удаляет контейнеры, но **не трогает данные БД** (volume `postgres_data`).

Полная остановка с удалением volume (очистка БД):

```bash
docker-compose down -v
```

## Логи

Все сервисы:

```bash
docker-compose logs
```

Стрим логов только core:

```bash
docker-compose logs -f core
```

## Проверка состояния контейнеров

```bash
docker ps
```

Покажет запущенные контейнеры (в том числе `faq-bot-core-1` и `faq-bot-db-1`).

## Зайти внутрь контейнера core

```bash
docker-compose exec core sh
```

После этого ты внутри контейнера `core`:

- можно смотреть файлы: `ls`, `cat main.py`;
- проверять переменные: `env`.

Выйти:

```bash
exit
```

## Хэлсчеки сервиса

Когда `docker-compose up` запущен:

- API здоровья: `http://localhost:8000/health`
- Проверка БД: `http://localhost:8000/db-health`

Если `/db-health` отдаёт ошибку:

- проверь, что сервис `db` запустился без ошибок в логах;
- проверь переменную `DATABASE_URL` в `docker-compose.yml`.

## Полезные одиночные команды Docker

Список всех образов:

```bash
docker images
```

Удалить неиспользуемые образы/контейнеры/кэш (аккуратная чистка):

```bash
docker system prune
```

> Обычно достаточно `docker-compose up/down`. Остальные команды нужны реже — когда хочется посмотреть, что именно запущено или почистить старое.
