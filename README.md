## Miniapi

This is an API that returns fake randomly generated data to be consumed by test projects. It also contains the tooling to generate fake items. The text is generated with [Lorem Ipsum](https://www.npmjs.com/package/lorem-ipsum) and the images are from [Lorem Flickr](https://loremflickr.com/). The API is built in Typescript using Express.js and MongoDb.

## Usage

You can run the project by cloning it and running 

```
npm run dev
```

Make sure to edit the .env file to include your Mongodb connection

You can populate the db by running

```
ts-node tool/fill.ts
```

Make sure you have [ts-node](https://www.npmjs.com/package/ts-node)

## Tests

The project includes tests written with Jest. The tests can be run with

```
npm tests
```

## Docker Image

[TO DO]

## Working deploy

[TO DO]
