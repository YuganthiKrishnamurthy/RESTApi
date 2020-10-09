FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node B00839935.js
EXPOSE 3000