const axios = require("axios")
const models = require('../models')
const workdayConfig = require('../configs/workdayConfig.json')
// const { workdayConfig } = require('../configs/workdayConfig')


exports.workDayHelper = async () => {
    try {
        for await(let config of workdayConfig) {
            console.log(config["company"])
            await this.workDayCompanyHelper(config)
        }
    } catch (err) {
        return err
    }
}


exports.workDayCompanyHelper = async (config) => {
    try {
        const jobs = await getWorkdayJobs(config)
        let formattedJobs = formatWorkdayJob(jobs, config)
        formattedJobs = formattedJobs.filter((job) => job["workdayPostDay"] == "Posted Today")
        if(formattedJobs.length == 0) {
            console.log("NO jobs")
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
        console.log("Processed")
        // return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error found while processing jobs', err)
        // return res.status(400).send(err)
    }
}



getWorkdayJobs = async (config) => {
    try {
        const promises = []
        for (let i = 0; i <= 3; i++) {
            config["limit"] = 20
            config["offset"] = 20*i
            // const reqBody = getAdobeConfig(20*i, 20)
            promises.push(axios.post(config['base_api'], config['config']).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["jobPostings"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching adobe jobs', err)
    }
}

formatWorkdayJob = (jobs, config) => {
    return jobs.map((job) => ({
        "jobId": config["company"] + "-" +job["bulletFields"][0],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "workdayPostDay": job["postedOn"],
        "jobUrl": config["base_url"] + job["externalPath"],
        "company": config["company"]
    }))
}