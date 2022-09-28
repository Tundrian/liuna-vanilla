const User = require('../models/User')

const asyncHandler = require('express-async-handler')

const getUsers = asyncHandler(async (req, res) => {
    try{
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch(error){
        throw new Error(error)
    }
})

const setUser = asyncHandler(async (req, res) => {
    try{
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch(error){
        throw new Error(error)
    }
})

const getUser = asyncHandler(async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id})
        res.status(200).json(user)
    }catch(error){
        throw new Error(error)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findOneAndUpdate({ _id: req.params.id}, {
        name: req.body.name,
        password: req.body.password,
        verified: req.body.verified,
        theme: req.body.theme,
        memberNumber: req.body.memberNumber,
        data: req.body.date,
        role: req.body.role
    })

    res.status(200).json(updatedUser)
})

const updateUserMemberNumber = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findOneAndUpdate({ _id: req.params.id}, {
        memberNumber: req.body.memberNumber,
    })

    res.status(200).json(updatedUser)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    await User.findOneAndDelete({ _id: req.params.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getUsers,
    setUser,
    getUser,
    updateUser,
    deleteUser,
    updateUserMemberNumber
}