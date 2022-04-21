import bodyParser from 'body-parser';
import Path from 'path';
import YAML from 'yamljs';
import SwaggerUI from 'swagger-ui-express';
import SwaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import mongoose from 'mongoose';
import Http from 'http';
import { basicAuth, jwtAuth } from './authentication';
import routes from './modules/routes';
import config from './providers/development';

const app = express();
// const port = 8000
const server = Http.createServer(app);

mongoose.connect(config.databaseUrl, {
  directConnection: true,
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(req.body);
});
app.use(express.json);
app.use('api/v1', routes);
// Setup docs
const docsFilePath = Path.resolve(__dirname, './docs/openapi.yaml');
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

app.get('/help', (req: express.Request, res: express.Response) => {
  res.send('help page');
});

jwtAuth();
app.use(bodyParser.json());

server.listen(config.port, () => console.log(`app running on port ${config.port}`));

export default server;
