# ezreporting

## Prerequisites
[Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/)

## Installation & configuration

```bash
# Clone repository
$ git clone https://github.com/ezpaarse-project/ezreporting.git
$ cd ezreporting

# Source  environnement variables
$ source .env

# Run ElasticSearch
$ make es-start

# Set kibana_system user password
$ docker run --rm -it -v $(pwd)/config:/usr/share/kibana/config docker.elastic.co/kibana/kibana:7.14.2 bin/kibana-keystore create
$ docker run --rm -it -v $(pwd)/config:/usr/share/kibana/config docker.elastic.co/kibana/kibana:7.14.2 bin/kibana-keystore add elasticsearch.password

> Enter value for elasticsearch.password: # enter default password (changeme) or your password if you have changed it

# Build Kibana
$ make kbn-build

# Give permissions to the docker user (kbn-dev)
$ docker-compose run --rm -u kbn-dev kibana chown kbn-dev -R /home/kbn-dev/kibana/plugins

# Run Kibana
$ make kbn-start
```

Access your Kibana instance through the following url: ``http://localhost:5603/kibana``

## Build plugin

```bash
$ make build
```

A ``.zip`` archive will be generated and will be located in the ``src/build`` folder

An output filed

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
| ELASTICSEARCH_PASSWORD | ElasticSearch user password ``(default: changeme)`` |