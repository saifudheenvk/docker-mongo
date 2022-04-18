FROM node:16-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --frozen-lockfile

EXPOSE 3000

COPY . .

CMD npm run prod