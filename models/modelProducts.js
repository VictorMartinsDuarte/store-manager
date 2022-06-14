const connection = require('./connection');

const getProducts = async () => {
  const [position1] = await connection.execute('SELECT * FROM products ORDER BY id');
  return position1;
};

const getProductsById = async (id) => {
  const [position1] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return position1[0];
};

module.exports = { 
  getProducts,
  getProductsById,
};