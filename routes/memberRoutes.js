const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.route('/').get(ensureAuth, (req, res) => {
    res.render('member/dashboard.ejs')
})

/* Member Routes */
router.route('/certificate').get(ensureAuth, (req, res) => {
    res.render('member/certificate/index.ejs')
})
router.route('/dispatch').get(ensureAuth, (req, res) => {
    res.render('member/dispatches/index.ejs')
})
router.route('/trainingSessions').get(ensureAuth, (req, res) => {
    res.render('member/trainingSessions/index.ejs')
})
router.route('/upcomingTraining').get(ensureAuth, (req, res) => {
    res.render('member/upcomingTraining/index.ejs')
})

module.exports = router