const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
    name: String,
    role: String,
    user_id: String,
    first_name: String,
    last_name: String,
    status: String,
})

module.exports = mongoose.model('Member', MemberSchema)
