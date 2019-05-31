import cartReducer, { Creators as CartActions } from '../../src/store/ducks/cart';

const cart = {
  items: [
    {
      image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
      qty: 2,
      name: 'Camiseta Hyperas Preta',
      brand: 'Quiksilver',
      price: 49.99,
    },
  ],
};

const newCartItem = {
  name: 'Camiseta Double Tap Preta',
  qty: 1,
  brand: 'Quiksilver',
  image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
  price: 59.99,
};

describe('Cart reducer tests', () => {

  it('can add to cart with success', () => {
    const state = cartReducer(cart, CartActions.addToCartSuccess([...cart.items, ...[newCartItem]]));

    expect(state.items).toHaveLength(2);
    expect(state.items[1]).toEqual(newCartItem);
  });

  it('catch errors', () => {
    const state = cartReducer(cart, CartActions.addToCartFailure('Erro ao adicionar item'));

    expect(state.items).toHaveLength(1);
    expect(state.error).toEqual('Erro ao adicionar item');
  });
});
