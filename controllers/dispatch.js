const Dispatch = require('../models/Dispatch')

const asyncHandler = require('express-async-handler')

const getDispatches = asyncHandler(async (req, res) => {
    try{
        const allDispatches = await Dispatch.find()
        res.status(200).json(allDispatches)
    } catch(error){
        throw new Error(error)
    }
})

const setDispatch = asyncHandler(async (req, res) => {
    try{
        const dispatch = await Dispatch.create({
            name: req.body.name,
            description: req.body.description,
            contractorId: req.body.contractorId,
            type: req.body.type,
            length: req.body.length,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        res.status(200).json(dispatch)
    } catch(error){
        throw new Error(error)
    }
})

const getDispatch = asyncHandler(async (req, res) => {
    try{
        const dispatch = await Dispatch.findOne({_id: req.params.id})
        res.status(200).json(dispatch)
    }catch(error){
        throw new Error(error)
    }
})

const updateDispatch = asyncHandler(async (req, res) => {
    const dispatch = await Dispatch.findOne({_id: req.params.id})
    if(!dispatch){
        res.status(400)
        throw new Error('Dispatch not found')
    }

    const updatedDispatch = await Dispatch.findOneAndUpdate({ _id: req.params.id}, {
        name: req.body.name,
        description: req.body.description,
        contractorId: req.body.contractorId,
        type: req.body.type,
        length: req.body.length,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    res.status(200).json(updatedDispatch)
})

const deleteDispatch = asyncHandler(async (req, res) => {
    const dispatch = await Dispatch.findOne({_id: req.params.id})
    if(!dispatch){
        res.status(400)
        throw new Error('Dispatch not found')
    }

    await Dispatch.findOneAndDelete({ _id: req.params.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getDispatches,
    setDispatch,
    getDispatch,
    updateDispatch,
    deleteDispatch
}