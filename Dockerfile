FROM node:18

WORKDIR /usr/src/app

COPY package.json .
COPY . .

RUN npm install

ENV DESTINATION_PATH=/usr/src/files
VOLUME $DESTINATION_PATH

RUN npm run build
CMD ["npm", "run", "start"]
