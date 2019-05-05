let express = require("express");
let router  = express.Router();
let passport = require("passport");
let User = require("../models/user");

//Root Route
router.get("/", (req,res)=>{
    res.render("landing");
})



//Shows register form
router.get("/register", (req,res)=>{
    res.render("register")
})

//handles sign up logic
router.post("/register",(req,res)=>{
    var newUser = new User({
        email: req.body.email,
        username: req.body.username,
        // passport: req.body.password
    })
    User.register(newUser, req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req,res, ()=>{
            req.flash('success', 'Welcome To Olobe ' + user.username);
            res.redirect('/recipes');
        })
    })
})

//Shows Login Page
router.get("/login",(req,res)=>{
    res.render("login");
})

//handles login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/recipes",
        failureRedirect:"/login"

    }), (req,res)=> {
});

//Logout route
router.get("/logout", (req,res)=>{
    req.logout();
    req.flash('success', 'Logged You Out');
    res.redirect("/recipes");
})

    function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
    }

module.exports = router;