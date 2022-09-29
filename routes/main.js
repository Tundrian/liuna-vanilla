const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", ensureAuth, authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/contact", (req, res) =>{
    res.render('contact.ejs')
})
module.exports = router