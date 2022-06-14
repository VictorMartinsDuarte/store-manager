const express = require('express');
const controllerSales = require('../controllers/controllerSales');

const sales = express.Router();

sales.get('/', controllerSales.getSales);

sales.get('/:id', controllerSales.getSalesById);

module.exports = sales;