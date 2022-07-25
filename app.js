// Packages
const express = require('express')
require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
// Modules
const connectDB = require('./config')

// Variables
const PORT = process.env.PORT

// Models
const Member = require('./models/Member')
const member1 = new Member ({
    name: 'John',
    role: 'new member'
})

member1.save(function (error, document) {
    if(error) console.error(error + ''.red)
    console.log(document + ''.yellow)
    
})

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

app.post('/users', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})