const express = require("express");
const router = express.Router();
const fetch = require("cross-fetch");

const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
]);

router.post("/youtubeUrl", async (req, res, next) => {
  try {
    // TODO: req에서 url 받아서 요청
    const targetUrl = "https://www.youtube.com/watch?v=1F29TxRgb5s";

    const onFetchMetaData = async (url) => {
      const html = await fetch(url).then((res) => res.text());
      const metaData = await metascraper({ url, html });
      console.log(metaData, "metaData");
      return metaData;
    };

    const sendResult = await onFetchMetaData(targetUrl);

    console.log(sendResult, "sendResult type");

    // TODO: 성공, 에러 응답 처리
    return res.status(200).send(sendResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /like/:id

module.exports = router;
