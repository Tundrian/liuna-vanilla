const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.route('/', ensureAuth).get((req,res) => res.render('admin/dashboard.ejs'))

/* Admin Routes */
router.route('/member', ensureAuth).get((req, res) =>  res.render('admin/member/index.ejs'))
router.route('/contractor', ensureAuth).get((req, res) => res.render('admin/contractor/index.ejs'))
router.route('/certificate', ensureAuth).get((req, res) => res.render('admin/certificate/index.ejs'))
router.route('/course', ensureAuth).get((req, res) =>  res.render('admin/course/index.ejs'))
router.route('/dispatch', ensureAuth).get((req, res) =>  res.render('admin/dispatch/index.ejs'))
router.route('/trainingSession', ensureAuth).get((req, res) =>  res.render('admin/trainingSession/index.ejs'))
router.route('/user', ensureAuth).get((req, res) =>  res.render('admin/user/index.ejs'))

module.exports = router