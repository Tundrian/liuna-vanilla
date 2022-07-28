// Packages
const express = require('express')
require('dotenv').config()
const colors = require('colors')
const cors = require('cors')

// Modules
const connectDB = require('./config')
// const { response } = require('express')

// Variables
const PORT = process.env.PORT

// Middleware
const app = express()
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParse.urlencoded({}))
connectDB()

// Routes
const apiRoutes = require('./routes/apiRoutes')

/* General Routes */

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/admin', (req, res) => {
    res.render('admin/dashboard.ejs')
})
app.get('/member', (req, res) => {
    res.render('member/dashboard.ejs')
})

/* Admin Routes */
app.get('/admin/member', (req, res) => {
    res.render('admin/member/index.ejs')
})
app.get('/admin/certificate', (req, res) => {
    res.render('admin/certificate/index.ejs')
})
app.get('/admin/course', (req, res) => {
    res.render('admin/course/index.ejs')
})
app.get('/admin/dispatch', (req, res) => {
    res.render('admin/dispatch/index.ejs')
})
app.get('/admin/trainingSession', (req, res) => {
    res.render('admin/trainingSession/index.ejs')
})
app.get('/admin/user', (req, res) => {
    res.render('admin/user/index.ejs')
})
app.get('/admin/contractors', (req, res) => {
    res.render('admin/contractors/index.ejs')
})

/* Member Routes */
app.get('/member/certificate', (req, res) => {
    res.render('member/certificate/index.ejs')
})
app.get('/member/dispatch', (req, res) => {
    res.render('member/dispatches/index.ejs')
})
app.get('/member/trainingSessions', (req, res) => {
    res.render('member/trainingSessions/index.ejs')
})
app.get('/member/upcomingTraining', (req, res) => {
    res.render('member/upcomingTraining/index.ejs')
})

/* CRUD Routes */
// Members
app.get('/api/members')


app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})