const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");


router.get("/login", authController.loginForm);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/register", authController.registerForm);
router.post("/register", authController.register);

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/auth/login'); 
    });
});


module.exports = router;
