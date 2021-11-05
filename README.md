# ezreporting

## Prerequisites
[Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/)
[Yarn](https://yarnpkg.com/)

## Installation & configuration

```bash
# Clone repository
$ git clone https://github.com/ezpaarse-project/ezreporting.git
$ cd ezreporting

# Source  environnement variables
$ source .env

# Run ElasticSearch
$ make es-start

# Build Kibana
$ make kbn-build

# Give permissions to the docker user (kbn-dev)
$ docker-compose run --rm -u kbn-dev kibana chown kbn-dev -R /home/kbn-dev/kibana/plugins

# Run Kibana
$ make kbn-start

# Install plugin dependencies
$ cd src; yarn install
```

Access your Kibana instance through the following url: ``http://localhost:5603/kibana``

## Build plugin

```bash
$ make build
```

A ``.zip`` archive will be generated and will be located in the ``src/build`` folder

## Publish a new release

```bash
$ cd ./src
$ npm version (major|minor|patch)

$ gh login
$ gh release create <tag> # eg: gh release create v2.0.0
$ gh release upload <tag> <file> # eg: gh release upload v2.0.0 ./src/build/ezReporting-7.14.zip 
```

## Installation in Kibana

You need to run the following command at the location where you installed Kibana

```bash
$ bin/kibana-plugin install https://github.com/ezpaarse-project/ezreporting/releases/download/vX.X.X/ezReporting-7.14.zip
```


### Environnement variables

| Name | Description |
| --- | --- |
| CLUSTER_NAME | ElasticSearch cluster name ``(default: ezreoporting)`` |
| DISCOVERY_TYPE | Specifies whether Elasticsearch should form a multiple-node cluster ``(default: single-node)`` |
| BOOTSTRAP_MEMORY_LOCK | The memory lock check verifies that if the bootstrap.memory_lock setting is enabled ``(default: true)`` |
| XPACK_SECURITY_ENABLED | By default, Kibana automatically detects whether to enable the security features based on the license and whether Elasticsearch security features are enabled ``(default: true)`` |
| ES_JAVA_OPTS | Set the JVM heap size ``(default: -Xms2g -Xmx2g)`` |
| ES_MEM_LIMIT | Set the JVM heap size ``(default: 4g)`` |
| KIBANA_SYSTEM | Kibana system user ``(default: kibana_system)`` |
| ELASTICSEARCH_USERNAME | ElasticSearch username ``(default: elastic)`` |
| ELASTICSEARCH_PASSWORD | ElasticSearch user password ``(default: changeme)`` |