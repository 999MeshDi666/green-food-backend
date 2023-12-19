const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' });
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
router.patch('/:id', updateCatalogItem);
router.delete('/:id', removeCatalogItem);

module.exports = router;
