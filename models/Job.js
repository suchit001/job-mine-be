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
    createdAt: Number,
    updatedAt: Number
});

module.exports = mongoose.model('Job', JobSchema);