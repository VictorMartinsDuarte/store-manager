const sinon = require('sinon');
const { expect } = require('chai');
const serviceSales = require('../../../services/serviceSales');
const controllerSales = require('../../../controllers/controllerSales');

describe('Tests on controller layer for sales', () => {
  describe('Test function getSales', () => {
    const [allSales] = [
      [
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 1, quantity: 5 },
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 2, quantity: 10 },
      { saleId: 3, date: '2022-06-20 22:17:16', productId: 3, quantity: 15 }
      ]
    ];
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceSales, 'getSales').resolves(allSales);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(allSales);
      });
    
    afterEach(() => {
      serviceSales.getSales.restore();
    });

    it('Returns all sales and status correctly', async () => {
      const response = await controllerSales.getSales(req, res);
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(3);
      expect(res.status.calledWith(200)).to.equal(true);
    });
  });

  describe('Test function getSalesById', () => {
    const [allSalesById] = [
      [
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 1, quantity: 5 },
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 2, quantity: 10 },
      ]
    ];
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceSales, 'getSalesById').resolves(allSalesById);
      req.params = sinon.stub().returns({ id: 1 });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(allSalesById);
      });
    
    afterEach(() => {
      serviceSales.getSalesById.restore();
    });

    it('Returns sales by id and status correctly', async () => {
      const response = await controllerSales.getSalesById(req, res);
      expect(response).to.be.an('array');
      expect(res.status.calledWith(200)).to.equal(true);
    });
  });

  describe('Test function createNewSale', () => {
    const product = [{ id: 1, name: 'Lança', quantity: 5 }];
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.stub(serviceSales, 'createNewSale').resolves(product[0]);
      req.body = sinon.stub().returns({ name: 'Lança', quantity: 5 });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(product[0]);
      });
    
    afterEach(() => {
      serviceSales.createNewSale.restore();
    });

    it('Returns created sale and status correctly', async () => {
      const response = await controllerSales.createNewSale(req, res);
      expect(response).to.be.an('object');
      expect(res.status.calledWith(201)).to.equal(true);
    });
  });
});