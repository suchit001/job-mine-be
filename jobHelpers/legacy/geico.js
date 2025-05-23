const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getGEICOConfig } = require('../configs/geico')

const ADB_BASE_URL = "https://geico.wd1.myworkdayjobs.com/en-US/External"

exports.geicoRouteHandler = async (req, res) => {
    try {
        await this.geicoHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.geicoHelper = async () => {
    try {
        const jobs = await getGEICOJobs()
        let formattedJobs = formatGEICOJob(jobs)
        formattedJobs = formattedJobs.filter((job) => job["workdayPostDay"] == "Posted Today")
        if(formattedJobs.length == 0) {
            console.log("GEICO: NO jobs")
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
        console.log("GEICO: Processed")
        // return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error found while processing geico jobs', err)
        // return res.status(400).send(err)
    }
}



getGEICOJobs = async () => {
    try {
        const promises = []
        for (let i = 0; i <= 3; i++) {
            const reqBody = getGEICOConfig(20*i, 20)
            promises.push(axios.post('https://geico.wd1.myworkdayjobs.com/wday/cxs/geico/External/jobs', reqBody).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching geico jobs', err)
    }
}

formatGEICOJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "geico-"+job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": ADB_BASE_URL + job["externalPath"],
        "company": "geico"
    }))
}