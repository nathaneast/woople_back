const express = require("express");

const router = express.Router();

const Post = require("../models/Post");
const Category = require("../models/Category");

// GET /
// list
router.get("/", async (req, res, next) => {
  const { category } = req.query;

  if (category === "all") {
    const allPosts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).send(allPosts);
  } else {
    const targetCategoryPosts = await Category.findOne({
      name: category,
    });

    console.log(targetCategoryPosts, "targetCategoryPosts");

    return res
      .status(200)
      .send(targetCategoryPosts ? targetCategoryPosts.posts : []);
  }

  // db logic
  // logic
  // send
  // err
});

module.exports = router;
