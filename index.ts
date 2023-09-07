import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { setUpDb } from './helpers/util';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

setUpDb(10);

routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
