const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "morning",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
