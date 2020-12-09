# NestJS GraphQL Blog API

## Description

This is a NestJS GraphQL API for a Blog with CRUD endpoints for Categories and Posts.

After running the project, visit `http://localhost:3000/graphql` for the GraphQL Playground.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing the app

Unit tests:

```bash
npm run test
```

End-to-end test involving the database and GraphQL:

```bash
npm run test:e2e
```

## Using MongoDB locally with Docker

Download the latest MongoDB image.

```
docker pull mongo:latest
```

Run the container in detached mode, or in the background. Map the container ports with host ports so that the database can be accessed from a local host-level application. The port used is from the MongoDB documentation.

```
docker run -d -p 27017:27017 mongo
```

List docker containers to see if the mongo container is running.

```
docker container ls
```

## Stay in touch

- Twitter - [@stevenspads](https://twitter.com/stevenspads)
