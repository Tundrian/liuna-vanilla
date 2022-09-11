const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.route('/').get(ensureAuth, (req,res) => res.render('admin/dashboard.ejs'))

/* Admin Routes */
router.route('/member').get(ensureAuth, (req, res) =>  res.render('admin/member/index.ejs'))
router.route('/contractor').get(ensureAuth, (req, res) => res.render('admin/contractor/index.ejs'))
router.route('/certificate').get(ensureAuth, (req, res) => res.render('admin/certificate/index.ejs'))
router.route('/course', ensureAuth).get(ensureAuth, (req, res) =>  res.render('admin/course/index.ejs'))
router.route('/dispatch', ensureAuth).get(ensureAuth, (req, res) =>  res.render('admin/dispatch/index.ejs'))
router.route('/trainingSession', ensureAuth).get(ensureAuth, (req, res) =>  res.render('admin/trainingSession/index.ejs'))
router.route('/user', ensureAuth).get(ensureAuth, (req, res) => res.render('admin/user/index.ejs'))

module.exports = router