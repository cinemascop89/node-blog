!SLIDE center

#Otro blog mas (en node.js) #

[Eduardo Veiga](https://github.com/cinemascop89) - [Sophilabs](https://github.com/sophilabs)


!SLIDE center

#Que es node.js? #

* Libreria javascript para el servidor, usando el motor V8 de Google
* Adecuado para aplicaciones en tiempo real (buen soporte de websockets)
* API para aplicaciones con gran capacidad de concurrencia (todo el I/O es no-bloqueante, usando un loop de eventos)


!SLIDE small

#Ejemplo de codigo: #

    @@@ javascript
    Post.find(id, function(post){
        console.log(post);
    });


!SLIDE center incremental

#Que *no es* node? #

* Para aplicaciones con alto consumo de CPU
* Framework de desarrollo web


!SLIDE center incremental

#Para eso tenemos... #

* Express (framework / router)
* Mongoose (ODM para mongo)
* Jade (templates)


!SLIDE center

#Instalar node #

* Windows: instalador
* Ubuntu: ```sudo apt-get install node```
* Otros: bajar codigo -> ```./configure && make```

[http://nodejs.org/download/](http://nodejs.org/download/)


!SLIDE small

#El Hello world... #

    @@@ javascript
    var http = require('http');
    var server = http.createServer(function(req, res){
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.end('Hello World\n');
    });
    server.listen(1337, '127.0.0.1');


Lo corremos con ```node app.js```
 

!SLIDE center

#Express #

###"web application framework for node" ###

Framework minimalista y flexible para aplicaciones en node

Similar a Flask o Sinatra



!SLIDE small

#Otro Hello world... #

    @@@ javascript
    var express = require("express");
    var app = express();
    app.get("/new", function(req, res){
      res.send("Hello, world!");
    });
    app.listen(3000);


!SLIDE small

#Configurando express... #

    @@@ javascript
    app.use(express.static(__dirname + "/public"));
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");


!SLIDE small

#Mongoose #

###ODM (Object Document Mapper) para mongodb

Schemas

    @@@ javscript
    var postSchema = mongoose.Schema({
      title: String,
      content: String
    });


Modelos

    @@@ javascript 
    Post = db.model('Post', postSchema);


!SLIDE small

#Usando modelos

Encontrar un documento

    @@@ javascript
    Post.findById(id).exec(function(err, post){
        if (!err) {
            //hacer algo con post
        }
    });


Guardar un documento
   
    @@@ javascript
    var post = new models.Post({
        title: "mi primer post",
        content: "que bueno que esta node!"
    });
    post.save(function(err){
        if (err) {
            //no se pudo guardar :(
        }
    });


!SLIDE center

#Jade

* Motor de templates para node
* Similar a HAML
* Soportado por express


!SLIDE smaller

    @@@ jade
    html
    head
      title My blog
      link(rel="stylesheet", href="/css/style.css")
    body
      .new-post
        a(href="/new") new post
      .wrap
        h1 
          a(href="/") My blog


se convierte en ...

    @@@ html
    <!DOCTYPE html>
      <html>
        <head>
          <title>My blog</title>
          <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
          <div class="new-post">
            <a href="/new">new post</a>
          </div>
        <div class="wrap">
           ...


!SLIDE small

#Usando jade con express #

## configuracion

    @@@ javascript
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");

## renderizado

    @@@ javascript
    res.render("detail", {posts: posts});


!SLIDE small

#Juntando (casi) todo #

    @@@ javascript
    app.get("/post/:postId", function(req, res){
      var postId = req.params.postId;
      Post.findById(postId).exec(function(err, post){
        res.render("detail", {
          title: post.title + " - My blog", 
          post: post,
        });
      });
    });


!SLIDE center

#Algunos numeros


!SLIDE small

#Links

[http://nodejs.org](http://nodejs.org)

[http://expressjs.com](http://expressjs.com)

[http://mongodb.org/](http://mongodb.org/)

[http://mongoosejs.com/](http://mongoosejs.com/)

[http://jade-lang.com/](http://jade-lang.com/)


[https://github.com/cinemascop89/node-blog](https://github.com/cinemascop89/node-blog) (La presentacion + codigo)
