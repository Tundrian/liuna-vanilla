const express = require('express')
const router = express.Router()
const {
    getMembers,
    setMember
} = require('../controllers/member')

router.route('/member').get(getMembers).post(setMember)

module.exports = router