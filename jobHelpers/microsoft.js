const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
// const { getMicrosoftConfig } = require('../configs/microsoft')

MSFT_API = "https://gcsservices.careers.microsoft.com/search/api/v1/search?lc=United%20States&p=Software%20Engineering&p=Design%20%26%20Creative&p=Analytics&p=Research%2C%20Applied%2C%20%26%20Data%20Sciences&l=en_us&pg=1&pgSz=20&o=Recent&flt=true"

exports.microsoftRouteHandler = async (req, res) => {
    try {
        await this.microsoftHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.microsoftHelper = async () => {
    try {
        const jobs = await getMicrosoftJobs()
        let formattedJobs = formatMicrosoftJob(jobs)
        const backDate = Math.floor(Date.now() / 1000) - (60 * 60 * 2)
        formattedJobs = formattedJobs.filter((job) => (parseInt(job["postCreatedDate"], 10) > backDate))
        if(formattedJobs.length == 0) {
            console.log("Microsoft: NO jobs")
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
        console.log("Microsoft: Processed")
    } catch (err) {
        console.log('Error while fetching microsoft jobs', err)
        // return res.status(400).json('Error while fetching microsoft jobs')
    }
}

getMicrosoftJobs = async () => {
    const promises = []
    for (let i = 1; i <= 3; i++) {
        let url = MSFT_API.replace('pg=1', 'pg='+i)
        promises.push(axios.get(url).then((response) => response.data))
    }
    let jobs = await Promise.all(promises)
    jobs = jobs.map((job) => job["operationResult"]["result"]["jobs"])
    jobs = jobs.flat()
    return jobs
}

formatMicrosoftJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "microsoft-"+job["jobId"],
        "jobTitle": job["title"],
        "postCreatedDate": (new Date(job['postingDate']))/1000,
        "jobUrl": "https://jobs.careers.microsoft.com/global/en/apply?Job_id=" + job["jobId"],
        "company": "microsoft",
        "createdAt": Math.floor(Date.now() / 1000)
    }))
}

// https://jobs.careers.microsoft.com/global/en/job/1799816/Senior-Software-Engineering
// https://jobs.careers.microsoft.com/global/en/apply?Job_id=1799816