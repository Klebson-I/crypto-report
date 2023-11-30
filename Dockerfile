FROM node:20.9.0-alpine3.18
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3022
CMD ["node", "dist/main.js"]