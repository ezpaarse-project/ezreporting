# Makefile ezreporting plugin
include .env

SHELL:=/bin/bash

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

es-start:
	@docker-compose up -d elastic

kbn-build:
	@docker-compose build kibana

kbn-start:
	@docker-compose up -d kibana

start: kbn-start es-start

build:
	@docker-compose run --rm -u kbn-dev kibana bash -c 'cd plugins/ezreporting/; yarn build --kibana-version ${KIBANA_VERSION}'

.PHONY: help es-start kbn-init kbn-build kbn-start start
