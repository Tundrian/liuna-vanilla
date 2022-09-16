const mongoose = require('mongoose')

const CertificateSchema = mongoose.Schema({
    description: String,
    name: String,
    type: String,
    expirationLength: Number,
    expirationUnits: String
    
})

module.exports = mongoose.model('Certificate', CertificateSchema)
