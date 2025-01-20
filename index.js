const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const models = require('./models')

const { amazonHelper } = require('./jobHelpers/amazon')
const { salesforceHelper } = require('./jobHelpers/salesforce')
const { walmartHelper } = require('./jobHelpers/walmart')
const { adobeHelper } = require('./jobHelpers/adobe')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))


app.get('/amazon', amazonHelper)
app.get('/salesforce', salesforceHelper)
app.get('/walmart', walmartHelper)
app.get('/adobe', adobeHelper)
app.get('/getJobs', async (req, res) => {
    try {
        const query = req.params.query
        const page = req.params.page ? req.params.page:1
        const jobs = await models.Job.find().sort({'createdAt': -1}).skip((page-1)*10).limit(10)
        return res.send(jobs)
    } catch (err) {
        console.log('Error while fetching jobs', err)
        return res.status(400).send(err)
    }
})

app.listen(3000, async () => {
    console.log('server listening at 3000')
})