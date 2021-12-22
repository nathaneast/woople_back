const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const hpp = require("hpp");
const helmet = require("helmet");
const app = express();

require("dotenv").config();

const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("MongoDB connecting Success!"))
  .catch((err) => console.error(err));

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

app.use("/posts", postsRouter);
app.use("/post", postRouter);

// TODO: 공통 에러처리

app.listen(3065, () => {
  console.log("3065 서버 실행");
});
