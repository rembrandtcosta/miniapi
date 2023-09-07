import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger-output.json';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

routes(app);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

export default app;
