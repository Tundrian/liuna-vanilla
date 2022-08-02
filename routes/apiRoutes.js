const express = require('express')
const router = express.Router()
const {
    getMembers,
    setMember,
    getMember,
    updateMember,
    deleteMember
} = require('../controllers/member')

router.route('/member/:id').get(getMember).delete(deleteMember).put(updateMember)
router.route('/member').get(getMembers).post(setMember)
router.route('/member/:member_id').get(getMember)

module.exports = router