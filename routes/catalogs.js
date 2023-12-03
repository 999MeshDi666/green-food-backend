const express = require("express");
const router = express.Router();
const {
  getAllCatalogItems,
  getCatalogItemById,
  createCatalogItem,
  removeCatalogItem,
  updateCatalogItem,
} = require("../controllers/CatalogsController");

router.get("/", getAllCatalogItems);
router.get("/:id", getCatalogItemById);
router.post("/", createCatalogItem);
router.patch("/:id", updateCatalogItem);
router.delete("/:id", removeCatalogItem);

module.exports = router;
