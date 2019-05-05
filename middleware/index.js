let Recipe = require("../models/recipe");
let Comment = require("../models/comment");
let flash = require("connect-flash");

let middleWareObj = {};

middleWareObj.checkRecipeOwnership = function checkRecipeOwnership(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id, (err, foundRecipe)=>{
            if(err){
                req.flash('error', 'You dont have Permission to do that!');
                res.redirect("back");
            } else{
                //does reciper belong to the user?
                if(foundRecipe.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error', 'You need to be Logged In to do that!');
                    res.redirect("back");
                }
            }
        })
    }else {
        req.flash('error', 'You need to be Logged In to do that!');
        res.redirect("back");
    }
}

middleWareObj.checkCommentOwnership =   function checkCommentOwnership(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                res.redirect("back");
            } else{
                //does comment belong to the user?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error', 'You dont have Permission to do that!');
                    res.redirect("back");
                }
            }
        })
    }else {
        req.flash('error', 'You need to be Logged In to do that!');
        res.redirect("back");
    }
}

middleWareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be Logged In to do that!');
    res.redirect("/login");
    }

module.exports = middleWareObj;