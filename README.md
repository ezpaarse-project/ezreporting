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
$ docker run --rm -v $(pwd)/config:/usr/share/kibana/config docker.elastic.co/kibana/kibana:7.14.2 bin/kibana-keystore create
$ docker run --rm -v $(pwd)/config:/usr/share/kibana/config docker.elastic.co/kibana/kibana:7.14.2 bin/kibana-keystore add elasticsearch.password --stdin ${ELASTICSEARCH_PASSWORD}

# Build Kibana
$ make kbn-build

# Run Kibana
$ make kbn-start
```

Access your Kibana instance through the following url: ``http://localhost:5601/kibana``

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