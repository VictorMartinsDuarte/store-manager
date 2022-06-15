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

const updateProduct = async (req, res) => {
  const { id } = req.params; 
  const { name, quantity } = req.body;
  const updatedProduct = await serviceProducts.updateProduct(id, name, quantity);
  if (!updatedProduct) return res.status(404).send({ message: 'Product not found' });
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.deleteProduct(id);
  if (!product) return res.status(404).send({ message: 'Product not found' });
  return res.status(204).send();
};

module.exports = { 
  getProducts,
  getProductsById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};