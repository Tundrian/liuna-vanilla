const mongoose = require('mongoose')

const DispatchSchema = mongoose.Schema({
    contractor_id: String,
    description: String,
    name: String,
    type: String,
    length: Number,
    start_date: Date,
    end_date: Date
})

module.exports = mongoose.model('Dispatch', DispatchSchema)
