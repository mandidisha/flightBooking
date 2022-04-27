import bodyParser from 'body-parser';
import Path from 'path';
import YAML from 'yamljs';
import SwaggerUI from 'swagger-ui-express';
import SwaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import mongoose from 'mongoose';
// import Http from 'http';
import Cors from 'cors';
import config from './providers/development';
import router from './routes/index';
import { authenticated } from './authentication/jwt';

const app = express();

// const server = Http.createServer(app);
mongoose.connect(config.databaseUrl, {
  directConnection: true,
});
app.use(express.json);
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(Cors());
authenticated();
app.use(bodyParser.json());
// app.use(userRouter, airplaneRouter, airportRouter, authRouter, bookingRouter, scheduleRouter);

app.get('/first', (req: express.Request, res: express.Response) => {
  res.send('COnnnected');
});

app.use('/api', router);
// app.get('/help', (req: express.Request, res: express.Response) => {
//   res.send('help page');
// });

// const docsFilePath = Path.resolve(__dirname, '../docs/openapi.yaml');
// const jsonDocsFile = YAML.load(docsFilePath);
// const docs = SwaggerJsdoc({
//   swaggerDefinition: jsonDocsFile,
//   apis: ['./src/app/**/*.ts'],
// });
// app.use(
//   '/api/swagger',
//   SwaggerUI.serve,
//   SwaggerUI.setup(docs),
// );
// Catch all unhandled errors and log them
process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.log('+++', error);
});

app.listen(config.port, () => console.log(`app running on port ${config.port}`));

export default app;
