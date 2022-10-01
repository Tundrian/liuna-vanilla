const Member = require('../models/Member')

const asyncHandler = require('express-async-handler')

const getMembers = asyncHandler(async (req, res) => {
    try{
        const allMembers = await Member.find()
        res.status(200).json(allMembers)
    } catch(error){
        throw new Error(error)
    }
})

const setMember = asyncHandler(async (req, res) => {
    try{
        const member = await Member.create({
            name: req.body.name,
            role: req.body.role,
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            status: req.body.status,
            memberNumber: req.body.memberNumber,
            certificates: req.body.certificates

        })
        res.status(200).json(member)
    } catch(error){
        throw new Error(error)
    }
})

const getMember = asyncHandler(async (req, res) => {
    try{
        const member = await Member.findOne({_id: req.params.id})
        res.status(200).json(member)
    }catch(error){
        throw new Error(error)
    }
})

const updateMember = asyncHandler(async (req, res) => {
    const member = await Member.findOne({_id: req.params.id})
    if(!member){
        res.status(400)
        throw new Error('Member not found')
    }

    const updatedMember = await Member.findOneAndUpdate({ _id: req.params.id}, {
        name: req.body.name,
        role: req.body.role,
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.status,
        memberNumber: req.body.memberNumber,
        certificates: req.body.certificates
    })

    res.status(200).json(updatedMember)
})

const deleteMember = asyncHandler(async (req, res) => {
    const member = await Member.findOne({_id: req.params.id})
    if(!member){
        res.status(400)
        throw new Error('Member not found')
    }

    await Member.findOneAndDelete({ _id: req.params.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getMembers,
    setMember,
    getMember,
    updateMember,
    deleteMember
}