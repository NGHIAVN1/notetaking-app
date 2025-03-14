FROM node

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY /src/configs/.env ./

COPY . .

EXPOSE 5000


CMD ["npm", "start"]