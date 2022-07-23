// Packages
const express = require('express')
require('dotenv').config()

// Modules
const connectDB = require('./config')

// Variables
const PORT = process.env.PORT

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.ejs')
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})