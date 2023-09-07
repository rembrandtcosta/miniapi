import swaggerAutogen from 'swagger-autogen';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the version of OpenAPI (Swagger)
    info: {
      title: 'Miniapi',
      version: '1.0.0',
      description: 'Random fake data',
    },
  },
  apis: ['./routes/index.ts'], // Specify the paths to your API route files
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, options);

