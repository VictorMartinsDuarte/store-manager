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

module.exports = {
  getSales,
  getSalesById,
};