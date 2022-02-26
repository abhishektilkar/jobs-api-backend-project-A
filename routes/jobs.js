const express = require('express')
const jobsRouter = express.Router()

const {getAllJobs, getJob, updateJob, createJob, deleteJob} = require('../controllers/jobs')

jobsRouter.route('/').get(getAllJobs).post(createJob)
jobsRouter.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = jobsRouter