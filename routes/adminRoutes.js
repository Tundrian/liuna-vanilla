const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

router.route('/').get((req,res) => res.render('admin/dashboard.ejs'))

/* Admin Routes */
router.route('/member').get((req, res) =>  res.render('admin/member/index.ejs'))
router.route('/contractor').get((req, res) => res.render('admin/contractor/index.ejs'))
router.route('/certificate').get((req, res) => res.render('admin/certificate/index.ejs'))
router.route('/course').get((req, res) =>  res.render('admin/admin/index.ejs'))
router.route('/dispatch').get((req, res) =>  res.render('admin/course/index.ejs'))
router.route('/trainingSession').get((req, res) =>  res.render('admin/trainingSession/index.ejs'))
router.route('/user').get((req, res) =>  res.render('admin/user/index.ejs'))

module.exports = router