FROM --platform=linux/x86-64 node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80

ENV PORT=80
ENV API_HOST=localhost:8080

ENTRYPOINT ["npm", "start"]
