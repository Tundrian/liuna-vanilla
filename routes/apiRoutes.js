const express = require('express')
const router = express.Router()
const {
    getMembers,
    setMember,
    getMember,
    updateMember,
    deleteMember
} = require('../controllers/member')
const {
    getCertificates,
    setCertificate,
    getCertificate,
    updateCertificate,
    deleteCertificate
} = require('../controllers/certificate')

router.route('/certificate/:id').get(getCertificate).delete(deleteCertificate).put(updateCertificate)
router.route('/certificate').get(getCertificates).post(setCertificate)
router.route('/certificate/:certificate_id').get(getCertificate)

router.route('/member/:id').get(getMember).delete(deleteMember).put(updateMember)
router.route('/member').get(getMembers).post(setMember)
router.route('/member/:member_id').get(getMember)

module.exports = router