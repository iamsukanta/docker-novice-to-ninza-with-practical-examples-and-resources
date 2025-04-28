# Docker in one shot with practical and effictive way

## What is Docker?
- Docker is an open platform for developing, shipping, and running applications. [Official Definitation](https://docs.docker.com/get-started/docker-overview/)

## Why you will use Docker?
- Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.
- Save tons of time to developing, shipping applications.
- No matter if you using Windows, Mac, Linux or whatever else.
- If your product runs locally, surely your application will run on production.
- and many more.

## Docker components
- Dockerfile
- Images
- Container
- Dockercompose

### 1. Dockerfile
- A text file with instructions to build a Docker image.
Why Needed?
- Automates image creation
- No need manually setup environments

Examples:

```
# Use the official Node.js 18 image as the base (comes with Node + npm pre-installed)
FROM node:18

# Set the working directory inside the container to /app
WORKDIR /app

# Copy all files from the current directory on your machine to /app in the container
COPY . .

# Install all dependencies listed in package.json
RUN npm install

# Define the command to run when the container starts: "npm start"
CMD ["npm", "start"]

```
Quick Summary:
FROM → Selects the base environment.
WORKDIR → Where future commands will run inside container.
COPY → Transfers your project files into the container.
RUN → Executes installation commands during image build.
CMD → Defines what should happen when the container runs.