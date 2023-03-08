FROM alpine
RUN apk add --update nodejs npm
RUN apk add git && git clone 'https://github.com/SergioRubio99/NodeJS-Scraper' && cd NodeJS-Scraper
WORKDIR /NodeJS-Scraper
RUN npm i
EXPOSE 3000
