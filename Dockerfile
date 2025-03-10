FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["node","build/index.js"]
