// Packages
const express = require('express')
require('dotenv').config()
const colors = require('colors')
const cors = require('cors')

// Modules
const connectDB = require('./config/config')

// Variables
const PORT = process.env.PORT

// Middleware
const app = express()
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// DB Connection
connectDB()

// Routes
const mainRoutes = require('./routes/main')
const apiRoutes = require('./routes/apiRoutes')
const adminRoutes = require('./routes/adminRoutes')
const memberRoutes = require('./routes/memberRoutes')
// const authRoutes = require('./routes/authRoutes')

app.use('/', mainRoutes)
// app.use('/auth', authRoutes)
app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)
app.use('/member', memberRoutes)

app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})