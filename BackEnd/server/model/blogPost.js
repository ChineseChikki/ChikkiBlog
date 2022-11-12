const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "blogUser",
    },
  },
  { timestamps: true }
);
const postModel = mongoose.model("blogPost", PostSchema);
module.exports = postModel;
