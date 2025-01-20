const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getSalesforceConfig } = require('../configs/salesforce')

const SF_BASE_URL = "https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site"

exports.salesforceHelper = async (req, res) => {
    try {
        const jobs = await getSalesforceJobs()
        let formattedJobs = formatSalesforceJob(jobs)
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
    } catch (err) {
        console.log('Error found while processing salesforce jobs', err)
        return res.status(400).send(err)
    }
}


getSalesforceJobs = async () => {
    try {
        const promises = []
        for (let i = 0; i <= 1; i++) {
            const reqBody = getSalesforceConfig(20*i, 20)
            promises.push(axios.post('https://salesforce.wd12.myworkdayjobs.com/wday/cxs/salesforce/External_Career_Site/jobs', reqBody).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching salesforce jobs', err)
    }
}

formatSalesforceJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "salesforce-"+job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": SF_BASE_URL + job["externalPath"],
        "company": "salesforce"
    }))
}