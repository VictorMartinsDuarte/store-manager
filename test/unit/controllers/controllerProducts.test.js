const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/serviceProducts');
const controllerProducts = require('../../../controllers/controllerProducts');

describe('Tests on controller layer for products', () => {
  describe('Test function getProducts', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceProducts, 'getProducts').resolves(products);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(products);
      });
    
    afterEach(() => {
      serviceProducts.getProducts.restore();
    });

    it('Returns all products and status correctly', async () => {
      const response = await controllerProducts.getProducts(req, res);
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(3);
      expect(res.status.calledWith(200)).to.equal(true);
      //ref calledWith: https://stackoverflow.com/questions/43995861/to-have-been-calledwith-is-not-a-function-error-in-chai3-5-0
    });
  });

  describe('Test function getProductsById', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceProducts, 'getProductsById').resolves(products[0]);
      req.params = sinon.stub().returns({ id: 1 });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(products[0]);
      });
    
    afterEach(() => {
      serviceProducts.getProductsById.restore();
    });

    it('Returns found product by id and status correctly', async () => {
      const response = await controllerProducts.getProductsById(req, res);
      expect(response).to.be.an('object');
      expect(res.status.calledWith(200)).to.equal(true);
    });
  });

  describe('Test function createNewProduct', () => {
    const product = [{ id: 1, name: 'Lança', quantity: 5 }];
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceProducts, 'createNewProduct').resolves(product[0]);
      req.body = sinon.stub().returns({ name: 'Lança', quantity: 5 });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(product[0]);
      });
    
    afterEach(() => {
      serviceProducts.createNewProduct.restore();
    });

    it('Returns created product and status correctly', async () => {
      const response = await controllerProducts.createNewProduct(req, res);
      expect(response).to.be.an('object');
      expect(res.status.calledWith(201)).to.equal(true);
    });
  });

  describe('Test function updateProduct', () => {
    const updatedProduct = { id: 1, name: 'Lança', quantity: 5 };
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceProducts, 'updateProduct').resolves(updatedProduct);
      req.params = sinon.stub().returns({ id: 1 });
      req.body = sinon.stub().returns({ name: 'Lança', quantity: 5 });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(updatedProduct);
      });
    
    afterEach(() => {
      serviceProducts.updateProduct.restore();
    });

    it('Returns updated product and status correctly', async () => {
      const response = await controllerProducts.updateProduct(req, res);
      expect(response).to.be.an('object');
      expect(res.status.calledWith(200)).to.equal(true);
    });
  });

  describe('Test function deleteProduct', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceProducts, 'deleteProduct').resolves(true);
      req.params = sinon.stub().returns({ id: 1 });
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      });
    
    afterEach(() => {
      serviceProducts.deleteProduct.restore();
    });

    it('Returns status correctly', async () => {
      const response = await controllerProducts.deleteProduct(req, res);
      expect(response).to.equal(undefined);
      expect(res.status.calledWith(204)).to.equal(true);
    });
  });
});