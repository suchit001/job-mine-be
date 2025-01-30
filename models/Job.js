const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    jobId: String,
    postUpdatedDate: Number,
    jobTitle: String,
    postCreatedDate: Number,
    workdayPostDay: String,
    jobUrl: String,
    company: String,
    read: { type: Boolean, default: false },
    kajol: { type: Boolean, default: false },
    createdAt: { type: Number, default: Math.floor(Date.now() / 1000) },
    updatedAt: { type: Number, default: Math.floor(Date.now() / 1000) }
});

module.exports = mongoose.model('Job', JobSchema);