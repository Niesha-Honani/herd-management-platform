#!/bin/bash
set -e

docker compose up -d --build
# make sure the postgres container is ready, then run migrations
sleep 5
docker compose exec web python manage.py makemigrations 
docker compose exec web python manage.py migrate
docker compose exec web python manage.py createsuperuser
docker compose ps
docker compose start