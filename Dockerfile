FROM node:14

WORKDIR /server

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 6969

CMD ["pm2-runtime", "ecosystem.config.js"]
