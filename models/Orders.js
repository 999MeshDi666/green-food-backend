const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orders = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
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

module.exports = mongoose.model("Orders", orders);
