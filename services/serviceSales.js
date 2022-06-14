const modelSales = require('../models/modelSales');

const getSales = async () => modelSales.getSales();

const getSalesById = async (id) => modelSales.getSalesById(id);

module.exports = {
  getSales,
  getSalesById,
};