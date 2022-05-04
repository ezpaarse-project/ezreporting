FROM node:14.17.6
LABEL maintainer="ezTEAM <ezpaarse@couperin.org>"

ARG WEB_SOCKET_PORT
ARG KIBANA_VERSION

RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y dumb-init google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 libxtst6 \
    --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

RUN useradd -rm -d /home/kbn-dev -s /bin/bash -u 8854 kbn-dev \
  && chown -R kbn-dev /usr/local

USER kbn-dev

WORKDIR /home/kbn-dev/kibana

RUN git clone --depth 1 --branch $KIBANA_VERSION --single-branch --progress --verbose https://github.com/elastic/kibana .
RUN yarn kbn bootstrap

EXPOSE 5601
EXPOSE 5603
EXPOSE $WEB_SOCKET_PORT

CMD [ "yarn", "start" ]