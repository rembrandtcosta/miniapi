import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const options = {
  info: {
    title: 'Miniapi',
    description: 'Random fake data',
  },
  host: `localhost:${port}`,
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, options);
