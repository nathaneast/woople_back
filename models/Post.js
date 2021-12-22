const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    postTitle: {
      type: String,
      required: true,
    },
    postDesc: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaImage: {
      type: String,
      required: true,
    },
    metaDesc: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
