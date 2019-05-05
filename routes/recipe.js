let express = require("express");
let router  = express.Router();
let Recipe =require("../models/recipe");
let middleware = require("../middleware");

//INDEX ROUTE- SHow all the Recipes
router.get("/", (req,res) => {
    //Get all Recipes From DB
    Recipe.find({}, (err, allRecipes) => {
        if(err){
            console.log(err);
        }else{
            res.render("recipes/recipes", {recipes:allRecipes}); 
        }
    })
});


//CREATE ROUTE- Add new Recipe to the DB
router.post("/", middleware.isLoggedIn, (req,res) =>{
    //get new recipe from form 
    var name = req.body.name;
    var image = req.body.image;
    var description= req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRecipe = {name:name, image:image, description:description, author:author};
    //Create a New Recipe and save to DB
    Recipe.create(newRecipe,(err, newlyCreatedRecipe) => {
        if(err){
            console.log(err)
        }else{
            //then redirect back to /recipe
            res.redirect("/recipes")
        }
    })
 
});

//NEW - Shows the form to add new recipe
router.get("/new", middleware.isLoggedIn, (req,res)=> {
    res.render("recipes/new")
});

router.get("/:id", (req,res) => {
    //Find Recipe By Id
    Recipe.findById(req.params.id).populate("comments").exec((err,foundRecipe) => {
        if(err){
            console.log(err);
        }else{
            console.log(foundRecipe);
            //Render Details Template With Recipe
            res.render("recipes/details", {recipe:foundRecipe});  
        }
    });
});


//EDIT ROUTE
router.get("/:id/edit", middleware.checkRecipeOwnership, (req,res)=>{
   Recipe.findById(req.params.id, (err, foundRecipe)=>{
    res.render("recipes/edit", {recipe:foundRecipe});
       
   })
    
});
//UPDATE ROUTE
router.put("/:id", middleware.checkRecipeOwnership, (req,res)=>{
    //find and update the correct recipe
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe)=>{
        if(err){
            res.redirect("/recipes");
        }else{
             //redrect to the details page
            res.redirect("/recipes/"+req.params.id);
        }
    })
   
})

//DESTROY ROUTE
router.delete("/:id", middleware.checkRecipeOwnership, (req, res)=>{
    Recipe.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/recipes");
        }else {
            req.flash('success', 'Recipe Added Successfully!');
            res.redirect("/recipes");
        }
    })
})

//MiddleWare
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login")
//     }


// function checkRecipeOwnership(req, res, next){
//     //is user logged in?
//     if(req.isAuthenticated()){
//         Recipe.findById(req.params.id, (err, foundRecipe)=>{
//             if(err){
//                 res.redirect("back");
//             } else{
//                 //does reciper belong to the user?
//                 if(foundRecipe.author.id.equals(req.user._id)){
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