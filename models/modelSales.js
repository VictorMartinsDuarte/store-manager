const connection = require('./connection');

const getSales = async () => {
  const [allSales] = await connection.execute(
  `SELECT sa.id AS saleId, date, sp.product_id AS productId, quantity
  FROM sales AS sa
  INNER JOIN sales_products AS sp
  ON sa.id = sp.sale_id`,
  );
  
  return allSales;
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

const updateSale = async (id, productId, quantity) => {
  const updatedSale = await connection.execute(
    'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
      [productId, quantity, id],
    );
  return updatedSale;
};

const deleteSale = async (id) => {
  await connection.execute(
    `DELETE sa, sp
      FROM sales AS sa
      JOIN sales_products AS sp
      ON sa.id = sp.sale_id
      WHERE sa.id = ?`, [id],
  );
  return true;
};

const productQuantity = async (productId) => {
  const [prod] = await connection.execute(
    'SELECT quantity FROM products WHERE id = ?', [productId],
  );
  return prod[0];
};

module.exports = {
  getSales,
  getSalesById,
  createNewSale,
  newSaleId,
  updateSale,
  deleteSale,
  productQuantity,
};