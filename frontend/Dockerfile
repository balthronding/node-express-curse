FROM node:latest as node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build -- --prod

FROM nginx:alpine

COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
