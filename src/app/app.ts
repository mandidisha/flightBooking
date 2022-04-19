import bodyParser from 'body-parser';
// import Path from 'path';
// import YAML from 'yamljs';
import SwaggerUI from 'swagger-ui-express';
// import SwaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import mongoose from 'mongoose';
import Passport from 'passport';
import Http from 'http';
import { jwtAuth } from './authentication';
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
// Setup docs
// const docsFilePath = Path.resolve(__dirname, '../docs/openapi.yaml');
// const jsonDocsFile = YAML.load(docsFilePath);
// const docs = SwaggerJsdoc({
//   swaggerDefinition: jsonDocsFile,
//   apis: ['./src/app/**/*.js'],
// });

// app.use(
//   '/api/swagger',
//   basicAuth(config.apiDocsUsername, config.apiDocsPassword!, true),
//   SwaggerUI.serve,
//   SwaggerUI.setup(docs, false!, { docExpansion: 'none' }),
// );

app.use(
  '/docs',
  SwaggerUI.serve,
  SwaggerUI.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
);

app.get('/help', (req: express.Request, res: express.Response) => {
  res.send('help page');
});
jwtAuth();
app.use(bodyParser.json());

app.use(Passport.initialize());
server.listen(config.port, () => console.log(`app running on port ${config.port}`));

export default server;
