From node:current-alpine3.21

WORKDIR /Weather_Frontend

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5173

ENTRYPOINT ["npm","run","dev"]