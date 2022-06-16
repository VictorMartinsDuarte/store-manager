const serviceSales = require('../services/serviceSales');

const getSales = async (req, res) => {
  const allSales = await serviceSales.getSales();
  return res.status(200).json(allSales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const allSalesById = await serviceSales.getSalesById(id);
  if (!allSalesById || allSalesById.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(allSalesById);
};

const createNewSale = async (req, res) => {
  const newSales = req.body;
  const createdSales = await serviceSales.createNewSale(newSales);
  return res.status(201).json(createdSales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const updatedSale = await serviceSales.updatedSale(id, updateInfo);
  return res.status(200).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const isSaleDeleted = await serviceSales.deleteSale(id);
  if (isSaleDeleted) return res.status(204).send();
  return res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
  getSales,
  getSalesById,
  createNewSale,
  updateSale,
  deleteSale,
};