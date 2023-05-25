# Base image
FROM node:alpine3.17

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./


# Install app dependencies
RUN npm install

# Bundle app source
COPY . .


# Creates a "dist" folder with the production build
RUN npm run build


COPY wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh


CMD [ "./wait-for-it.sh", "users_db:5432", "--", "npm", "run", "migration:up", "--","node", "dist/main.js" ]