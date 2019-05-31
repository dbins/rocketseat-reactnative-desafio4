import productReducer, { Creators as ProductsActions } from '../../src/store/ducks/products';

const initialState = {
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
};

const newProduct = {
  name: 'Camiseta Double Tap Preta',
  brand: 'Quiksilver',
  image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
  price: 59.99,
};

const fakeAction = {
  fakeMethod: () => ({
    type: 'FAKE_REQUEST',
  }),
};

describe('Product reducer tests', () => {
  it('get Products Request', () => {
    const state = productReducer(initialState, ProductsActions.getProductsRequest());

    expect(state.loading).toBe(true);
  });

  it('get Products Success', () => {
    const state = productReducer(initialState, ProductsActions.getProductsSuccess([newProduct]));

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.products).toEqual([newProduct]);
  });

  it('get Products Failure', () => {
    const state = productReducer(initialState, ProductsActions.getProductsFailure('Erro ao buscar produtos'));

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Erro ao buscar produtos');
    expect(state.products).toEqual(initialState.products);
  });
  
  it('set Selected Product', () => {
    const state = productReducer(initialState, ProductsActions.setSelectedProduct(newProduct));

    expect(state.selectedProduct).toEqual(newProduct);
  });

  it('returns default state', () => {
    const state = productReducer(initialState, fakeAction.fakeMethod());

    expect(state).toEqual(initialState);
  });
});
