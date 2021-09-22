//require module
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../models");
const User = db.User;
const Articles = db.Articles

const userControler = {
    user_page: (req, res) => {
        const userId = req.session.userId;
        Articles.findAll({
            where: {
                userId: userId
            }
        }).then((article) => {
            res.render("user/user_page",{
                article: article
            })
        }).catch((err) => {
            console.log(err);
            return res.redirect("/");
        })
    },

    profile_page: (req, res) => {
        const userId = req.session.userId;
        User.findOne({
            where: {
                id: userId
            }
        }).then((user) => {
            res.render("profile", {
                user: user
            })
        }).catch((err) => {
            console.log(err);
            return res.redirect("/");
        })
    },

    profile_update: (req, res) => {
        const username = req.body.updated_username;
        const userId = req.session.userId;
        
        User.update({
            username: username
        },
        {
            where: {
                id: userId
            }
        }).then(() => {
            console.log("sucess!")
            res.redirect("/user")
        }).catch((err) => {
            console.log(err);
            return res.redirect("/user")
        })
    },

    register: (req, res) => {
        res.render("user/register")
    },

    register_handler: (req, res, next) => {
        const username = req.body.register_username;
        const password = req.body.register_password;

        if(!username || !password){
            req.flash("errorMessage", "something not filled");
            res.redirect("/register")
            return 
        }

        bcrypt.hash(password, saltRounds, function(err, hash){
            if(err){
                req.flash("errorMessage", err.toString())
                return 
            }

            User.create({
                username: username,
                password: hash
            }).then((user)=>{
                console.log(user);
                req.session.userId = user.id;
                req.session.username = username;
                req.session.isAdmin = user.isAdmin;
                res.redirect("/");
            }).catch((err)=>{
                req.flash("errorMessage", err)
                res.redirect("/register");
                return 
            })
        })
        // const username = req.body.register_username;
        // const password = req.body.register_password;
        // if(!username || !password){
        //     req.flash("errorMessage", "Something not filled!")
        //     return next()
        // }

        // bcrypt.hash(password, saltRounds, function(err, hash) {
        //     if(err){
        //         req.flash("errorMessage", err.toString())
        //         return next()
        //     }

        //     User.create({
        //         username: username,
        //         password: hash
        //     }).then((task)=>{
        //         req.session.username = username;
        //         req.session.userId = task.id;
        //         res.redirect("/");
        //     }).catch((err)=>{
        //         req.flash("errorMessage", err.sqlMessage);
        //         res.redirect("/register");
        //         return 
        //     })
        // });
    },
    
    login: (req, res) => {
        res.render("user/login");
    },

    login_handler: (req, res, next) => {
        const username = req.body.login_username;
        const password = req.body.login_password;

        if(!username || !password){
            req.flash("errorMessage", "something did not filled");
            return res.redirect("/login")
        }

        User.findOne({
            where: {
                username: username
            }
        }).then((user)=>{
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err){
                    req.flash("errorMessage", "something went wrong!");
                    res.redirect("/login");
                    return
                }else if(!result){
                    req.flash("errorMessage", "The password is not correct!");
                    res.redirect("/login");
                    return
                }
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.isAdmin = user.isAdmin;
                res.redirect("/");
            })
        }).catch((err)=>{
            console.log(err)
            req.flash("errorMessage", "oops");
            res.redirect("/login")
            return
        })
        // const username = req.body.login_username;
        // const password = req.body.login_password;

        // User.findOne({
        //     where: {
        //         username: username
        //     }
        // }).then((user)=>{
        //     bcrypt.compare(password, user.password, function(err, result) {
        //         if(err || !result){
        //             req.flash("errorMessage", "password not correct!")
        //             return next()
        //         }else{
        //             req.session.username = username;
        //             req.session.userId = user.id;
        //             res.redirect("/");
        //         }
        //     });
        // }).catch((err)=>{
        //     req.flash("errorMessage", err);
        //     return next()
        // })
    },

    logout: (req, res) => {
        req.session.username = null;
        req.session.userId = null;
        res.redirect("/");
    }
}

module.exports = userControler;