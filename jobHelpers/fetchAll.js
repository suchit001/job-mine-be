const { amazonHelper } = require("./amazon")
const { ashbyHelper } = require("./ashbyJobs")
const { microsoftHelper } = require("./microsoft")
const { oracleCloudHelper } = require("./oracleCloudJobs")
const { uberHelper } = require("./uber")
const { workDayHelper } = require("./workdayJobs")

exports.fetchAllJobsHandler = async (req, res) => {
    try {
        await amazonHelper()
        await uberHelper()
        await workDayHelper()
        await oracleCloudHelper()
        await ashbyHelper()
        await microsoftHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error while processing jobs', err)
        return res.status(400).send(err)
    }
}