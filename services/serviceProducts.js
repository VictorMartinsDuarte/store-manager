const modelProducts = require('../models/modelProducts');

const getProducts = async () => modelProducts.getProducts();

const getProductsById = async (id) => modelProducts.getProductsById(id);

module.exports = {
  getProducts,
  getProductsById,
};