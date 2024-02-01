DOCKER_BIN := `which docker`
DOCKER_COMPOSE_BIN := docker compose

# Colors
end = \033[0m
green = \033[92m
purple = \033[95m

default: help

.PHONY: help
help:
	@echo "$(green)build$(end)                build Dockerfile"
	@echo "$(green)start$(end)                start all containers as daemons"
	@echo "$(green)dev-start$(end)            start all containers"
	@echo "$(green)stop$(end)                 stop all containers"
	@echo "$(green)shell$(end)                bash to container"

.PHONY: build
build:
	$(DOCKER_COMPOSE_BIN) -f docker-compose.yml build --no-cache

.PHONY: start
start:
	$(DOCKER_COMPOSE_BIN) -f docker-compose.yml up -d

.PHONY: dev-start
dev-start:
	$(DOCKER_COMPOSE_BIN) -f docker-compose.yml up

.PHONY: stop
stop:
	$(DOCKER_COMPOSE_BIN) down

.PHONY: shell
shell:
	$(DOCKER_BIN) exec -it sirius-b bash

