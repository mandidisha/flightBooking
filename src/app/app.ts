/* eslint-disable quotes */
import bodyParser from 'body-parser';
import Path from 'path';
import YAML from 'yamljs';
import SwaggerUI from 'swagger-ui-express';
import SwaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import mongoose from 'mongoose';
import Http from 'http';
import routes from './routes';
// import swaggerUi from 'swagger-ui-express';
// import { jwtAuth } from './authentication';
import config from './providers/development';
// import Airplanes from './models/Airplanes';
// import Airport from './models/Airport';

const app = express();
// const port = 8000
const server = Http.createServer(app);
mongoose.connect(config.databaseUrl, {
  directConnection: true,
});

app.get('/first', (req: express.Request, res: express.Response) => {
  res.send('COnnnected');
});
app.get('/help', (req: express.Request, res: express.Response) => {
  res.send('help page');
});

const docsFilePath = Path.resolve(__dirname, '../src/docs/openapi.yaml');
const jsonDocsFile = YAML.load(docsFilePath);
const docs = SwaggerJsdoc({
  swaggerDefinition: jsonDocsFile,
  apis: ['./src/app/**/*.ts'],
});

app.use(
  '/api/swagger',
  // basicAuth(config.apiDocsUsername, config.apiDocsPassword!, true),
  SwaggerUI.serve,
  SwaggerUI.setup(docs),
);
app.use('/api/v1', routes);

app.use(express.json);

// jwtAuth();
app.use(bodyParser.json());

server.listen(config.port, () => console.log(`app running on port ${config.port}`));

export default server;
