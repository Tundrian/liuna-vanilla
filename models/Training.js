const mongoose = require('mongoose')

const TrainingSchema = mongoose.Schema({
    course_id: String,
    start_date: Date,
    end_date: Date,
    scheduled_dates: Enumerator,
    available_slots: Number,
    open_slots: Number,
    filled_slots: Number,
    type: String,
    certification_name: String
})

module.exports = mongoose.model('Training', TrainingSchema)
