const mongoose = require('mongoose')
const Job = require("./Job")
const dotenv = require('dotenv').config()

const MONGO_URI = process.env["MONGO_DB"]


try {
    mongoose.connect(MONGO_URI, {useNewUrlParser: true}).then(async () => {
        console.log('connected to db succesfully')
    })
} catch (err) {
    console.log('Error while connecting to Mongodb', err)
}

module.exports = {
    Job
}