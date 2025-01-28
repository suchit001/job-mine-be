const axios = require("axios")
const models = require('../../models')
// const Job = require('../models/Job')
const { getAdobeConfig } = require('../../configs/adobe')

const ADB_BASE_URL = "https://adobe.wd5.myworkdayjobs.com/en-US/external_experienced"

exports.adobeRouteHandler = async (req, res) => {
    try {
        await this.adobeHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.adobeHelper = async () => {
    try {
        const jobs = await getAdobeJobs()
        let formattedJobs = formatAdobeJob(jobs)
        formattedJobs = formattedJobs.filter((job) => job["workdayPostDay"] == "Posted Today")
        if(formattedJobs.length == 0) {
            console.log("Adobe: NO jobs")
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
        console.log("Adobe: Processed")
        // return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error found while processing adobe jobs', err)
        // return res.status(400).send(err)
    }
}



getAdobeJobs = async () => {
    try {
        const promises = []
        for (let i = 0; i <= 3; i++) {
            const reqBody = getAdobeConfig(20*i, 20)
            promises.push(axios.post('https://adobe.wd5.myworkdayjobs.com/wday/cxs/adobe/external_experienced/jobs', reqBody).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching adobe jobs', err)
    }
}

formatAdobeJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "adobe-"+job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": ADB_BASE_URL + job["externalPath"],
        "company": "adobe"
    }))
}