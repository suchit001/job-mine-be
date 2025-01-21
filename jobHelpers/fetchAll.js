const { adobeHelper } = require("./adobe")
const { amazonHelper } = require("./amazon")
const { nvidiaHelper } = require("./nvidia")
const { salesforceHelper } = require("./salesforce")
const { walmartHelper } = require("./walmart")

exports.fetchAllJobsHandler = async (req, res) => {
    try {
        await adobeHelper()
        await amazonHelper()
        await salesforceHelper()
        await walmartHelper()
        await nvidiaHelper()
        return res.status(200).json("Jobs fetched successfully")
    } catch (err) {
        return res.status(400).send(err)
    }
}