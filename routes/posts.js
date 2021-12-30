const express = require("express");

const router = express.Router();

const Post = require("../models/Post");
const Category = require("../models/Category");

router.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;

    if (category === "all") {
      const allPosts = await Post.find()
        .populate("category", "name")
        .sort({ createdAt: -1 });

      return res.status(200).send(allPosts);
    } else {
      const targetCategoryPosts = await Category.findOne({
        name: category,
      }).populate({
        path: "posts",
        select:
          "author url category postTitle postDesc metaTitle metaImage metaDesc like",
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: "category",
          select: "name",
        },
      });

      return res
        .status(200)
        .send(targetCategoryPosts ? targetCategoryPosts.posts : []);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
