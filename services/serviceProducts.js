const modelProducts = require('../models/modelProducts');

const getProducts = async () => modelProducts.getProducts();

const getProductsById = async (id) => modelProducts.getProductsById(id);

const createNewProduct = async (name, quantity) => {
  const allProducts = await getProducts();
  const product = allProducts.find((prod) => prod.name === name);
  if (product) return undefined;
  return modelProducts.createNewProduct(name, quantity);
};

const updateProduct = async (id, name, quantity) => {
  const product = await getProductsById(id);
  if (!product) return undefined;
  return modelProducts.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  const product = await getProductsById(id);
  if (!product) return undefined;
  return modelProducts.deleteProduct(id);
};

module.exports = {
  getProducts,
  getProductsById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};