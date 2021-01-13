# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/config /etc/nginx/conf.d
COPY --from=build-stage /app/nginx/certs /certs
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]