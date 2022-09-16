const { ObjectID } = require('bson')
const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    category: String,
    renewalLength: Number,
    renewalLengthUnits: String,
    length: Number,
    lengthUnits: String,
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate"
    }
})

module.exports = mongoose.model('Course', CourseSchema)