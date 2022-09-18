const mongoose = require('mongoose')

const TrainingSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    startDate: Date,
    endDate: Date,
    length: Number,
    scheduledDates: [Date],
    totalSlots: Number,
    openSlots: Number,
    filledSlots: Number,
    type: String,
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Member"
    },
})

module.exports = mongoose.model('Training', TrainingSchema)
