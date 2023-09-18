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

// GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE SINGLE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, role } = req.body;
  if (!company || !role) {
    return res.status(400).json({ msg: 'please provide company & role' });
  }
  const id = nanoid();
  const job = { id, company, role };
  jobs.push(job);
  res.status(200).json({ job });
});

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id: ${id}` });
  }
  res.status(200).json({ job });
});

// EDIT SINGLE JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, role } = req.body;
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id: ${id}` });
  }

  if (!company || !role) {
    return res.status(400).json({ msg: 'please provide company & role' });
  }

  job.company = company;
  job.role = role;

  res.status(200).json({ msg: 'job modified', job });
});

// DELETE SINGLE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id: ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job deleted' });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
