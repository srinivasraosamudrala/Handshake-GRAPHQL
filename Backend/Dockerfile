FROM node:10.15.1
RUN mkdir -p /usr/src/handhsakeFrontEnd
WORKDIR /usr/src/handhsakeFrontEnd
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "node", "index" ]