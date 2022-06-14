const express = require('express');
const controllerProducts = require('../controllers/controllerProducts');
const middleProducts = require('../middlewares/middleProducts');

const products = express.Router();
const { nameValidation, quantityValidation } = middleProducts;
products.use(express.json());

products.get('/', controllerProducts.getProducts);
products.get('/:id', controllerProducts.getProductsById);

products.post('/', nameValidation, quantityValidation);

module.exports = products;