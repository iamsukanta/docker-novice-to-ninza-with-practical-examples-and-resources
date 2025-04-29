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
- [Dockerfile](#1-dockerfile)
- [Docker Image](#2-docker-image)
- Docker Container
- Dockercompose

### 1. Dockerfile
- A text file with instructions to build a Docker image.

***Why Needed?***
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
**Quick Summary:**<br/>
**FROM** → Selects the base environment.<br/>
**WORKDIR** → Where future commands will run inside container.<br/>
**COPY** → Transfers your project files into the container.<br/>
**RUN** → Executes installation commands during image build.<br/>
**CMD** → Defines what should happen when the container runs.<br/>

### 2. Docker Image
- A snapshot (template) of an application, including code, libraries, and dependencies.

***Why Needed?***
- You can share and run your app anywhere, anytime.
- No need manually setup environments.

Examples:  
Node.js app image, Python app image, Nginx server image, Your custom app image, etc.

***How to build a Docker Image***
```
docker build -t myapp .
```
> Build an image using the current folder and name it myapp. Here, `-t` means `tag` and is used for image versions. If you don't use tag, it will automatically define `latest` tag. 

**Note**
- Images are **immutable** (they don't change once built, if you want to change you have to built new image).

### 3. Docker Container
- A running instance of an image.

***Why Needed?***
- To execute the app in an isolated, lightweight environment.

Examples:
A Node.js server running inside a container.

```
docker run -d -p 3000:3000 myapp
--------------------------------------------------------------
docker run \
  -d           # Run in detached (background) mode
  -p 3000:3000 # Map host port 3000 to container's port 3000
  myapp        # Use the 'myapp' image to create the container
```

**Note**
- Containers can be stopped, started, deleted easily.
