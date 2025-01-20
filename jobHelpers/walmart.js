const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getWalmartConfig } = require('../configs/walmart')

const WM_BASE_URL = "https://walmart.wd5.myworkdayjobs.com/en-US/WalmartExternal"

exports.walmartHelper = async (req, res) => {
    try {
        const jobs = await getWalmartJobs()
        let formattedJobs = formatWalmartJob(jobs)
        formattedJobs = formattedJobs.filter((job) => job["workdayPostDay"] == "Posted Today")
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
        // return res.status(200).json(formattedJobs)
    } catch (err) {
        console.log('Error found while processing walmart jobs', err)
        return res.status(400).send(err)
    }
}


getWalmartJobs = async () => {
    try {
        const promises = []
        for (let i = 0; i <= 4; i++) {
            const reqBody = getWalmartConfig(20*i, 20)
            promises.push(axios.post('https://walmart.wd5.myworkdayjobs.com/wday/cxs/walmart/WalmartExternal/jobs', reqBody).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching walmart jobs', err)
    }
}

formatWalmartJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "walmart-"+job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": WM_BASE_URL + job["externalPath"],
        "company": "walmart"
    }))
}