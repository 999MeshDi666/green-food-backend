const express = require("express");
const router = express.Router();
const Catalogs = require("../models/Catalogs");
router.get("/", (req, res) => {
  res.send("main");
});
router.get("/:id", (req, res) => {
  res.send("food Catalogs by id");
});
router.post("/", async (req, res) => {
  const { title, desc, price, image } = req.body;
  try {
    const data = await Catalogs.create({ title, desc, price, image });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/", (req, res) => {
  res.send("food Catalogs put");
});
router.delete("/", (req, res) => {
  res.send("food Catalogs delete");
});

module.exports = router;
