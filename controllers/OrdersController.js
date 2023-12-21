const Orders = require('../models/OrdersModel');
const mongoose = require('mongoose');

const getAllOrderItems = async (req, res) => {
  try {
    const data = await Orders.find({}).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderItemsById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: `id: ${id} is not valid` });
  }
  const data = await Orders.findById(id);
  if (!data) {
    return res.status(404).json({ error: `There is no item with id: ${id}` });
  }
  res.status(200).json(data);
};

const createOrderItems = async (req, res) => {
  const { title, amount, price } = req.body;
  if (!req.file) {
    return res.status(404).json({ error: `file: ${req.file} error` });
  }
  try {
    const data = await Orders.create({
      title,
      amount,
      price,
      image: req.file.path,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrderItems = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `id: ${id} is not valid` });
  }
  if (!req.file) {
    return res.status(404).json({ error: `file: ${req.file} error` });
  }
  const data = await Orders.findOneAndUpdate(
    { _id: id },
    { ...req.body, image: req.file.path }
  );
  if (!data) {
    return res
      .status(404)
      .json({ error: `There is no item with id: ${id} for updating` });
  }
  res.status(200).json(data);
};

const deleteOrderItems = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `id: ${id} is not valid` });
  }
  const data = await Orders.findByIdAndDelete({ _id: id });
  if (!data) {
    return res
      .status(404)
      .json({ error: `There is no item with id: ${id} for deleting` });
  }
  res.status(200).json(data);
};

module.exports = {
  getAllOrderItems,
  getOrderItemsById,
  createOrderItems,
  updateOrderItems,
  deleteOrderItems,
};
