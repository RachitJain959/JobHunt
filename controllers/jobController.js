import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', role: 'front-end' },
  { id: nanoid(), company: 'google', role: 'back-end' },
];

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, role } = req.body;
  if (!company || !role) {
    return res.status(400).json({ msg: 'please provide company & role' });
  }
  const id = nanoid();
  const job = { id, company, role };
  jobs.push(job);
  res.status(200).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id: ${id}` });
  }
  res.status(200).json({ job });
};

export const editJob = async (req, res) => {
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
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id: ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job deleted' });
};
