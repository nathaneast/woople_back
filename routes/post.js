const express = require("express");
const router = express.Router();
const fetch = require("cross-fetch");

const Post = require("../models/Post");

const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
]);

router.post("/", async (req, res, next) => {
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
});

router.get("/youtubeUrl", async (req, res, next) => {
  try {
    const targetUrl = req.query.urlItem;

    const onFetchMetaData = async (url) => {
      const html = await fetch(url).then((res) => res.text());
      const metaData = await metascraper({ url, html });
      return metaData;
    };

    const sendResult = await onFetchMetaData(targetUrl);

    // TODO: 에러 응답 처리

    return res.status(200).send(sendResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /like/:id

module.exports = router;
