let express = require("express");
let router  = express.Router({mergeParams:true});
let Recipe  = require("../models/recipe");
let Comment = require("../models/comment");
let middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, (req,res)=>{
    // Find Recipe By Id
    Recipe.findById(req.params.id,(err, foundRecipe)=> {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {recipe:foundRecipe});
        }
    })
});

//Comment Create
router.post("/", middleware.isLoggedIn, (req,res)=>{
    Recipe.findById(req.params.id,(err, foundRecipe)=>{
        if(err){
            console.log(err);
            res.redirect("/recipes")
        }else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    req.flash('error', 'Something went wrong!');
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    foundRecipe.comments.push(comment);
                    foundRecipe.save();
                    res.redirect('/recipes/' + foundRecipe._id);
                }
            });
        }
    })
});

//Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {recipe_id:req.params.id, comment:foundComment});
        }
    })
    
})

//Update Route
router.put("/:comment_id",middleware.checkCommentOwnership, (req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        }else {
            res.redirect("/recipes/"+req.params.id);
        }
    })
})

//Comment Delete Route
router.delete("/:comment_id",middleware.checkCommentOwnership, (req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }else {
            req.flash('success', 'Comment Deleted');
            res.redirect("/recipes/" + req.params.id)
        }
    })
})

//Middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login")
//     }


    // function checkCommentOwnership(req, res, next){
    //     //is user logged in?
    //     if(req.isAuthenticated()){
    //         Comment.findById(req.params.comment_id, (err, foundComment)=>{
    //             if(err){
    //                 res.redirect("back");
    //             } else{
    //                 //does comment belong to the user?
    //                 if(foundComment.author.id.equals(req.user._id)){
    //                     next();
    //                 }else{
    //                     res.redirect("back");
    //                 }
    //             }
    //         })
    //     }else {
    //         res.redirect("back");
    //     }
    // }

module.exports = router;