const express = require('express');
const controllerSales = require('../controllers/controllerSales');
const middleSales = require('../middlewares/middleSales');

const sales = express.Router();
const { idValidation, quantityValidation } = middleSales;
sales.use(express.json());

sales.get('/', controllerSales.getSales);
sales.get('/:id', controllerSales.getSalesById);

sales.post('/', idValidation, quantityValidation);

module.exports = sales;