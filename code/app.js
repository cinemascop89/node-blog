var express = require("express");
var models = require("./models.js");

//initialize app
var app = express();

app.set("showStackError", true);

//configure static folder
app.use(express.static(__dirname + "/public"));

//enable parsing of the request body (used to get req.body contents)
app.use(express.bodyParser());

//configure template dirs and template engine
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

//configure the log output
app.use(express.logger('dev'));

//index handler
app.get("/", function(req, res){
    models.Post.find({}).exec(function(err, posts){
        res.render("index", {title: "My blog", posts:posts});
    });
});

//post detail handler
app.get("/post/:postId", function(req, res){
    models.Post.findById(req.params.postId).exec(function(err, post){
        res.render("detail", {
            title: post.title + " - My blog", 
            post: post,
        });
    });
});

//new post view handler
app.get("/new", function(req, res){
    res.render("new", {title: "New post"});
});

//post creation handler
app.post("/new", function(req, res){
    var post = new models.Post({
        title:req.body.title,
        content: req.body.content
    });
    post.save(function(){
        res.redirect("/");
    });
});

//run app and start listening on port 3000
app.listen(3000, function(){
    console.log("Express listening on port 3000");
});
