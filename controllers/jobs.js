const { NotFoundError, BadRequestError } = require("../errors")
const Job = require("../models/Job")

const getAllJobs = async (req,res) => {
    // res.send('getAllJobs')
    const jobs = await Job.find({ createdBy : req.user.userId }).sort('createdBy')
    res.status(200).json({jobs, count : jobs.length})
}

const getJob = async (req,res) => {
    // shortcut to get //
    const {user : {userId}, params : {id : jobId}} = req
    // we or we
    // userId = req.user.userId // it comes by the authentication middleware value //
    // jobId = req.params.id // route parameters to
    // res.send('getSingleJob')
    const job = await Job.findOne({_id : jobId, createdBy : userId})

    if(!job) {
        throw new NotFoundError(`no job in with id ${jobId}`)
    }

    res.status(200).json({job})
}

const updateJob = async (req,res) => {
    const {body : {company, position},user : {userId}, params : {id : jobId}} = req

    if(company === '' || position === '' ) {
        throw new BadRequestError('Please provide company and positon')
    }

    const job = await Job.findByIdAndUpdate({_id : jobId, createdBy : userId}, req.body, {new : true, runValidators : true})

    // res.send('updateJob')
    if(!job) {
        throw new NotFoundError(`no job in with id ${jobId}`)
    }

    res.status(200).json({job})
}

const createJob = async (req,res) => {
    // res.send('createJob')
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    // res.json(req.user)
    res.status(201).json({job})
}

const deleteJob = async (req,res) => {
    const {user : {userId}, params : {id : jobId}} = req

    const job = await Job.findByIdAndDelete({_id : jobId, createdBy : userId})

    // res.send('deleteJob')
    if(!job) {
        throw new NotFoundError(`no job in with id ${jobId}`)
    }

    res.status(200).send()
}

module.exports = {
    getAllJobs, getJob, updateJob, createJob, deleteJob
}

