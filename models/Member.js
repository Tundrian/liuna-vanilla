const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
    name: String,
    role: String,
    userId: String,
    firstName: String,
    lastName: String,
    status: String,
    memberNumber: String,
    certificates: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Certificate"
        }
    ]
})

module.exports = mongoose.model('Member', MemberSchema)
