FROM node:19 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build

FROM nginx:stable
COPY --from=build /app/build /opt/site
COPY nginx.conf /etc/nginx/nginx.conf