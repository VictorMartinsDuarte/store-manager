const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelProducts = require('../../../models/modelProducts');

describe('Test on model layer for products', () => {
  describe('Test function getProducts', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([products]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Returns all products', async () => {
      const response = await modelProducts.getProducts();
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(3);
      expect(response[0]).to.have.property('id');
      expect(response[1]).to.have.property('name');
      expect(response[2]).to.have.property('quantity');
    });
  })  
  
  describe('Test function getProductsById', () => {
    const product = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([product]);
    });

    afterEach(() => {
      connection.execute.restore();
    })

    it('Returns just one product by id', async () => {
      const response = await modelProducts.getProductsById(1);
      expect(response).to.be.an('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });

  describe('Test function createNewProduct', () => {
    const product = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([product]);
    });

    afterEach(() => {
      connection.execute.restore();
    })

    it('Returns created product', async () => {
      const { name, quantity } = { name: 'Lança', quantity: 5 };
      const response = await modelProducts.createNewProduct(name, quantity);
      expect(response).to.be.an('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });

});