const express = require('express');
const controllerProducts = require('../controllers/controllerProducts');

const products = express.Router();
// products.use(express.json());

products.get('/', controllerProducts.getProducts);

products.get('/:id', controllerProducts.getProductsById);

module.exports = products;