FROM node:20.12-alpine

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]