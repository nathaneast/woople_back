const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const hpp = require("hpp");
const helmet = require("helmet");
const app = express();

const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");

// db

app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.get("/", (req, res, next) => {
  res.send("woople_back_server!");
});

app.use("posts", postsRouter);
app.use("post", postRouter);

app.listen(3065, () => {
  console.log("3065 서버 실행");
});
