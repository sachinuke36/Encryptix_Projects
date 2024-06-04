const express = require('express');
const { postJob,updateJob ,getMyJobs, getAllJobs, deleteJob, deleteJOB, getJobsByMinSalary, getJobsByProfile, filterJobs, getJobById, applyForJob, respond, deleteApplicant } = require('../controllers/jobController');
const { authenticate } = require('../middlewares/authMiddleware');
const { getJobSeekerInfo } = require('../controllers/authController');

const router = express.Router();

router.post('/post-job', authenticate, postJob);
router.post('/all-jobs',authenticate, getAllJobs);
router.delete('/delete-job/:id', authenticate, deleteJob);
router.post('/delete-jobs',deleteJOB);
router.get("/info/:id",authenticate,getJobById);
router.get('/min-salary', getJobsByMinSalary);
router.get('/job-profile', getJobsByProfile);
router.post('/filtered-jobs', filterJobs);
router.get('/my_jobs',getMyJobs);
 router.patch('/my_jobs/respond',authenticate,respond);
 router.post('/my_jobs/remove_applicant/:id',authenticate,deleteApplicant);
router.patch('/apply',applyForJob)
router.get("/jobseekers/info/:id",getJobSeekerInfo);
router.patch('/update/post-job/:id',updateJob)


module.exports = router;  // Ensure the router is correctly exported
