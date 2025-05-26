const axios = require("axios")
const models = require('../models')
const ashbyConfig = require('../configs/ashbyConfig.json')
// const { ashbyConfig } = require('../configs/ashbyConfig')


exports.ashbyHelper = async () => {
    try {
        for await(let config of ashbyConfig) {
            console.log(config["company"])
            await this.ashbyCompanyHelper(config)
        }
    } catch (err) {
        return err
    }
}


exports.ashbyCompanyHelper = async (config) => {
    try {
        let jobs = await getashbyJobs(config)
        jobs = filterAshbyJobs(jobs, config)
        const backDate = Math.floor(Date.now() / 1000) - (60 * 60 * 24)
        let formattedJobs = formatashbyJob(jobs, config)
        formattedJobs = formattedJobs.filter((job) => job["postCreatedDate"] > backDate)
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
    } catch (err) {
        console.log('Error found while processing jobs', err)
        // return res.status(400).send(err)
    }
}



getashbyJobs = async (config) => {
    try {
        let response = await axios.get(config['base_api'])
        let jobs = response["data"]["jobs"]
        return jobs
    } catch(err) {
        console.log('Error while fetching adobe jobs', err)
    }
}

formatashbyJob = (jobs, config) => {
    return jobs.map((job) => ({
        "jobId": config["company"] + "-" +job["id"],
        "postUpdatedDate": null,
        "jobTitle": job["title"],
        "postCreatedDate": Math.floor((new Date(job["publishedAt"]))/1000),
        "jobUrl": config["base_url"] + job["id"],
        "company": config["company"],
        "createdAt": Math.floor(Date.now() / 1000),
        "updatedAt": Math.floor(Date.now() / 1000)
    }))
}

filterAshbyJobs = (jobs, config) => {
    return jobs.filter((job) => config["filters"].includes(job["department"]))
}