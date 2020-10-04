FROM node:alpine3.12 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine3.12
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY --from=builder /usr/app/build ./build
COPY .env .
COPY ormconfig.docker.json ./ormconfig.json
EXPOSE 3000
CMD npm run start