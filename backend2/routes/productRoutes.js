
const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protectAdmin = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN ROUTES
// Supports both the old single image field and the new three-image field
const productImageUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

router.post("/", protectAdmin, productImageUpload, createProduct);
router.put("/:id", protectAdmin, productImageUpload, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

module.exports = router;
