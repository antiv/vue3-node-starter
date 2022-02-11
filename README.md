# Docker Compose Nodejs MySQL Vue3 example

based on examples from https://www.bezkoder.com/

[Vue 3 CRUD example with Axios & Vue Router](https://bezkoder.com/vue-3-crud/)

[Dockerize Node.js Express and MySQL example - Docker Compose](https://www.bezkoder.com/docker-compose-nodejs-mysql/)

[Node.js Express: JWT example | Token Based Authentication & Authorization](https://bezkoder.com/node-js-jwt-authentication-mysql/)

## Run the System

We can easily run the whole with only a single command:

```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

The services can be run on the background with command:

```bash
docker-compose up -d
```

### Inside docker

Run node:

```bash
cd node
node server.js
```

Run app:

```bash
cd app
npm run serve
```

opem http://localhost:8081 in your browser

## Stop the System

Stopping all the running containers is also simple with a single command:

```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:

```bash
docker-compose down --rmi all
```

# Open project in VSCode container

VSCode will detect your .devcontainer and ask you to open the project in the container. You can click the green `Open remote window` icon in the bottom left and select `Reopen in Container`, or press `shift+ctrl+P` and select `Remote-Containers: Reopen in container`

than, you can run app:

Run node:

```bash
cd node
node server.js
```

Run app:

```bash
cd app
npm run serve
```

opem http://localhost:8081 in your browser
