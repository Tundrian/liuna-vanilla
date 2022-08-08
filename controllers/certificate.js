const Certificate = require('../models/Certificate')

const asyncHandler = require('express-async-handler')

const getCertificates = asyncHandler(async (req, res) => {
    try{
        const allCertificates = await Certificate.find()
        res.status(200).json(allCertificates)
    } catch(error){
        throw new Error(error)
    }
})

const setCertificate = asyncHandler(async (req, res) => {
    try{
        const certificate = await Certificate.create({
            description: req.body.description,
            name: req.body.name,
            type: req.body.type,
            expiration_length: req.body.expiration_length
        })
        res.status(200).json(certificate)
    } catch(error){
        throw new Error(error)
    }
})

const getCertificate = asyncHandler(async (req, res) => {
    try{
        const certificate = await Certificate.findOne({_id: req.params.id})
        res.status(200).json(certificate)
    }catch(error){
        throw new Error(error)
    }
})

const updateCertificate = asyncHandler(async (req, res) => {
    const certificate = await Certificate.findOne({_id: req.params.id})
    if(!member){
        res.status(400)
        throw new Error('Certificate not found')
    }

    const updatedCertificate = await Certificate.findOneAndUpdate({ _id: req.params.id}, {
        description: req.body.description,
        name: req.body.name,
        type: req.body.type,
        expiration_length: req.body.expiration_length
    })

    res.status(200).json(updatedCertificate)
})

const deleteCertificate = asyncHandler(async (req, res) => {
    const certificate = await Certificate.findOne({_id: req.params.id})
    if(!certificate){
        res.status(400)
        throw new Error('Certificate not found')
    }

    await Certificate.findOneAndDelete({ _id: req.params.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getCertificates,
    setCertificate,
    getCertificate,
    updateCertificate,
    deleteCertificate
}