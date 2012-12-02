var mongoose = require("mongoose");
var db = mongoose.createConnection("mongodb://localhost/blog");

//define a schema for a blog post
var postSchema = mongoose.Schema({
    title: String,
    content: String
});

//finally, create the model from the schema and make it visible in the module
var Post = module.exports.Post = db.model('Post', postSchema);
