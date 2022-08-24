// Packages
const express = require('express')
require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// Modules
const connectDB = require('./config/config')

// Variables
const PORT = process.env.PORT

// Passport config
require('./config/passport')(passport)

// Middleware
const app = express()
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// DB Connection
connectDB()

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
// require('./config/passport')(passport)
//   Connect flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
const mainRoutes = require('./routes/main')
const apiRoutes = require('./routes/apiRoutes')
const adminRoutes = require('./routes/adminRoutes')
const memberRoutes = require('./routes/memberRoutes')
const authRoutes = require('./routes/authRoutes')

app.use('/', mainRoutes)
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)
app.use('/member', memberRoutes)

app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})