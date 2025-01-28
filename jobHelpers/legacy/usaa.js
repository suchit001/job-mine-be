const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getUSAAConfig } = require('../configs/usaa')

const ADB_BASE_URL = "https://usaa.wd1.myworkdayjobs.com/en-US/USAAJOBSWD"

exports.usaaRouteHandler = async (req, res) => {
    try {
        await this.usaaHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.usaaHelper = async () => {
    try {
        const jobs = await getUSAAJobs()
        let formattedJobs = formatUSAAJob(jobs)
        formattedJobs = formattedJobs.filter((job) => job["workdayPostDay"] == "Posted Today")
        if(formattedJobs.length == 0) {
            console.log("USAA: NO jobs")
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
        console.log("USAA: Processed")
        // return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error found while processing usaa jobs', err)
        // return res.status(400).send(err)
    }
}



getUSAAJobs = async () => {
    try {
        const promises = []
        for (let i = 0; i <= 3; i++) {
            const reqBody = getUSAAConfig(20*i, 20)
            promises.push(axios.post('https://usaa.wd1.myworkdayjobs.com/wday/cxs/usaa/USAAJOBSWD/jobs', reqBody).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching usaa jobs', err)
    }
}

formatUSAAJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "usaa-"+job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": ADB_BASE_URL + job["externalPath"],
        "company": "usaa"
    }))
}