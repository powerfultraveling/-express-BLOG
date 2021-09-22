//some variables
const express = require("express");
const server = express();
const port = process.env.PORT || 3000;

//inport modules
const userControler = require("./control/userControl.js");
const articleControler = require("./control/articleControl.js");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require('express-flash');
const showdown = require("showdown");

//general setting
server.set("view engine", "ejs");
server.use(express.static("public"));

//middleware
server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
server.use(flash())
server.use((req, res, next) => {
    res.locals.userId = req.session.userId;
    res.locals.username = req.session.username;
    res.locals.isAdmin = req.session.isAdmin
    res.locals.errorMessage = req.flash("errorMessage");
    next()
})

//middleware homemade
function goBack(req, res){
    res.redirect("back");
}

//rout setting
server.get('/', articleControler.index);
server.get("/login", userControler.login);
server.post("/login", userControler.login_handler, goBack);
server.get("/logout", userControler.logout);
server.get("/register",  userControler.register);
server.post("/register", userControler.register_handler, goBack);

server.get("/user", userControler.user_page);
server.get("/profile", userControler.profile_page);
server.post("/profile", userControler.profile_update)

server.get("/write", articleControler.write_page);
server.post("/write", articleControler.add);

// server.post("/article/:id", articleControler.add);
server.get("/article/:id", articleControler.article_page);
server.get("/articles", articleControler.articles_page)

server.get("/edit/:id", articleControler.edit_page);
server.post("/edit/:id", articleControler.edit);
server.get("/delete/:id", articleControler.delete_article);
//open port 
server.listen(port, () =>{
    console.log("listen to port!")
})