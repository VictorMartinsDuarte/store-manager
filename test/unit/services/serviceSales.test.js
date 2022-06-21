const sinon = require('sinon');
const { expect } = require('chai');
const modelSales = require('../../../models/modelSales');
const serviceSales = require('../../../services/serviceSales');

describe('Tests on service layer for sales', () => {
  describe('Test function getSales', () => {
    const [allSales] = [
      [
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 1, quantity: 5 },
      { saleId: 1, date: '2022-06-20 22:17:16', productId: 2, quantity: 10 },
      { saleId: 3, date: '2022-06-20 22:17:16', productId: 3, quantity: 15 }
      ]
    ];

    beforeEach(() => {
      sinon.stub(modelSales, 'getSales').resolves(allSales);
    });

    afterEach(() => {
      modelSales.getSales.restore();
    });

    it('Returns all sales', async () => {
      const response = await serviceSales.getSales();
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
      sinon.stub(modelSales, 'getSalesById').resolves(allSales);
    });

    afterEach(() => {
      modelSales.getSalesById.restore();
    });

    it('Returns sales by id', async () => {
      const response = await serviceSales.getSalesById(1);
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(2);
      expect(response[0]).to.have.property('saleId');
      expect(response[0].saleId).to.be.equal(response[1].saleId);
    });
  });

  describe('Test function createNewSale', () => {    
    const newSale = { id: 1, productId: 1, quantity: 5 };

    beforeEach(() => {
      sinon.stub(modelSales, 'createNewSale').resolves(newSale);
    });

    afterEach(() => {
      modelSales.createNewSale.restore();
    });

    it('Returns new sales added', async () => {
      const newSales = [{ productId: 1, quantity: 6 }];
      const response = await serviceSales.createNewSale(newSales);
      expect(response).to.be.an('object');
      expect(response).to.have.property('id');
      expect(response.itemsSold[0]).to.have.property('productId');
      expect(response.itemsSold[0]).to.have.property('quantity');
    });
  });

  describe('Test function updatedSale', () => {
    const updateInfo = [{ productId: 1, quantity: 6 }];
    const id = 1;

    beforeEach(() => {
      sinon.stub(modelSales, 'updateSale').resolves();
    });

    afterEach(() => {
      modelSales.updateSale.restore();
    });

    it('Returns updated sale', async () => {
      const response = await serviceSales.updatedSale(id, updateInfo);
      expect(response).to.be.an('object');
    });
  });
});