import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes'; // Removing hard-coded status codes with refactored reusable status codes
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllJobs = async (req, res) => {
  // getting only those jobs created by that particular user
  const { search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = req.query.search;
  }

  const jobs = await Job.find(queryObject);
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

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    // Stage 1- $match: requires an object
    // Stage 2- createdBy: references a user
    // Stage 3- req.user.userId: it returns a string which needs to be converted to an object type
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, //grab all the jobs that belongs to the specific user with userId

    // group the jobs from the user into jobStatus categories & count them
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);
  //   console.log(stats);
  // O/P : { _id: 'pending', count: 40 },
  //      { _id: 'declined', count: 29 },
  //      { _id: 'interview', count: 31 }

  stats = stats.reduce((accumulator, current) => {
    const { _id: title, count } = current;
    accumulator[title] = count;
    return accumulator;
  }, {});
  //   console.log(stats); // O/P: { pending: 40, declined: 29, interview: 31 }

  const defaultStats = {
    pending: stats.pending || 0,
    declined: stats.declined || 0,
    interview: stats.interview || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } }, // sort in latest order
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YYYY');

      return { date, count };
    })
    .reverse();

  //   const monthlyApplications = [
  //     {
  //       date: 'May 23',
  //       count: 11,
  //     },
  //     {
  //       date: 'Jun 23',
  //       count: 8,
  //     },
  //     {
  //       date: 'Jul 23',
  //       count: 3,
  //     },
  //   ];

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
