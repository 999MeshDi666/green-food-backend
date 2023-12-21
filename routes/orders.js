const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/orders/');
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
  getAllOrderItems,
  getOrderItemsById,
  createOrderItems,
  updateOrderItems,
  deleteOrderItems,
} = require('../controllers/OrdersController');

router.get('/', getAllOrderItems);
router.get('/:id', getOrderItemsById);
router.post('/', uploads.single('image'), createOrderItems);
router.patch('/:id', uploads.single('image'), updateOrderItems);
router.delete('/:id', deleteOrderItems);

module.exports = router;
