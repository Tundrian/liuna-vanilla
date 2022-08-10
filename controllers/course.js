const Course = require('../models/Course')

const asyncHandler = require('express-async-handler')

const getCourses = asyncHandler(async (req, res) => {
    try{
        const allCourses = await Course.find()
        res.status(200).json(allCourses)
    } catch(error){
        throw new Error(error)
    }
})

const setCourse = asyncHandler(async (req, res) => {
    try{
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            renewalLength: req.body.renewalLength,
            length: req.body.length
        })
        res.status(200).json(course)
    } catch(error){
        throw new Error(error)
    }
})

const getCourse = asyncHandler(async (req, res) => {
    try{
        const course = await Course.findOne({_id: req.params.id})
        res.status(200).json(course)
    }catch(error){
        throw new Error(error)
    }
})

const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findOne({_id: req.params.id})
    if(!course){
        res.status(400)
        throw new Error('Course not found')
    }

    const updatedCourse = await Course.findOneAndUpdate({ _id: req.params.id}, {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        renewalLength: req.body.renewalLength,
        length: req.body.length
    })

    res.status(200).json(updatedCourse)
})

const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findOne({_id: req.params.id})
    if(!course){
        res.status(400)
        throw new Error('Course not found')
    }

    await Course.findOneAndDelete({ _id: req.params.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getCourses,
    setCourse,
    getCourse,
    updateCourse,
    deleteCourse
}