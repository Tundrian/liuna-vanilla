const mongoose = require('mongoose')

const ContractorSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    category: String,
    type: String,
    acquire_date: Date,
    reminder_date: Date
})

module.exports = mongoose.model('Contractor', ContractorSchema)
