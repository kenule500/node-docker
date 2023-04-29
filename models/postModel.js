const mongoos = require("mongoose");

const postSchema = new mongoos.Schema({
  title: {
    type: String,
    require: [true, "Post must have title"],
  },
  body: {
    type: String,
    require: [true, "Post must have body"],
  },
});

const Post = mongoos.model("Post", postSchema);

module.exports = Post;
