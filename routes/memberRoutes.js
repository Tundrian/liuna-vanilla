const express = require('express')
const router = express.Router()

router.route('/').get((req, res) => {
    res.render('member/dashboard.ejs')
})

/* Member Routes */
router.route('/certificate').get((req, res) => {
    res.render('member/certificate/index.ejs')
})
router.route('/dispatch').get((req, res) => {
    res.render('member/dispatches/index.ejs')
})
router.route('/trainingSessions').get((req, res) => {
    res.render('member/trainingSessions/index.ejs')
})
router.route('/upcomingTraining').get((req, res) => {
    res.render('member/upcomingTraining/index.ejs')
})

module.exports = router