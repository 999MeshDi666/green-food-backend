const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catalogs = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Buffer,
      contentType: String,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Catalogs", catalogs);
