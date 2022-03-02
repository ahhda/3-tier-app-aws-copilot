FROM --platform=linux/x86-64 node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080

ENV PORT=8080
ENV DB="postgres://username:password@localhost/database"

ENTRYPOINT ["npm", "start"]
