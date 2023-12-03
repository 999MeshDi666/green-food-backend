const express = require("express");
const router = express.Router();
const Orders = require("../models/OrdersModel");

router.get("/", (req, res) => {
  res.send("main orders");
});
router.get("/:id", (req, res) => {
  res.send("food Orders by id");
});
router.post("/", async (req, res) => {
  const { title, amount, price, image } = req.body;
  try {
    const data = await Orders.create({ title, amount, price, image });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/", (req, res) => {
  res.send("food Orders put");
});
router.delete("/", (req, res) => {
  res.send("food Orders delete");
});

module.exports = router;
