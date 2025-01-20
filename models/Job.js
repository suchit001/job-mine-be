const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    jobId: String,
    postUpdatedDate: Number,
    jobTitle: String,
    postCreatedDate: Number,
    jobUrl: String,
    company: String,
    createdAt: { type: Number, default: Math.floor(Date.now() / 1000) },
    updatedAt: { type: Number, default: Math.floor(Date.now() / 1000) }
});

module.exports = mongoose.model('Job', JobSchema);