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

### Environnement variables (Production)

| Name | Description |
| --- | --- |
| EZREPORTING_APPLICATION_NAME | Reporting plugin name displayed in Kibana ``(default: ezReporting)`` |
| EZREPORTING_APPLICATION_URL | Reporting application URL used in mail ``(default: http://localhost:5601/kibana)`` |
| EZREPORTING_FREQUENCIES | Task ferequenices |
| EZREPORTING_CRON | CRON to start generation task ``(default: 0 0 1 * * *)`` |
| EZREPORTING_PUPPETEER_TIMEOUT | Timeout for puppeteer ``(default: 60000)`` |
| EZREPORTING_SMTP_HOST | SMTP Server host ``(default: localhost)`` |
| EZREPORTING_SMTP_PORT | SMTP Server port ``(default: 25)`` |
| EZREPORTING_SMTP_SECURE | SMTP secure ``(default: false)`` |
| EZREPORTING_SMTP_IGNORE_TLS | SMTP ignore TLS ``(default: false)`` |
| EZREPORTING_SMTP_REJECT_UNAUTHORIZED | SMTP reject unauthorized ``(default: false)`` |
| EZREPORTING_SMTP_AUTH_USER | SMTP auth user ``(default: null)`` |
| EZREPORTING_SMTP_AUTH_PASSWORD | SMTP auth password ``(default: null)`` |
| EZREPORTING_EMAIL_ATTEMPTS | Email attempts ``(default: 5)`` |
| EZREPORTING_EMAIL_INTERVAL | Email interval attempts ``(default: 2000)`` |
| EZREPORTING_EMAIL_COLOR | Email banner color ``(default: #2980b9)`` |
| EZREPORTING_EMAIL_BACKGROUND_COLOR | Email background color ``(default: #2980b9)`` |
| EZREPORTING_TWITTER | Twitter URL ``(default: <empty>)`` |
| EZREPORTING_GITHUB | GitHub URL ``(default: <empty>)`` |
| EZREPORTING_YOUTUBE | Youtube URL ``(default: <empty>)`` |
| EZREPORTING_EMAIL_CONTACT | ezReporting email contact ``(default: reporting@ezreporting.org)`` |
| EZREPORTING_EMAIL_SENDER | ezReporting email sender ``(default: reporting@ezreporting.org)`` |
| EZREPORTING_INDEX | ezReporting index task name ``(default: .ezreporting)`` |
| EZREPORTING_HISTORY_INDEX | ezReporting index task history name ``(default: .ezreporting-history)`` |
| EZREPORTING_ACTIVITY_INDEX | ezReporting index task activity name ``(default: .ezreporting-activity)`` |
| EZREPORTING_ROLE_NAME | ezReporting role name (used for all and read only) ``(default: ezreporting)`` |
| ELASTICSEARCH_BASE_URL | ElasticSearch base URL ``(default: http://elastic:9200)`` |
| ELASTICSEARCH_USERNAME | ElasticSearch username ``(default: elastic)`` |
| ELASTICSEARCH_PASSWORD | ElasticSearch password ``(default: changeme)`` |
| EZREPORTING_KIBANA_INTERNAL_URL | Kibana internal URL (for API request) ``(default: http://localhost:5601/kibana)`` |
| EZREPORTING_KIBANA_EXTERNAL_URL | Kibana external URL (for email URl) ``(default: http://localhost:5601/kibana)`` |
| EZREPORTING_LOGOS | Logos displayed in report footer ``(default: [ { file: 'images/logo.png', link: 'kibana' } ])`` |
| EZREPORTING_WEB_SOCKET_PORT | WebSocket port ``(default: 3000)`` |

## Environnement variables (Development)

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
