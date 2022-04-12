import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import Passport from 'passport';
import { jwtAuth } from './authentication';
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
jwtAuth();
app.use(bodyParser.json());

app.use(Passport.initialize());
app.listen(config.port, () => console.log(`app running on port ${config.port}`));
