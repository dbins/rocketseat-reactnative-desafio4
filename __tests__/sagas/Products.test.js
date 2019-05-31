import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import rootSaga from '../../src/store/sagas';
import { Creators as CategoriesActions } from '../../src/store/ducks/categories';
import reducer, { Creators as ProductsActions } from '../../src/store/ducks/products';
import api from '../../src/services/api';


const products = {
  products: [
    {
      "id": 1,
      "name": "Camiseta Hyperas Preta",
      "brand": "Quiksilver",
      "image": "https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg",
      "price": 49.99
    },
    {
      "id": 2,
      "name": "Camiseta Double Tap Preta",
      "brand": "Quiksilver",
      "image": "https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg",
      "price": 59.99
    },
  ],
};


const initialState = {
  products: {
    products: [
      {
        image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
        name: 'Camiseta Hyperas Preta',
        brand: 'Quiksilver',
        price: 49.99,
      },
    ],
    loading: false,
    error: null,
    selectedProduct: {},
  },
  categories: {
    activeCategory: {
      id: 1,
      title: 'Camisetas',
    },
  },
};

describe('Products Sagas testing', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState,
      reducers: reducer,
    });
    apiMock = new MockAdapter(api);
    sagaTester.start(rootSaga);
  });

  it('get products triggered with success', async () => {
    apiMock.onGet('/category_products/1').reply(200, products);

    sagaTester.dispatch(CategoriesActions.setCategorySuccess());

    await sagaTester.waitFor(ProductsActions.getProductsSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(ProductsActions.getProductsSuccess(products.products));
  });

  it('get products triggered with failure', async () => {
    apiMock.onGet('/category_products/1').reply(400);

    sagaTester.dispatch(CategoriesActions.setCategorySuccess());

    await sagaTester.waitFor(ProductsActions.getProductsFailure().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(ProductsActions.getProductsFailure('Erro ao buscar Produtos'));
  });
});
