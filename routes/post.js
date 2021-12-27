const express = require("express");
const router = express.Router();
const fetch = require("cross-fetch");

const Post = require("../models/Post");
const Category = require("../models/Category");

const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
]);

// POST /
// create
router.post("/", async (req, res, next) => {
  try {
    const {
      author,
      url,
      category,
      postTitle,
      postDesc,
      metaTitle,
      metaImage,
      metaDesc,
    } = req.body;

    const newPost = await Post.create({
      author,
      url,
      category,
      postTitle,
      postDesc,
      metaTitle,
      metaImage,
      metaDesc,
    });

    console.log(newPost, "newPost");

    const findedCategory = await Category.findOne({
      name: category,
    });

    // const onUpdatePost = (targetCategoryId) => {
    //   Post.findByIdAndUpdate(newPost._id, {
    //     category: targetCategoryId,
    //   });
    // };

    const onUpdateCategory = (targetCategoryId) => {
      Category.findByIdAndUpdate(targetCategoryId, {
        $push: {
          posts: newPost._id,
        },
      });
    };

    if (findedCategory) {
      // await onUpdatePost(findedCategory._id);
      await onUpdateCategory(findedCategory._id);
    } else {
      const newCategory = await Category.create({
        name: category,
      });
      // await onUpdatePost(newCategory._id);
      await onUpdateCategory(newCategory._id);
    }

    return res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /
// detail

// DELETE /

// POST /like/:id

router.get("/youtubeUrl", async (req, res, next) => {
  try {
    const targetUrl = req.query.urlItem;

    const onFetchMetaData = async (url) => {
      const html = await fetch(url).then((res) => res.text());
      const metaData = await metascraper({ url, html });
      return metaData;
    };

    const metaDataAtUrl = await onFetchMetaData(targetUrl);
    const { description, image, title } = metaDataAtUrl;

    const isCorrectMetaData = [description, image, title].every((item) =>
      Boolean(item)
    );

    if (isCorrectMetaData) {
      return res.status(200).send(metaDataAtUrl);
    } else {
      return res
        .status(403)
        .send("메타 데이터 항목이 존재하지 않거나 잘못된 URL 입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
