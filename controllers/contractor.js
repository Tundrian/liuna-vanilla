const Contractor = require('../models/Contractor')

const asyncHandler = require('express-async-handler')

const getContractors = asyncHandler(async (req, res) => {
    try{
        const allContractors = await Contractor.find()
        res.status(200).json(allContractors)
    } catch(error){
        throw new Error(error)
    }
})

const setContractor = asyncHandler(async (req, res) => {
    try{
        const contractor = await Contractor.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            type: req.body.type,
            acquireDate: req.body.acquireDate,
            reminderDate: req.body.reminderDate
        })
        res.status(200).json(contractor)
    } catch(error){
        throw new Error(error)
    }
})

const getContractor = asyncHandler(async (req, res) => {
    try{
        const contractor = await Contractor.findOne({_id: req.params.id})
        res.status(200).json(contractor)
    }catch(error){
        throw new Error(error)
    }
})

const updateContractor = asyncHandler(async (req, res) => {
    const contractor = await Contractor.findOne({_id: req.params.id})
    if(!contractor){
        res.status(400)
        throw new Error('Contractor not found')
    }

    const updatedContractor = await Contractor.findOneAndUpdate({ _id: req.params.id}, {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        acquireDate: req.body.acquireDate,
        reminderDate: req.body.reminderDate
    })

    res.status(200).json(updatedContractor)
})

const deleteContractor = asyncHandler(async (req, res) => {
    const contractor = await Contractor.findOne({_id: req.params.id})
    if(!contractor){
        res.status(400)
        throw new Error('Contractor not found')
    }

    await Contractor.findOneAndDelete({ _id: req.params.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getContractors,
    setContractor,
    getContractor,
    updateContractor,
    deleteContractor
}