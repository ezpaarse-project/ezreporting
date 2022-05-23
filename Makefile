# Makefile ezreporting plugin
include .env

SHELL:=/bin/bash

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

es-start:
	@docker-compose run --rm elastic chown -R elasticsearch /usr/share/elasticsearch/
	@docker-compose up -d elastic

kbn-build:
	@curl -X PUT \
		-d "{ \"password\": \"${ELASTICSEARCH_PASSWORD}\" }" \
		-u "${ELASTICSEARCH_USERNAME}:${ELASTICSEARCH_PASSWORD}" \
		-H 'Content-Type: application/json' \
		http://localhost:9200/_security/user/kibana_system/_password
	@docker-compose build kibana

kbn-start:
	@docker-compose up -d kibana

build:
	@docker-compose run --rm -u kbn-dev kibana bash -c 'cd plugins/ezreporting/; yarn build --kibana-version ${KIBANA_VERSION:-7.14.1}'

.PHONY: help es-start kbn-init kbn-build kbn-start start