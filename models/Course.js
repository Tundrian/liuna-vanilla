const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    category: String,
    renewal_length: Number,
    length: Number
})

module.exports = mongoose.model('Course', CourseSchema)