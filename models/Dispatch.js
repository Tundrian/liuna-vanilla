const mongoose = require('mongoose')

const DispatchSchema = mongoose.Schema({
    contractor_id: String,
    description: String,
    name: String,
    
})

module.exports = mongoose.model('Dispatch', DispatchSchema)
