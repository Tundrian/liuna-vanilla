const mongoose = require('mongoose')

const CertificateSchema = mongoose.Schema({
    description: String,
    name: String,
    type: String,
    expirationLength: Number
})

module.exports = mongoose.model('Certificate', CertificateSchema)
