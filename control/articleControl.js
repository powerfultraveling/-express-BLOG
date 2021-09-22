const db = require("../models");
const Articles = db.Articles; 
const User = db.User;
const showdown = require("showdown");
const parser = require("node-html-parser");


const articleControler = {
    write_page: (req, res)=>{
        res.render("write");
    },

    add: (req, res) => {
        const content = req.body.content;
        const userId = req.session.userId;
        const title = req.body.title;
        
        Articles.create({
            content: content,
            title: title,
            userId: userId
        }).then(()=>{
            res.redirect("/");
        }).catch((err)=>{
            req.flash("errorMessage", "can't not update!");
            res.redirect("/write");
            return
        })
        // const content = req.body.content;
        // const userId = req.session.userId;
        // Comment.create({
        //    content: content, 
        //    userId: userId
        // }).then(()=>{
        //     res.redirect("/");
        // }).catch((err)=>{
        //     req.flash("errorMessage", "not sucess");
        //     res.redirect("/")
        //     return 
        // })
    },

    index: (req, res) =>{
        Articles.findAll({
            include: User
        }).then((result)=>{
            res.render("index", {
                result: result
            })
        }).catch((err)=>{
            console.log(err);
            return 
        })
        // Comment.findAll({
        //     include: User
        // }).then((result)=>{
        //     // console.log(result[0])
        //     // console.log(result[0].User.username)
        //     res.render("index", {
        //         result: result
        //     })
        // }).catch((err)=>{
        //     console.log(err)
        //     return
        // })
    },

    delete_article: (req, res) => {
        const id = req.params.id;
        const userId = req.session.userId;
        console.log(id, "hallo")
        Articles.findOne({
            where: {
                userId: userId,
                id: id,
            }
        }).then((article)=>{
            console.log(article)
            article.destroy()
        }).then(()=>{
            console.log("success");
            res.redirect("/");
        }).catch((err)=>{
            console.log(err);
            res.redirect(`/article/${id}`);
            return 
        })
    },    
    //     Comment.findOne({
    //         where: {
    //             id: id,
    //             username: username
    //         }
    //     }).then((task)=>{
    //         task.destroy()
    //     }).then(()=>{
    //         console.log("success")
    //         res.redirect("/"); 
    //     }).catch((err)=>{
    //         console.log(err);
    //         return res.redirect("/");
    //     })
    // },
    
    article_page: (req, res) => {
        const id = req.params.id;
        Articles.findOne({
            where:{
                id:id
            },
            include: User
        }).then((article)=>{
            const converter = new showdown.Converter();
            const text = article.content;
            const html = converter.makeHtml(text);
            let root = parser.parse(html);
            res.render("article", {
                article: root,
                title: article.title,
                time: article.createdAt,
                username: article.User.username,
                useId: article.userId,
                id: id
            })
        }).catch((err)=>{
            console.log(err);
            return
        })
    },

    articles_page: (req, res) => {
        Articles.findAll()
        .then((datas)=>{
            res.render("articles", {
                datas: datas
            })
        })
        .catch((err)=>{
            console.log(err);
            res.redirect("/");
            return
        })
    },

    edit_page: (req, res) => {
        const id = req.params.id;
        const userId = req.session.userId;
        Articles.findOne({
            where: {
                id: id,
                userId: userId
            }
        }).then((article)=>{
            const content = article.content;
            const title = article.title
            res.render("edit", {
                content: content,
                title: title
            })
        }).catch((err)=>{
                console.log(err);
                res.redirect("/");
                return
            })

        // Comment.findOne({
        //     where: {
        //         id: id
        //     }
        // }).then((result)=>{
        //     res.render("edit", {
        //         result: result
        //     })
        // }).catch((err)=>{
        //     return res.redirect("/");
        // })
    },

    edit: (req, res) => {
        const content = req.body.content;
        const title = req.body.title;
        const id = req.params.id;
        const userId = req.session.userId;

        Articles.update({
            content: content,
            title: title
        },{
            where: {
                id: id,
                userId: userId
            }
        }).then(()=>{
            console.log("success");
            res.redirect("/");           
        }).catch((err)=>{
            console.log(err);
            res.redirect("/");
        })
        // const content = req.body.content;
        // const id = req.params.id;
        // const userId = req.session.userId;
        // Comment.update({content: content}, {
        //     where:{
        //         id: id,
        //         userId: userId
        //     }
        // }).then(()=>{
        //     return res.redirect("/")
        // }).catch((err)=>{
        //     res.redirect(`/edit/${id}`);
        //     return
        // })
    }
}

module.exports = articleControler;