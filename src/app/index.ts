import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server is running');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
 mongoose
      .connect('mongodb://localhost:27017/flight-booking', {
        useNewUrlParser: true,
         useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }, ()=>{
        console.log('connected to database')
      })
