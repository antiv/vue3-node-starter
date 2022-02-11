FROM node:14

WORKDIR /node
COPY package.json .
RUN npm install
COPY . .
CMD npm start
