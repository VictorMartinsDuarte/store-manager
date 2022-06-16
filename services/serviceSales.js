const modelSales = require('../models/modelSales');

const getSales = async () => modelSales.getSales();

const getSalesById = async (id) => modelSales.getSalesById(id);

const createNewSale = async (newSales) => {
  const newSaleId = await modelSales.newSaleId();
  await newSales
    .map(({ productId, quantity }) => modelSales.createNewSale(newSaleId, productId, quantity));
  return { id: newSaleId, itemsSold: newSales };
};

module.exports = {
  getSales,
  getSalesById,
  createNewSale,
};