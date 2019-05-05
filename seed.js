let mongoose = require("mongoose"),
    Recipe   = require("./models/recipe"),
    Comment  = require("./models/comment")

    let data = [
        {
            name: "Jollof Rice",
            image: "https://www.wikihow.com/images/b/b4/IMG_0259.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Beans",
            image: "https://newengland.com/wp-content/uploads/old-fashioned-baked-beans-recipe.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Pounded Yam",
            image: "https://i.pinimg.com/236x/18/7d/a8/187da8db1cdde6cd3c66a8887e22f932--store-online-naija.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Jollof Rice",
            image: "https://www.wikihow.com/images/b/b4/IMG_0259.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]

    const seedDB = () => {
        Recipe.remove({}, (err) => {
            // if(err){
            //     console.log(err);
            // }else{
            //     console.log("Removed Recipe");
            //     data.forEach((seed)=> {
            //         Recipe.create(seed, (err,recipe)=>{
   
            //             if(err){
            //                 console.log(err);
            //             }else{
            //                 console.log("Added A new Recipe");
            //                 Comment.create({
            //                     text:"I love these foods, so delicious",
            //                     author:"Nath"
            //                 }, (err, comment)=> {
            //                     if(err){
            //                         console.log(err);
            //                     }else{
            //                         recipe.comments.push(comment);
            //                         recipe.save();
            //                         console.log("Added a comment");
            //                     }
            //                 })
            //             }
            //         })
            //     })
            // }
        })
    }

   module.exports = seedDB;

   