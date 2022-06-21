const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelSales = require('../../../models/modelSales');

describe('Tests on model layer for sales', () => {
  describe('Test function getSales', () => {
    const [allSales] = [
      [
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 1, quantity: 5 },
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 2, quantity: 10 },
      { saleId: 3, date: '2022-06-20 22:17:16', productId: 3, quantity: 15 }
      ]
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([allSales]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Returns all sales', async () => {
      const response = await modelSales.getSales();
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(3);
      expect(response[0]).to.have.property('saleId');
      expect(response[1]).to.have.property('date');
      expect(response[2]).to.have.property('productId');
      expect(response[0]).to.have.property('quantity');
    });
  });
  
  describe('Test function getSalesById', () => {
    const [allSales] = [
      [
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 1, quantity: 5 },
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 2, quantity: 10 },
      ]
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([allSales]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Returns sales by id', async () => {
      const response = await modelSales.getSalesById(1);
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(2);
      expect(response[0]).to.have.property('saleId');
      expect(response[0].saleId).to.be.equal(response[1].saleId);
    });
  });

  describe('Test function createNewSale', () => {
    const newSale = { id: 1, productId: 1, quantity: 5 };

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(newSale);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Returns new sales added', async () => {
      const response = await modelSales.createNewSale();
      expect(response).to.be.an('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('productId');
      expect(response).to.have.property('quantity');
    });
  });

  describe('Test function newSaleId', () => {
    const newSale = [{ insertId: 1, date: '2022-06-20 22:17:16' }];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(newSale);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Returns new sale id', async () => {
      const response = await modelSales.newSaleId();
      expect(response).to.be.an('number');
    });
  });
});