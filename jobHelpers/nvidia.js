const axios = require("axios")
const models = require('../models')
// const Job = require('../models/Job')
const { getNvidiaConfig } = require('../configs/nvidia')

const NVD_BASE_URL = "https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite"

exports.nvidiaRouteHandler = async (req, res) => {
    try {
        await this.nvidiaHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.nvidiaHelper = async () => {
    try {
        const jobs = await getNvidiaJobs()
        let formattedJobs = formatNvidiaJob(jobs)
        formattedJobs = formattedJobs.filter((job) => job["workdayPostDay"] == "Posted Today")
        if(formattedJobs.length == 0) {
            console.log("NVIDIA: NO jobs")
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
        console.log("NVIDIA: Processed")
    } catch (err) {
        console.log('Error found while processing nvidia jobs', err)
        // return res.status(400).send(err)
    }
}


getNvidiaJobs = async () => {
    try {
        const promises = []
        for (let i = 0; i <= 1; i++) {
            const reqBody = getNvidiaConfig(20*i, 20)
            promises.push(axios.post('https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/jobs', reqBody).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching nvidia jobs', err)
    }
}

formatNvidiaJob = (jobs) => {
    return jobs.map((job) => ({
        "jobId": "nvidia-"+job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": NVD_BASE_URL + job["externalPath"],
        "company": "nvidia"
    }))
}