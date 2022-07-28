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
        })
        res.status(200).json(game)
    } catch(error){
        throw new Error(error)
    }
})

const getMember = asyncHandler(async (req, res) => {
    try{
        const member = await Member.findOne(
            {
                _id: req.body.member.id
            }
        )
    }catch(error){
        throw new Error(error)
    }
})

module.exports = {
    getMembers,
    setMember
}