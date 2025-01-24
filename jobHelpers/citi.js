const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getCitiConfig } = require('../configs/citi')

const ADB_BASE_URL = "https://citi.wd5.myworkdayjobs.com/en-US/2"

exports.citiRouteHandler = async (req, res) => {
    try {
        await this.citiHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.citiHelper = async () => {
    try {
        const jobs = await getCitiJobs()
        let formattedJobs = formatCitiJob(jobs)
        formattedJobs = formattedJobs.filter((job) => job["workdayPostDay"] == "Posted Today")
        if(formattedJobs.length == 0) {
            console.log("Citi: NO jobs")
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
        console.log("Citi: Processed")
        // return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error found while processing citi jobs', err)
        // return res.status(400).send(err)
    }
}



getCitiJobs = async () => {
    try {
        const promises = []
        for (let i = 0; i <= 3; i++) {
            const reqBody = getCitiConfig(20*i, 20)
            promises.push(axios.post('https://citi.wd5.myworkdayjobs.com/wday/cxs/citi/2/jobs', reqBody).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching citi jobs', err)
    }
}

formatCitiJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "citi-"+job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": ADB_BASE_URL + job["externalPath"],
        "company": "citi"
    }))
}