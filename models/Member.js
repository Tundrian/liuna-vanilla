const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
    name: String,
    role: String,
    userId: String,
    firstName: String,
    lastName: String,
    status: String,
    memberNumber: String
})

module.exports = mongoose.model('Member', MemberSchema)
