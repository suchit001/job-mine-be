
const models = require('./models')


exports.kjGetJobs = async (req, res) => {
    try {
        const query = req.query.query
        const page = req.query.page ? req.query.page:1
        const jobs = await models.Job.find({'kajol': false}).sort({'createdAt': -1})
        return res.send(jobs)
    } catch (err) {
        console.log('Error while fetching jobs', err)
        return res.status(400).send(err)
    }
}

exports.kjClearAll = async (req, res) => {
    try {
        const jobs = await models.Job.updateMany({'kajol': true})
        return res.send('Jobs cleared')
    } catch (err) {
        console.log('Error while clearing all jobs', err)
        return res.status(400).send(err)
    }
}

exports.kjReadJob = async (req, res) => {
    try {
        const jobId = req.query.jobId
        const job = await models.Job.findOneAndUpdate({ 'jobId': jobId}, {
            kajol: true,
            updatedAt: Math.floor(Date.now() / 1000)
        })
        res.status(200).send('Read successfully')
    } catch (err) {
        console.log('Error while reading the job', err)
        return res.status(400).send(err)
    }
}