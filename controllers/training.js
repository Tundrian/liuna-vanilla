const Training = require('../models/Training')

const asyncHandler = require('express-async-handler')

const getTrainings = asyncHandler(async (req, res) => {
    try{
        const allTrainings = await Training.find()
        res.status(200).json(allTrainings)
    } catch(error){
        throw new Error(error)
    }
})

const setTraining = asyncHandler(async (req, res) => {
    try{
        const training = await Training.create({
            courseId: req.body.courseId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            length: req.body.courseLength,
            scheduledDates: req.body.scheduledDates,
            totalSlots: req.body.availableSlots,
            openSlots: req.body.openSlots,
            filledSlots: req.body.filledSlots,
            type: req.body.type,
            // attendees: req.body.attendees
        })
        res.status(200).json(training)
    } catch(error){
        throw new Error(error)
    }
})

const getTraining = asyncHandler(async (req, res) => {
    try{
        const training = await Training.findOne({_id: req.params.id})
        res.status(200).json(training)
    }catch(error){
        throw new Error(error)
    }
})

const updateTraining = asyncHandler(async (req, res) => {
    const training = await Training.findOne({_id: req.params.id})
    if(!training){
        res.status(400)
        throw new Error('Training not found')
    }

    const updatedTraining = await Training.findOneAndUpdate({ _id: req.params.id}, {
        courseId: req.body.courseId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        length: req.body.courseLength,
        scheduledDates: req.body.scheduledDates,
        totalSlots: req.body.availableSlots,
        openSlots: req.body.openSlots,
        filledSlots: req.body.filledSlots,
        type: req.body.type,
        // attendees: req.body.attendees
    })

    res.status(200).json(updatedTraining)
})

const deleteTraining = asyncHandler(async (req, res) => {
    const training = await Training.findOne({_id: req.params.id})
    if(!training){
        res.status(400)
        throw new Error('Training not found')
    }

    await Training.findOneAndDelete({ _id: req.params.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTrainings,
    setTraining,
    getTraining,
    updateTraining,
    deleteTraining
}