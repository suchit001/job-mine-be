const { adobeHelper } = require("./adobe")
const { amazonHelper } = require("./amazon")
const { ashbyHelper } = require("./ashbyJobs")
const { citiHelper } = require("./citi")
const { geicoHelper } = require("./geico")
const { nvidiaHelper } = require("./nvidia")
const { oracleCloudHelper } = require("./oracleCloudJobs")
const { salesforceHelper } = require("./salesforce")
const { uberHelper } = require("./uber")
const { usaaHelper } = require("./usaa")
const { walmartHelper } = require("./walmart")
const { workDayHelper } = require("./workdayJobs")

exports.fetchAllJobsHandler = async (req, res) => {
    try {
        // await adobeHelper()
        // await salesforceHelper()
        // await walmartHelper()
        // await nvidiaHelper()
        // await geicoHelper()
        // await citiHelper()
        // await usaaHelper()

        await amazonHelper()
        await uberHelper()
        await workDayHelper()
        await oracleCloudHelper()
        await ashbyHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        console.log('Error while processing jobs', err)
        return res.status(400).send(err)
    }
}