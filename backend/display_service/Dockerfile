FROM --platform=linux/amd64 node:19.6.0

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app/display_service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install && npm cache clean --force
# If you are building your code for production
# RUN npm ci --only=production

ENV PATH=/usr/src/display_service/node_modules/.bin:$PATH

WORKDIR /usr/src/app/display_service/src

# Bundle app source
COPY ./ ./

EXPOSE 8001
CMD [ "npm", "run", "start:dev" ]