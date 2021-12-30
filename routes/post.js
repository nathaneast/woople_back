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
      postTitle,
      postDesc,
      metaTitle,
      metaImage,
      metaDesc,
    });

    const findedCategory = await Category.findOne({
      name: category,
    });

    if (findedCategory) {
      await Post.findByIdAndUpdate(newPost._id, {
        category: findedCategory._id,
      });
      await Category.findByIdAndUpdate(findedCategory._id, {
        $push: {
          posts: newPost._id,
        },
      });
    } else {
      const newCategory = await Category.create({
        name: category,
      });

      await Post.findByIdAndUpdate(newPost._id, {
        category: newCategory._id,
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {
          posts: newPost._id,
        },
      });
    }

    return res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/like/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const { like: postPrevLike } = await Post.findById(id);

    await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          like: postPrevLike + 1,
        },
      },
      {
        new: true,
      }
    );

    return res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.find({ _id: id }).deleteOne();
    return res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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
