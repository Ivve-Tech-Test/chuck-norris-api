FROM node:latest

WORKDIR /app

COPY ./* .

RUN npm install

RUN npm run build

EXPOSE 3002

CMD [ "node", "dist/main.js" ]
