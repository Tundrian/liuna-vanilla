const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
// const nodemailer = require('nodemailer')

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", ensureAuth, authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/contact", (req, res) =>{
    res.render('contact.ejs', {msg: null})
})
router.post("/contact", (req,res) => {
    console.log(req.body)
    // const output = `
    // <p>You have a new contact request</p>
    // <h3>Contact Details</h3>
    // <ul>
    //     <li>Email: ${req.body.email}</li>
    //     <li>Subject: ${req.body.subject}</li>
    //     <li>Body: ${req.body.text}</li>
    // </ul>
    // `
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         type:"OAuth2",
    //         clientId: process.env.GMAIL_CLIENT_ID,
    //         clientSecret: process.env.GMAIL_CLIENT_SECRET
    //     }, 
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // })

    // transporter.sendMail({
    //     from: `${req.body.email} antoniosansotta@gmail.com`,
    //     to: "antoniosansotta@gmail.com",
    //     subject: req.body.subject,
    //     text: req.body.text,
    //     auth: {
    //         user: "antoniosansotta@gmail.com",
            
    //     }
    // })

    res.render('contact.ejs', {msg: 'Email has been sent'})
})
module.exports = router