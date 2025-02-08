const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getUberConfig } = require('../configs/uber')

exports.uberRouteHandler = async (req, res) => {
    try {
        await this.uberHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.uberHelper = async () => {
    try {
        const jobs = await getUberJobs()
        let formattedJobs = formatUberJob(jobs)
        const backDate = Math.floor(Date.now() / 1000) - (60 * 60 * 24 * 7)
        formattedJobs = formattedJobs.filter((job) => (parseInt(job["postCreatedDate"], 10) > backDate))
        if(formattedJobs.length == 0) {
            console.log("Uber: NO jobs")
            return
        }
        const operations = formattedJobs.map((job) => ({
            updateOne: {
                filter: {"jobId": job["jobId"]},
                update: job,
                upsert: true
            }
        }))
        await models.Job.bulkWrite(operations)
        console.log("Uber: Processed")
    } catch (err) {
        console.log('Error while fetching uber jobs', err)
        // return res.status(400).json('Error while fetching uber jobs')
    }
}

getUberJobs = async () => {
    const promises = []
    for (let i = 0; i <= 5; i++) {
        const reqBody = getUberConfig(i, 10)
        promises.push(axios.post('https://www.uber.com/api/loadSearchJobsResults', reqBody, {
            headers: {
                "X-Csrf-Token": "x",
            }
        }).then((response) => response.data))
    }
    let jobs = await Promise.all(promises)
    jobs = jobs.map((job) => job["data"]["results"])
    jobs = jobs.flat()
    return jobs
}

formatUberJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "uber-"+job["id"],
        "postUpdatedDate": (new Date(job['updatedDate']))/1000,
        "jobTitle": job["title"],
        "postCreatedDate": (new Date(job['creationDate']))/1000,
        "jobUrl": "https://www.uber.com/global/en/careers/list/" + job["id"],
        "company": "uber",
        // "createdAt": Math.floor(Date.now() / 1000)
    }))
}