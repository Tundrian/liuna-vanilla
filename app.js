// Packages
const express = require('express')
require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
// Modules
const connectDB = require('./config')
const { response } = require('express')

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
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/admin', (req, res) => {
    res.render('admin/dashboard.ejs')
})


app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})