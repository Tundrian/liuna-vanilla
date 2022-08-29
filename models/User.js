const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean
    },
    theme: {
        type: String
    },
    memberNumber: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User 
