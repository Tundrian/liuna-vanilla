const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    role: String
})

module.exports = mongoose.model('Member', MemberSchema)
