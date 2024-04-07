const User = require("../models/user");

module.exports.signupUser = async(req,res) => {
    res.render("users/signup.ejs");
    };

module.exports.rendersignupForm = async(req,res) => {
    try{
    let {username,email,password} =req.body;
    const newUser = new User({ email , username});
    const registeredUser = await User.register(newUser ,password);
    console.log(registeredUser);
    req.login(registeredUser,(err) => {
        if(err) {
            return next(err)
        }
        req.flash("success","Welcome  to WanderLust");
        res.redirect("/listings");

    })
   
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};
module.exports.renderloginForm = (req,res) => {
    res.render("users/login.ejs");
};
module.exports.login = async(req,res) => {
    req.flash("success","Welcome back to WanderLust");
    let redirecturl = res.locals.redirectUrl || "/listings"
    res.redirect(redirecturl);
};

module.exports.logout = (req,res,next) =>{
    req.logOut((err) => {
        if(err) {
          return next(err);
        }
        req.flash("success","you are loggged out");
        res.redirect("/listings");
    })
};