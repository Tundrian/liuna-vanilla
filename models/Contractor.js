const mongoose = require('mongoose')

const ContractorSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    category: String,
    type: String,
    acquireDate: Date,
    reminderDate: Date
})

module.exports = mongoose.model('Contractor', ContractorSchema)
