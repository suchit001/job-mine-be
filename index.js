const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const models = require('./models')

const { fetchAllJobsHandler } = require('./jobHelpers/fetchAll')
const { microsoftRouteHandler } = require('./jobHelpers/microsoft')
const { kjGetJobs, kjReadJob, kjClearAll } = require('./kjkelper')
const { salesforceAutoApply } = require('./appliers/salesforce')
const { nvidiaAutoApply } = require('./appliers/nvidia')
const { citiAutoApply } = require('./appliers/citi')
const { walmartAutoApply } = require('./appliers/walmart')
const { adobeAutoApply } = require('./appliers/adobe')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get('/', async (req, res) => {
    res.send('Hosted with ❤️ by a desperate student finding jobs')
})

app.get('/processAllJobs', fetchAllJobsHandler)
app.get('/microsoft', microsoftRouteHandler)
app.get('/kajol/getJobs', kjGetJobs)
app.post('/kajol/read', kjReadJob)
app.post('/kajol/clear', kjClearAll)

app.get('/getJobs', async (req, res) => {
    try {
        const query = req.query.query
        const page = req.query.page ? req.query.page:1
        const jobs = await models.Job.find({'read': false}).sort({'createdAt': -1})
        // const jobs = await models.Job.find({'read': false}).sort({'createdAt': -1}).skip((page-1)*10).limit(10)
        return res.send(jobs)
    } catch (err) {
        console.log('Error while fetching jobs', err)
        return res.status(400).send(err)
    }
})

app.post('/read', async (req, res) => {
    try {
        const jobId = req.query.jobId
        const job = await models.Job.findOneAndUpdate({ 'jobId': jobId}, {
            read: true,
            updatedAt: Math.floor(Date.now() / 1000)
        })
        res.status(200).send('Read successfully')
    } catch (err) {
        console.log('Error while reading the job', err)
        return res.status(400).send(err)
    }
})

app.post('/autoApply', async (req, res) => {
    try {
        const jobId = req.query.jobId;
        const job = await models.Job.findOne({ 'jobId': jobId});
        if(job['company'] == 'salesforce') {
            await salesforceAutoApply(job['jobUrl']);
        } else if(job['company'] == 'nvidia') {
            await nvidiaAutoApply(job['jobUrl']);
        } else if(job['company'] == 'citi') {
            await citiAutoApply(job['jobUrl']);
        } else if(job['company'] == 'walmart') {
            await walmartAutoApply(job['jobUrl']);
        } else if(job['company'] == 'adobe') {
            await adobeAutoApply(job['jobUrl']);
        } else {
            throw new Error('Auto apply doesnt exist');
            // await salesforceAutoApply();
        }
        const readJob = await models.Job.findOneAndUpdate({ 'jobId': jobId}, {
            read: true,
            updatedAt: Math.floor(Date.now() / 1000)
        })
        res.status(200).send('Read successfully');
    } catch (err) {
        console.log('Error while reading the job', err)
        return res.status(400).send(err)
    }
})

app.get('/markAllRead', async (req, res) => {
    try {
        return res.status(200).send('All Read successfully')
        const job = await models.Job.updateMany({}, {
            read: true,
            kajol: true,
            updatedAt: Math.floor(Date.now() / 1000)
        })
    } catch (err) {
        console.log('Error while reading the job', err)
        return res.status(400).send(err)
    }
})

app.listen(process.env.PORT || 10000, async () => {
    console.log('server listening at', process.env.PORT || 10000)
})