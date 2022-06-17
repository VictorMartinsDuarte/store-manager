const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/serviceProducts');
const controllerProducts = require('../../../controllers/controllerProducts');

describe('Test on model layer for products', () => {
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
});