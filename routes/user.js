const express = require("express");
const router =express.Router();
const User =require("../models/user.js");
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
.get(wrapAsync(userController.signupUser))
.post(wrapAsync(userController.rendersignupForm));


router.route("/login")
.get(userController.renderloginForm)
.post(
saveRedirectUrl,
passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash:true,
}),userController.login
);


router.get("/logout",userController.logout);

module.exports = router;

// router.get("/signup",wrapAsync(userController.signupUser));

// router.post("/signup",wrapAsync(userController.rendersignupForm)
// // );
// router.get("/login",userController.renderloginForm);
// router.post("/login",
// saveRedirectUrl,
// passport.authenticate("local",{
//     failureRedirect: "/login",
//     failureFlash:true,
// }),userController.login
// );

