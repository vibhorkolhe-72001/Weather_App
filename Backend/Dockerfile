From node:current-alpine3.21

WORKDIR /Weather_Backend

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

ENTRYPOINT ["npx","nodemon"]