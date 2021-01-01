FROM node:14

WORKDIR /usr/src/api
COPY package.json .
COPY ./dist ./dist 
RUN yarn install --only=prod
EXPOSE 3000
CMD [ "yarn", "start:prod" ]
