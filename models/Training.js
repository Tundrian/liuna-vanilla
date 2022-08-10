const mongoose = require('mongoose')

const TrainingSchema = mongoose.Schema({
    courseId: String,
    startDate: Date,
    endDate: Date,
    scheduledDates: String,
    availableSlots: Number,
    openSlots: Number,
    filledSlots: Number,
    type: String,
    certificationName: String
})

module.exports = mongoose.model('Training', TrainingSchema)
