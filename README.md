# Bonanza Herd Management Platform

Bonanza is a ranch and herd management platform to keep track of herd, treatment events and items

## Features
- Postgres
- Dashboard with summary cards
- Animal Management table
- CRUD Table
- Herd based filtering
- Animal detail view
- Dockerized Django backend
- Postgres DB
- External weather API integration
- internal APIs
- MUI APIs

### FRONT END
- React
- MUI

### Backend
- Django
- Django REST Framework
- PostgreSQL

### Infra
- Docker
- Docker Compose

### APIS
- Bonanza custom Django REST API
- Open-Meteo Weather API

## Backend Setup w/Docker
### Prereqs:
- Docker
- Git
- Node.js and npm

### Steps
1. Clone repo
git clone https://github.com/Niesha-Honani/herd-management-platform.git

2. cd /herd-management-platform
3. Start backend and db
docker compose up --build
4. In a new term, run migration
docker compose exec web python manage.py migrate
5. Create superuser or test user:
docker compose exec web python manage.py createsuperuser

## Frontend Setup
1. change dir into frontend directory
cd frontend
2. Install dependencies:
npm install
3. Start the frontend:
npm run dev

## Access Points
- Frontend: https://localhost:5173
- Backend: http://localhost:8000
- Admin: http://localhost:8000/admin

## Demo login
username: skeletor
password: password
