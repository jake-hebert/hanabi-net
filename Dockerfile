FROM node:13.12-alpine
WORKDIR /hanabi-net
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
EXPOSE 3000
CMD ["npm", "start"]
