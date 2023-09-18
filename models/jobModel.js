import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    jobStatus: {
      type: String,
      enum: ['pending', 'interview', 'declined'],
      default: 'pending',
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
  { timestamps: True }
);

export default mongoose.model('JobCollection', JobSchema);
