const idValidation = (req, res, next) => {
  try {
    const post = req.body;
    const key = post.find(({ productId }) => productId);
    if (!key) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  } catch (error) {
      return res.status(400).send({ error: error.message });
  }
  next();
};

const quantityValidation = (req, res, next) => {
  try {
    const post = req.body;
    const key = post.find(({ quantity }) => quantity);
    if (!key) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (key <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
  next();
};

module.exports = { 
  idValidation,
  quantityValidation,
};