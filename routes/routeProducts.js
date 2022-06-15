const express = require('express');
const controllerProducts = require('../controllers/controllerProducts');
const middleProducts = require('../middlewares/middleProducts');
// const modelProducts = require('../models/modelProducts');
// const serviceProducts = require('../services/serviceProducts');

const products = express.Router();
const { nameValidation, quantityValidation } = middleProducts;
// products.use(express.json());

products.get('/', controllerProducts.getProducts);
products.get('/:id', controllerProducts.getProductsById);

products.post('/', nameValidation, quantityValidation, controllerProducts.createNewProduct);

products.put('/:id', nameValidation, quantityValidation, controllerProducts.updateProduct);

products.delete('/:id', controllerProducts.deleteProduct);

module.exports = products;