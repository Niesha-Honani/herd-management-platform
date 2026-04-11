# Stop and remove all containers, networks
docker compose down

# remove volumes so the DB starts fresh - careful with this in production - all data will be lost - comment out if not desired
docker compose down -v --remove-orphans

# nuke any dangling images to free up space
# docker system prune -f  <-- user when disk space is ballooning. Builds are acting weird due to cached layers. You want the freshest build possible. it doesn't remove volumes however.

# docker container prune -f removes stopped containers only with EXITED status
docker container prune -f
# docker volume prune -f removes dangling volumes not associated with any containers
docker network prune -f
