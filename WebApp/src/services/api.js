
const API_URL = "https://webapp-hhcw.onrender.com";

// GET ALL PRODUCTS
export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.products || [];
}

// GET PRODUCT IMAGES
export function getProductImages(product) {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    return product.images.filter(Boolean).slice(0, 3);
  }

  return product?.image ? [product.image] : [];
}

// GET MAIN PRODUCT IMAGE
export function getProductImage(product) {
  return getProductImages(product)[0] || "";
}

// CREATE ORDER
export async function createOrder(orderData) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to place your order.");
  }

  return data;
}

export default API_URL;
