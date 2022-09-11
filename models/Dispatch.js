const mongoose = require('mongoose')

const DispatchSchema = mongoose.Schema({
    contractorId: String,
    description: String,
    name: String,
    type: String,
    length: Number,
    startDate: Date,
    endDate: Date
})

module.exports = mongoose.model('Dispatch', DispatchSchema)
