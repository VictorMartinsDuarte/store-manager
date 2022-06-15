const connection = require('./connection');

const getProducts = async () => {
  const [position1] = await connection.execute('SELECT * FROM products ORDER BY id');
  return position1;
};

const getProductsById = async (id) => {
  const [position1] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return position1[0];
};

const createNewProduct = async (name, quantity) => {
  const [product] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity],
  );
  return { 
    id: product.insertId, 
    name, 
    quantity,
  };
};

module.exports = { 
  getProducts,
  getProductsById,
  createNewProduct,
};