import mongoose from 'mongoose';
import { JOB_STATUS } from '../utils/constants.js';

const JobSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship'],
      default: 'Full-time',
    },
    jobLocation: {
      type: String,
      default: 'my-city',
    },
  },
  { timestamps: true }
);

export default mongoose.model('JobCollection', JobSchema);
