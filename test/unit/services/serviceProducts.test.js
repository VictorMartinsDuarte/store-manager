const sinon = require('sinon');
const { expect } = require('chai');
const modelProducts = require('../../../models/modelProducts');
const serviceProducts = require('../../../services/serviceProducts');

describe('Tests on service layer for products', () => {
  describe('Test function getProducts', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];
    
    beforeEach(() => {
      sinon.stub(modelProducts, 'getProducts').resolves(products);
    });

    afterEach(() => {
      modelProducts.getProducts.restore();
    });

    it('Returns all products', async () => {
      const response = await serviceProducts.getProducts();
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(3);
      expect(response[0]).to.have.property('id');
      expect(response[1]).to.have.property('name');
      expect(response[2]).to.have.property('quantity');
    });

    describe('Test function getProductsById', () => {
      const product = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      
      beforeEach(() => {
        sinon.stub(modelProducts, 'getProductsById').resolves(product);
      });
  
      afterEach(() => {
        modelProducts.getProductsById.restore();
      });
  
      it('Returns found product by id', async () => {
        const response = await serviceProducts.getProductsById(1);
        expect(response).to.be.an('object');
        expect(response).to.have.property('id');
        expect(response).to.have.property('name');
        expect(response).to.have.property('quantity');
      }); 
    });

    describe('Test function createNewProduct', () => {
      const products = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];
      
      beforeEach(() => {
        sinon.stub(modelProducts, 'createNewProduct').resolves(products[0]);
      });

      afterEach(() => {
        modelProducts.createNewProduct.restore();
      });

      it('Returns created product', async () => {
        const { name, quantity } = { name: 'lança', quantity: 5 };
        const response = await serviceProducts.createNewProduct(name, quantity);
        expect(response).to.be.an('object');
        expect(response).to.have.property('id');
        expect(response).to.have.property('name');
        expect(response).to.have.property('quantity');
       });
    });
  });
});