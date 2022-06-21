const modelSales = require('../models/modelSales');

const getSales = async () => modelSales.getSales();

const getSalesById = async (id) => modelSales.getSalesById(id);

const createNewSale = async (newSales) => {
  const newSaleId = await modelSales.newSaleId();
  const prodQuant = await modelSales.productQuantity(newSales[0].productId);
  if ((prodQuant.quantity - newSales[0].quantity) < 0) return true;
  await newSales
    .map(({ productId, quantity }) => modelSales.createNewSale(newSaleId, productId, quantity));
  return { id: newSaleId, itemsSold: newSales };
};

const updatedSale = async (id, updateInfo) => {
  await updateInfo
    .forEach(({ productId, quantity }) => modelSales.updateSale(id, productId, quantity));
  return { saleId: id, itemUpdated: updateInfo };
};

const deleteSale = async (id) => {
  const [sale] = await modelSales.getSalesById(id);
  if (!sale) return false;
  const isSaleDeleted = await modelSales.deleteSale(id);
  return isSaleDeleted;
};

module.exports = {
  getSales,
  getSalesById,
  createNewSale,
  updatedSale,
  deleteSale,
};