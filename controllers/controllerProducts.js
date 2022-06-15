const serviceProducts = require('../services/serviceProducts');

const getProducts = async (_req, res) => {
  const allProducts = await serviceProducts.getProducts();
  return res.status(200).json(allProducts);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const allProductsById = await serviceProducts.getProductsById(id);
  if (!allProductsById) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(allProductsById);
};

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await serviceProducts.createNewProduct(name, quantity);
  if (!product) return res.status(409).send({ message: 'Product already exists' });
  return res.status(201).json(product);
};

module.exports = { 
  getProducts,
  getProductsById,
  createNewProduct,
};