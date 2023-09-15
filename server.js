import * as dotenv from 'dotenv'; //helps to access env variables in the app
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', role: 'front-end' },
  { id: nanoid(), company: 'google', role: 'back-end' },
];

if (process.env.NODE_ENV === 'development') {
  // logs the info about our requests
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ 'message': 'Data received', data: req.body });
});

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
