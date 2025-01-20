const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getAmazonConfig } = require('../configs/amazon')

exports.amazonHelper = async (req, res) => {
    try {
        const jobs = await getAmazonJobs()
        let formattedJobs = formatAmazonJob(jobs)
        const backDate = Math.floor(Date.now() / 1000) - 60 * 60 * 60
        formattedJobs = formattedJobs.filter((job) => Number(job["postCreatedDate"]) > backDate)
        if(formattedJobs.length == 0) {
            return res.send("No jobs to update")
        }
        const operations = formattedJobs.map((job) => ({
            updateOne: {
                filter: {"jobId": job["jobId"]},
                update: job,
                upsert: true
            }
        }))
        await models.Job.bulkWrite(operations)
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error while fetching amazon jobs', err)
        return res.status(400).json('Error while fetching amazon jobs')
    }
}

getAmazonJobs = async () => {
    const promises = []
    for (let i = 0; i <= 2; i++) {
        const reqBody = getAmazonConfig(10*i, 10)
        promises.push(axios.post('https://www.amazon.jobs/api/jobs/search', reqBody).then((response) => response.data))
    }
    let jobs = await Promise.all(promises)
    jobs = jobs.map((job) => job["searchHits"])
    jobs = jobs.flat()
    return jobs
}

formatAmazonJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "amazon-"+job["fields"]["icimsJobId"][0],
        "postUpdatedDate": job["fields"]["updatedDate"][0],
        "jobTitle": job["fields"]["title"][0],
        "postCreatedDate": job["fields"]["createdDate"][0],
        "jobUrl": job["fields"]["urlNextStep"][0],
        "company": "amazon"
    }))
}