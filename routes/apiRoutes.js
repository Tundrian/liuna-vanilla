const express = require('express')
const router = express.Router()

const { getMembers,      setMember,      getMember,      updateMember,      deleteMember }      = require('../controllers/member')
const { getCertificates, setCertificate, getCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificate')
const { getContractors,  setContractor,  getContractor,  updateContractor,  deleteContractor }  = require('../controllers/contractor')
const { getCourses,      setCourse,      getCourse,      updateCourse,      deleteCourse }      = require('../controllers/course')
const { getDispatches,   setDispatch,    getDispatch,    updateDispatch,    deleteDispatch }    = require('../controllers/dispatch')
const { getTrainings,    setTraining,    getTraining,    updateTraining,    deleteTraining }    = require('../controllers/training')
const { getUsers,        setUser,        getUser,        updateUser,        deleteUser, 
        updateUserMemberNumber}                                                                 = require('../controllers/user')

router.route('/certificate/:id').get(getCertificate).delete(deleteCertificate).put(updateCertificate)
router.route('/certificate').get(getCertificates).post(setCertificate)
router.route('/certificate/:certificate_id').get(getCertificate)

router.route('/contractor/:id').get(getContractor).delete(deleteContractor).put(updateContractor)
router.route('/contractor').get(getContractors).post(setContractor)
router.route('/contractor/:contractor_id').get(getContractor)

router.route('/course/:id').get(getCourse).delete(deleteCourse).put(updateCourse)
router.route('/course').get(getCourses).post(setCourse)
router.route('/course/:course_id').get(getCourse)

router.route('/dispatch/:id').get(getDispatch).delete(deleteDispatch).put(updateDispatch)
router.route('/dispatch').get(getDispatches).post(setDispatch)
router.route('/dispatch/:dispatch_id').get(getDispatch)

router.route('/training/:id').get(getTraining).delete(deleteTraining).put(updateTraining)
router.route('/training').get(getTrainings).post(setTraining)
router.route('/training/:training_id').get(getTraining)

router.route('/member/:id').get(getMember).delete(deleteMember).put(updateMember)
router.route('/member').get(getMembers).post(setMember)
router.route('/member/:member_id').get(getMember)

router.route('/user/:id').get(getUser).delete(deleteUser).put(updateUser)
router.route('/user').get(getUsers).post(setUser)
router.route('/user/:user_id').get(getUser)
router.route('/user/memberNumber/:id').put(updateUserMemberNumber)

module.exports = router