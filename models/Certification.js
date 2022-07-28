const mongoose = require('mongoose')

const CertificationSchema = mongoose.Schema({
    description: String,
    name: String,
    type: String,
    expiration_length: Number

})

module.exports = mongoose.model('Certification', CertificationSchema)
