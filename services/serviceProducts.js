const modelProducts = require('../models/modelProducts');

const getProducts = async () => modelProducts.getProducts();

const getProductsById = async (id) => modelProducts.getProductsById(id);

const createNewProduct = async ({ name, quantity }) => {
  const allProducts = await getProducts();
  const product = allProducts.find((prod) => prod.name === name);
  if (product) return undefined;
  return modelProducts.createNewProduct(name, quantity);
};

module.exports = {
  getProducts,
  getProductsById,
  createNewProduct,
};