FROM node:20-alpine as build

WORKDIR /Weather_Frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5173

ENTRYPOINT ["npm","run","dev"]