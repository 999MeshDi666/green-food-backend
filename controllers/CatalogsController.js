const Catalogs = require('../models/CatalogsModel');
const mongoose = require('mongoose');

const getAllCatalogItems = async (req, res) => {
  try {
    const data = await Catalogs.find({}).sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCatalogItemById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `id: ${id} is not valid` });
  }

  const data = await Catalogs.findById(id);
  if (!data) {
    return res.status(404).json({ error: `There is no item with id: ${id}` });
  }

  res.status(200).json(data);
};

const createCatalogItem = async (req, res) => {
  const { title, desc, price } = req.body;

  if (!req.file) {
    return res.status(404).json({ error: `files: ${req.files} error` });
  }
  console.log(req.file);
  const image = {
    data: req.file.originalname,
    contentType: req.file.mimetype,
  };

  try {
    const data = await Catalogs.create({ title, desc, price, image });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCatalogItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `id: ${id} is not valid` });
  }
  const data = await Catalogs.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!data) {
    return res
      .status(404)
      .json({ error: `There is no item with id: ${id} for updating` });
  }
  res.status(200).json(data);
};

const removeCatalogItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `id: ${id} is not valid` });
  }
  const data = await Catalogs.findByIdAndDelete({ _id: id });
  if (!data) {
    return res
      .status(404)
      .json({ error: `There is no item with id: ${id} for deleting` });
  }
  res.status(200).json(data);
};

module.exports = {
  getAllCatalogItems,
  getCatalogItemById,
  createCatalogItem,
  updateCatalogItem,
  removeCatalogItem,
};
