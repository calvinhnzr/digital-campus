FROM node:19.6.0

# Create app directory
WORKDIR /usr/src/app/auth_service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install && npm cache clean --force
# If you are building your code for production
# RUN npm ci --only=production

ENV PATH=/usr/src/auth_service/node_modules/.bin:$PATH

WORKDIR /usr/src/app/auth_service/src

# Bundle app source
COPY ./ ./

EXPOSE 8002
CMD [ "npm", "run", "start:dev" ]