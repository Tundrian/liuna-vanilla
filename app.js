// Packages
const express = require('express')
const app = express()
const colors = require('colors')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const cors = require('cors')

const connectDB = require('./config/config')

const mainRoutes = require('./routes/main')
const apiRoutes = require('./routes/apiRoutes')
const adminRoutes = require('./routes/adminRoutes')
const memberRoutes = require('./routes/memberRoutes')

require('dotenv').config()
const PORT = process.env.PORT

require('./config/passport')(passport)

// DB Connection
connectDB()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Logging
app.use(logger("dev"))

//Use forms for put / delete
app.use(methodOverride("_method"))

app.use(cors())

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// Routes
app.use('/', mainRoutes)
app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)
app.use('/member', memberRoutes)

app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})