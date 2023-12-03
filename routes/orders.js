const express = require("express");
const router = express.Router();
const {
  getAllOrderItems,
  getOrderItemsById,
  createOrderItems,
  updateOrderItems,
  deleteOrderItems,
} = require("../controllers/OrdersController");

router.get("/", getAllOrderItems);
router.get("/:id", getOrderItemsById);
router.post("/", createOrderItems);
router.patch("/:id", updateOrderItems);
router.delete("/:id", deleteOrderItems);

module.exports = router;
