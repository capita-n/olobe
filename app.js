let express        = require('express'),
    app            = express(),
    bodyPparser    = require('body-parser'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    LocalStrategy  = require("passport-local"),
    seedDB         = require('./seed'),
    User           = require("./models/user"),
    MethodOveeride = require("method-override"),
    flash          = require("connect-flash")

let recipeRoutes    = require("./routes/recipe"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index")

// seedDB();

// const mongoDB_string = "mongodb+srv://dbolobe:passwordolobe@cluster0-wbtpo.mongodb.net/test?retryWrites=true"
const mongoDB_string = "mongodb://localhost/olobe"
mongoose.connect(mongoDB_string, {dbName:'olobe',useNewUrlParser:true})
.then(_ => console.log("connected to database!!"))
.catch(err => console.log("THERE WAS ERROR: ",{err}))




app.use(bodyPparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(MethodOveeride("_method"));
app.use(express.static(__dirname + "/public"));



//PASSPORT CONFIG
app.use(require('express-session')({
    secret:"Im the fucking best!",
    resave: false,
    saveUninitialized: false
}));
//connect-flash middleware
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    res.locals.currentUser = req.user;
    next();
})
//Requiring Routes
app.use("/",indexRoutes);
app.use("/recipes/:id/comments",commentRoutes);
app.use("/recipes",recipeRoutes);

app.listen(3000, ()=>{
    console.log("The Olobe Server Has started");
});

