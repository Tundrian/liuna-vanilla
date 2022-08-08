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
const memberFields = [
    {
        label: 'Name',
        id: 'full-name',
        type: 'text',
        placeholder: 'Full name' 
    },
    {
        label: 'First Name',
        id: 'first-name',
        type: 'text',
        placeholder: 'First name' 
    },
    {
        label: 'Last Name',
        id: 'last-name',
        type: 'text',
        placeholder: 'Last name' 
    },
    {
        label: 'Role',
        id: 'role',
        type: 'text',
        placeholder: 'Role' 
    },
    {
        label: 'Member Number',
        id: 'member-number',
        type: 'text',
        placeholder: 'Member #' 
    },
    {
        label: 'Status',
        id: 'status',
        type: 'text',
        placeholder: 'Status' 
    },
]

const certificateFields = [
    {
        label: 'Name',
        id: 'name',
        type: 'text',
        placeholder: 'Name' 
    },
    {
        label: 'Description',
        id: 'description',
        type: 'text',
        placeholder: 'Description' 
    },
    {
        label: 'Type',
        id: 'type',
        type: 'text',
        placeholder: 'Type' 
    },
    {
        label: 'Expiration Length',
        id: 'expiration-length',
        type: 'number',
        placeholder: 'Expiration Length' 
    }
]
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
    res.render('admin/member/index.ejs', {fields: memberFields})
})
app.get('/admin/certificate', (req, res) => {
    res.render('admin/certificate/index.ejs', {fields: certificateFields})
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

app.get('/member', (req, res) => {
    res.render('member/dashboard.ejs')
})

app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})