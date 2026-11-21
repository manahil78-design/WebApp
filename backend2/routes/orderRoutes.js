
const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

const protectAdmin = require('../middleware/authMiddleware');

// CUSTOMER: Place an order (no login required)
router.post('/', createOrder);

// ADMIN: View all orders
router.get('/', protectAdmin, getOrders);

// ADMIN: View one order
router.get('/:id', protectAdmin, getOrderById);

// ADMIN: Update order status
router.patch('/:id/status', protectAdmin, updateOrderStatus);

module.exports = router;
