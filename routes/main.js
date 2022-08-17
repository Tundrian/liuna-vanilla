const express = require('express')
const router = express.Router()
// const bcrypt = require('bcrypt')
// const User = require('../models/User')
// const passport = require('passport')

router.get('/', (req, res) => {
    res.render('index.ejs')
})



// // Register Handle
// router.post('/register', (req, res) => {
//     console.log('register')
//     const { name, email, password, cpassword} = req.body
//     let errors = []
//     // Check required fields
//     if(!name || !email || !password || !cpassword){
//         errors.push({ msg: 'Please fill in all fields'})
//     }

//     // Check passwords match
//     if(password !== cpassword){
//         errors.push({ msg: 'Passwords do not match'})
//     }

//     // Check pass length
//     if(password.length < 6){
//         errors.push({ msg: 'Password should be at least 6 characters'})
//     }

//     if(errors.length > 0){
//         res.render('index', { 
//             errors,
//             name,
//             email,
//             password,
//             cpassword
//         })
//     }else {
//         // validation passed
//         User.findOne({ email: email})
//         .then(user => {
//             if(user){
//                 //user exists
//                 errors.push({ msg: 'Email is already registered'})
//                 res.render('index', { 
//                     errors,
//                     name,
//                     email,
//                     password,
//                     cpassword
//                 })
//             } else {
//                 const newUser = new User({
//                     name: name.toLowerCase(),
//                     email: email.toLowerCase(),
//                     password
//                 })

//                 // Hash Password
//                 bcrypt.genSalt(10, (err, salt) => 
//                     bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if(err) throw err

//                         // Set password to hashed
//                         newUser.password = hash

//                         // Save user
//                         newUser.save()
//                         .then(user => {
//                             req.flash('success_msg', 'You are now registered and can log in')
//                             // res.redirect('/admin')
//                             res.redirect('/')
//                         })
//                         .catch(err => console.error(err))
//                 }))

//             }
//         })
//     }
// })

// // Login Handle
// router.post('/login', (req, res, next) => {
//     console.log(req.body)
//     passport.authenticate('local', {
//         successRedirect: '/admin',
//         failureRedirect: '/',
//         failureFlash: true
//     })(req, res, next)
// })

module.exports = router