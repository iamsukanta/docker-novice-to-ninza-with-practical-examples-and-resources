# Docker in one shot with practical and effictive way

## What is Docker?
- Docker is an open platform for developing, shipping, and running applications. [Official Definition](https://docs.docker.com/get-started/docker-overview/)

## Why you will use Docker?
- Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.
- Save tons of time to developing, shipping applications.
- No matter if you using Windows, Mac, Linux or whatever else.
- If your product runs locally, surely your application will run on production.
- and many more.

## Docker Concepts
- Docker Vs VM
- Docker Volume
- Docker Networking
- Docker Layering

## Docker components
- [Dockerfile](#1-dockerfile)
- [Docker Image](#2-docker-image)
- [Docker Container](#3-docker-container)
- [Dockercompose](#4-dockercompose)

***✅ Steps:***

**Dockerfile** → Needed to create a custom Image.

**Image** → Runs inside a Container.

**Container** → Your running app.

**docker-compose.yml** → Defines and manages multiple containers together!

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

### 4. Dockercompose
- A tool to define and run multi-container Docker apps using a `docker-compose.yml` file.


***Why Needed?***
- To manage complex apps (e.g., web server + database) easily with one command.

Example: `(docker-compose.yml)`

```
version: '3'         # Specify the Docker Compose file format version (v3 is commonly used for production)

services:            # Define a list of services (containers) to run together

  app:               # Name of the first service (you can call it anything)
    build: .         # Build the Docker image from the Dockerfile in the current directory (.)
    ports:
      - "3000:3000"  # Map host port 3000 to container port 3000 (app listens here)

  db:                # Name of the second service (MongoDB database service)
    image: mongo     # Use the official MongoDB image from Docker Hub
    ports:
      - "27017:27017" # Map host port 27017 to container port 27017 (MongoDB default port)

```

**📦 Step-by-Step What Happens:**<br/>
- Docker Compose reads this file.

- It builds the app service from the local Dockerfile.

- It pulls the official mongo image for the db service.

- It starts both containers (app and db) together.

Ports are exposed so you can access:
```
http://localhost:3000 (your app)
mongodb://localhost:27017 (your database)
```


***To start all services:***

```
docker-compose up -d
-------------------------

docker-compose up \  # Start all services defined in docker-compose.yml
  -d                 # Run them in detached/background mode

```

## Docker Commands
- [Docker Images](#docker-images-command)
- [Docker Containers](#docker-containers-command)
- [Docker Compose](#docker-compose-command)
- [Docker Volume](#docker-volume-command)


### Docker Images Command

```
# List all local images | To show all images.
> docker images
> docker image ls (new version command)

# List all images, including intermediate ones.
> docker images -a
> docker image ls -a

# Download an image from Docker Hub.
> docker image pull <image>

# Upload your image to a registry (e.g., Docker Hub).
> docker image push <image>

# Build an image from a Dockerfile and tag it. Here, '.' means current directory
> docker build -t <name>:<tag> .

# Tag a local image for pushing to a registry.
> docker tag <image> <repo>:<tag>

# To remove a specific image. Before running this command make sure your container doesn't depend on this image. You can remove multiple images by adding id or name to the next.
> docker rmi <image id or name> <image id or name>
> docker image rm <image id or name> <image id or name>

# Remove dangling (unused) images.
> docker image prune

# Remove all unused images, not just dangling ones.
> docker image prune -a

# To remove a specific all images. Make sure your any containers doesn't this images. 
> docker rmi $(docker images -q)

# Show detailed JSON info about an image.
> docker image inspect <image>

# Show history of each layer in an image.
> docker image history <image>

# Save an image to a tar archive (for transfer).
> docker save -o <file.tar> <image>

# Load an image from a tar file.
> docker load -i <file.tar>

# Create an alias for an image with a new name or tag.
> docker image tag <source> <target>

```


### Docker Containers Command

```
# To show all running containers. Here, ps stands for process status
> docker ps

# To show all containers both running and stopped conainers
> docker ps -a

# To stop a specific container
> docker stop <container_id or container_name>

# To stop all running containers, here -q means quit mode and it gives containers or image ID
> docker stop $(docker ps -q)

# To start a specific container
> docker start <container_id or container_name>

# To start all stopped container
> docker start $(docker ps -a -q -f status=exited)

# To restart(stop & start) a specific container
> docker restart <container_id or container_name>

# To restart(stop & start) all containers
> docker restart $(docker ps -a -q)

# To delete or remove a specific container
> docker rm <container_id or container_name>

# To remove all containers both running and stopped container. Here first stop all running containers, then remove all containers.
> docker stop $(docker ps -q) && docker rm $(docker ps -a -q)

# If you want to force remove, if container is running. But not recommended this step.
> docker rm -f $(docker ps -a -q)

```

### docker-compose Command

```
# Manually builds the images defined in docker-compose.yml.
> docker-compose build

# If image not build then builds and starts all services in the foreground.
> docker-compose up

# If image not build then builds and starts all services in the detached mode (background).
> docker-compose up -d

# Build all services and starts all services in the detached mode (background).
> docker-compose up -d --build

# Stops and removes all services, networks, and containers created.
> docker-compose down

# Stops and removes all services, networks, containers and related volumes.
> docker-compose down --volumes

# Stops running containers without removing them.
> docker-compose stop

# Starts containers that were stopped (but not removed).
> docker-compose start

# Stops and starts all services (handy for config reloads).
> docker-compose restart

# Displays logs for all services.
> docker-compose logs

# Tails logs (live view) like tail -f.
> docker-compose logs -f

# Lists the status of running services.
> docker-compose ps

# Runs a command inside a running service container (like bash). Here, exec means execution.
> docker-compose exec <service> <command>

# Runs a one-off command in a new container of that service.
> docker-compose run <service> <command>

# Validates and displays the full resolved config (useful for debugging).
> docker-compose config

```

## Docker Volume Command

```
# List all volumes.
> docker volume ls

> Create a new volume.
# docker volume create <name>

# Show detailed info about a volume.
> docker volume inspect <name>

> Remove a volume (only if not in use).
# docker volume rm <name>

# Remove all unused volumes.
> docker volume prune

```