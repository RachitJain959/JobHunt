import * as dotenv from 'dotenv'; //helps to access env variables in the app
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';

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

// CREATE SINGLE JOB
app.post('/api/v1/jobs');

// GET ALL JOBS
app.get('/api/v1/jobs');

// GET SINGLE JOB
app.get('/api/v1/jobs/:id');

// EDIT SINGLE JOB
app.patch('/api/v1/jobs/:id');

// DELETE SINGLE JOB
app.delete('/api/v1/jobs/:id');

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong internally' });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
