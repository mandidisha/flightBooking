import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import config from './modules/providers/development';

const app = express();
// const port = 8000

mongoose.connect(config.databaseUrl, {
  directConnection: true,
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(req.body);
});

app.get('/help', (req: express.Request, res: express.Response) => {
  res.send('help page');
});

app.use(bodyParser.json());
app.listen(config.port, () => console.log(`app running on port ${config.port}`));
