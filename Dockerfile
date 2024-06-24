FROM node:latest

WORKDIR /api

COPY . .

RUN rm -rf node_modules
RUN npm i
RUN npm run build

EXPOSE 3001

CMD ["npm", "start", "build"]