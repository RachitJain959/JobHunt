import { Router } from 'express';
const router = Router();

import {
  getAllJobs,
  getSingleJob,
  updateJob,
  createJob,
  deleteJob,
} from '../controllers/jobController.js';
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkTestUser } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getAllJobs)
  .post(checkTestUser, validateJobInput, createJob);
router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(checkTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkTestUser, validateIdParam, deleteJob);

export default router;
