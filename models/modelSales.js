const connection = require('./connection');

const getSales = async () => {
  const [position1] = await connection.execute(
  `SELECT sa.id AS saleId, date, sp.product_id AS productId, quantity
  FROM sales AS sa
  INNER JOIN sales_products AS sp
  ON sa.id = sp.sale_id`,
  );
  
  return position1;
};

const getSalesById = async (id) => {
  const [position1] = await connection.execute(
    `SELECT date, sp.product_id AS productId, quantity
    FROM sales AS sa
    INNER JOIN sales_products AS sp
    ON sa.id = sp.sale_id
    WHERE sa.id = ?
    ORDER BY sa.id, productId`, [id],
  );
  return position1;
};

const createNewSale = async (id, productId, quantity) => {
  const newSale = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
  );
  return newSale;
};

const newSaleId = async () => {
  const [newSale] = await connection.execute('INSERT INTO sales (date) VALUES (NOW())');
  return newSale.insertId;
};

module.exports = {
  getSales,
  getSalesById,
  createNewSale,
  newSaleId,
};