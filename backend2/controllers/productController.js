
const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");

// Upload one image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "ecommerce-products" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    stream.end(fileBuffer);
  });
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };

    const uploadedImages = req.files?.images || [];
    const legacyImage = req.files?.image?.[0];

    if (uploadedImages.length > 0) {
      if (uploadedImages.length !== 3) {
        return res.status(400).json({
          message: "Please upload exactly 3 product images.",
        });
      }

      const imageUrls = await Promise.all(
        uploadedImages.map((file) =>
          uploadToCloudinary(file.buffer)
        )
      );

      productData.images = imageUrls;
      productData.image = imageUrls[0];
    } else if (legacyImage) {
      const imageUrl = await uploadToCloudinary(legacyImage.buffer);
      productData.image = imageUrl;
      productData.images = [imageUrl];
    }

    const product = await Product.create(productData);

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "serialNumber",
      "price",
      "category",
      "description",
      "stock",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const uploadedImages = req.files?.images || [];
    const legacyImage = req.files?.image?.[0];

    if (uploadedImages.length > 0) {
      if (uploadedImages.length !== 3) {
        return res.status(400).json({
          message: "Please upload exactly 3 product images.",
        });
      }

      const imageUrls = await Promise.all(
        uploadedImages.map((file) =>
          uploadToCloudinary(file.buffer)
        )
      );

      updates.images = imageUrls;
      updates.image = imageUrls[0];
    } else if (legacyImage) {
      const imageUrl = await uploadToCloudinary(legacyImage.buffer);
      updates.image = imageUrl;
      updates.images = [imageUrl];
    }

    // Also allow image URLs to be updated directly
    if (req.body.images !== undefined && uploadedImages.length === 0) {
      const suppliedImages =
        typeof req.body.images === "string"
          ? JSON.parse(req.body.images)
          : req.body.images;

      if (!Array.isArray(suppliedImages) || suppliedImages.length > 3) {
        return res.status(400).json({
          message: "Images must be an array containing up to 3 URLs.",
        });
      }

      updates.images = suppliedImages;

      if (suppliedImages.length > 0) {
        updates.image = suppliedImages[0];
      }
    }

    if (req.body.image !== undefined && !legacyImage && uploadedImages.length === 0) {
      updates.image = req.body.image;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
