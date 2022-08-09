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
            course_id: req.body.course_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            scheduled_dates: req.body.scheduled_dates,
            available_slots: req.body.available_slots,
            open_slots: req.body.open_slots,
            filled_slots: req.body.filled_slots,
            type: req.body.type,
            certification_name: req.body.certification_name
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
        course_id: req.body.course_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        scheduled_dates: req.body.scheduled_dates,
        available_slots: req.body.available_slots,
        open_slots: req.body.open_slots,
        filled_slots: req.body.filled_slots,
        type: req.body.type,
        certification_name: req.body.certification_name
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