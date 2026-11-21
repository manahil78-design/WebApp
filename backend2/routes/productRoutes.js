
const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const protectAdmin = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// PUBLIC ROUTES
router.get('/', getProducts);
router.get('/:id', getProductById);

// ADMIN ROUTES
router.post('/', protectAdmin, upload.single('image'), createProduct);
router.put('/:id', protectAdmin, upload.single('image'), updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

module.exports = router;
