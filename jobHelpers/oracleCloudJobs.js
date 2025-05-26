const axios = require("axios")
const models = require('../models')
const oracleCloudConfig = require('../configs/oracleCloudConfig.json')
// const { oracleCloudConfig } = require('../configs/oracleCloudConfig')


exports.oracleCloudHelper = async () => {
    try {
        for await(let config of oracleCloudConfig) {
            console.log(config["company"])
            await this.oracleCloudCompanyHelper(config)
        }
    } catch (err) {
        return err
    }
}


exports.oracleCloudCompanyHelper = async (config) => {
    try {
        const jobs = await getOracleCloudJobs(config)
        const backDate = Math.floor(Date.now() / 1000) - (60 * 60 * 48)
        let formattedJobs = formatOracleCloudJob(jobs, config)
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



getOracleCloudJobs = async (config) => {
    try {
        const promises = []
        for (let i = 0; i <= 0; i++) {
            config["base_api"] = config["base_api"].replace('offset=25', 'offset='+25*i)
            promises.push(axios.get(config['base_api']).then((response) => response.data))
        }
        let jobs = await Promise.all(promises)
        jobs = jobs.map((job) => job["items"][0]["requisitionList"])
        jobs = jobs.flat()
        return jobs
    } catch(err) {
        console.log('Error while fetching adobe jobs', err)
    }
}

formatOracleCloudJob = (jobs, config) => {
    return jobs.map((job) => ({
        "jobId": config["company"] + "-" +job["Id"],
        "postUpdatedDate": null,
        "jobTitle": job["Title"],
        "postCreatedDate": (new Date(job["PostedDate"]))/1000,
        "jobUrl": config["base_url"] + job["Id"],
        "company": config["company"],
        "createdAt": Math.floor(Date.now() / 1000),
        "updatedAt": Math.floor(Date.now() / 1000)
    }))
}