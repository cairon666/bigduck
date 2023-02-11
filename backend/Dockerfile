FROM node:19-buster-slim as build

WORKDIR /usr/src/app

# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package.json yarn.lock ./

RUN yarn
RUN npm install
# https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable
# RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]