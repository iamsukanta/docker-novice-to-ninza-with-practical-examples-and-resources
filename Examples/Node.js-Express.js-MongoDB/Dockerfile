FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Install nodemon globally (optional but sometimes convenient)
RUN npm install -g nodemon

# Default command (overridable in docker-compose)
CMD ["npm", "run", "dev"]