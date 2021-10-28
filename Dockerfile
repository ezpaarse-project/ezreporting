FROM node:14.17.6
LABEL maintainer="ezTEAM <ezpaarse@couperin.org>"

RUN useradd -rm -d /home/kbn-dev -s /bin/bash -u 8854 kbn-dev \
  && chown -R kbn-dev /usr/local

USER kbn-dev

RUN mkdir /home/kbn-dev/kibana 

WORKDIR /home/kbn-dev/kibana

RUN git clone --depth 1 --branch 7.14 --single-branch --progress --verbose https://github.com/elastic/kibana .
RUN yarn kbn bootstrap

EXPOSE 5601
EXPOSE 5603

CMD [ "yarn", "start" ]