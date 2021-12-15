const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    metaImage: {
      type: String,
      required: true,
    },
    metaTitle: {
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

const Post = mongoose.model("sessionPost", PostSchema);

module.exports = Post;
