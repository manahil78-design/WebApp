
const Order = require('../models/Order');
const Product = require('../models/product');

// CUSTOMER: Place a new order
const createOrder = async (req, res) => {
  try {
    const { customerName, phone, address, items } = req.body;

    // Check customer details
    if (!customerName || !phone || !address) {
      return res.status(400).json({
        message: 'Customer name, phone and address are required',
      });
    }

    // Check cart items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: 'Your cart is empty',
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Get actual product details from MongoDB
    for (const item of items) {
      const { productId, quantity } = item;

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: 'Product quantity must be at least 1',
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: 'One of the products was not found',
        });
      }

      const subtotal = product.price * quantity;
      totalAmount += subtotal;

      orderItems.push({
        product: product._id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
      });
    }

    // Save order in MongoDB
    const order = await Order.create({
      customerName,
      phone,
      address,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


// ADMIN: Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADMIN: Get one order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


// ADMIN: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
