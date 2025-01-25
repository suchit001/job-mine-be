const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const models = require('./models')

const { amazonRouteHandler } = require('./jobHelpers/amazon')
const { salesforceRouteHandler } = require('./jobHelpers/salesforce')
const { walmartRouteHandler } = require('./jobHelpers/walmart')
const { adobeRouteHandler } = require('./jobHelpers/adobe')
const { fetchAllJobsHandler } = require('./jobHelpers/fetchAll')
const { nvidiaRouteHandler } = require('./jobHelpers/nvidia')
const { geicoRouteHandler } = require('./jobHelpers/geico')
const { citiRouteHandler } = require('./jobHelpers/citi')
const { usaaRouteHandler } = require('./jobHelpers/usaa')
const { uberRouteHandler } = require('./jobHelpers/uber')
const { ashbyHelper } = require('./jobHelpers/ashbyJobs')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get('/', async (req, res) => {
    res.send('Hosted with ❤️ by a desperate student finding jobs')
})

app.get('/processAllJobs', fetchAllJobsHandler)
app.get('/amazon', amazonRouteHandler)
app.get('/salesforce', salesforceRouteHandler)
app.get('/walmart', walmartRouteHandler)
app.get('/adobe', adobeRouteHandler)
app.get('/nvidia', nvidiaRouteHandler)
app.get('/geico', geicoRouteHandler)
app.get('/citi', citiRouteHandler)
app.get('/usaa', usaaRouteHandler)
app.get('/uber', uberRouteHandler)

app.get('/getJobs', async (req, res) => {
    try {
        const query = req.query.query
        const page = req.query.page ? req.query.page:1
        const jobs = await models.Job.find({'read': false}).sort({'createdAt': -1}).skip((page-1)*10).limit(10)
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
            read: true
        })
        console.log(job)
        res.status(200).send('Read successfully')
    } catch (err) {
        console.log('Error while reading the job', err)
        return res.status(400).send(err)
    }
})

app.listen(process.env.PORT || 10000, async () => {
    console.log('server listening at', process.env.PORT || 10000)
})