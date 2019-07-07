const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    type: { type: String },
    describe: { type: String },
    income: { type: String, required: true },
    expend: { type: String, required: true },
    cash: { type: String, required: true },
    remark: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = Profile = mongoose.model('profile', profileSchema)