import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes'; // Removing hard-coded status codes with refactored reusable status codes

export const getAllJobs = async (req, res) => {
  // getting only those jobs created by that particular user
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

// A particular user will see only those job which are created by it.
// This is happening because I am sending back the cookie with JWT and by default browser will send that back to the server,
// where cookie verification & token verification is carried out. If every check is passed, the user is proceeded to the specific route

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: deletedJob });
};
