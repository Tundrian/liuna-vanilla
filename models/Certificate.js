const mongoose = require('mongoose')

const CertificateSchema = mongoose.Schema({
    description: String,
    name: String,
    type: String,
    expiration_length: Number
})

module.exports = mongoose.model('Certificate', CertificateSchema)
