const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });
const {
  getAllCatalogItems,
  getCatalogItemById,
  createCatalogItem,
  removeCatalogItem,
  updateCatalogItem,
} = require('../controllers/CatalogsController');

router.get('/', getAllCatalogItems);
router.get('/:id', getCatalogItemById);
router.post('/', uploads.single('image'), createCatalogItem);
router.patch('/:id', uploads.single('image'), updateCatalogItem);
router.delete('/:id', removeCatalogItem);

module.exports = router;
