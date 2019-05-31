import SagaTester from 'redux-saga-tester';

import rootSaga from '../../src/store/sagas';
import reducer, { Creators as CartActions } from '../../src/store/ducks/cart';


const product = {
  name: 'Camiseta Double Tap Preta',
  qty: 1,
  brand: 'Quiksilver',
  image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
  price: 59.99,
};

const defaultState = { cart: { items: [] } };

describe('Cart Sagas testing', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: defaultState,
      reducers: reducer,
    });
    sagaTester.start(rootSaga);
  });

  it('can add to cart with success', async () => {
    sagaTester.dispatch(CartActions.addToCart(product));
    await sagaTester.waitFor(CartActions.addToCartSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CartActions.addToCartSuccess([product]));

    sagaTester.dispatch(CartActions.addToCart(product));
    await sagaTester.waitFor(CartActions.addToCartSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CartActions.addToCartSuccess([product]));
  });

  it('add to cart with failure', async () => {
    sagaTester.dispatch(CartActions.addToCart());
    await sagaTester.waitFor(CartActions.addToCartFailure().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CartActions.addToCartFailure('Erro ao adicionar produto no carrinho'));
  });

  it('remove item from cart with success', async () => {
    sagaTester.updateState({ ...defaultState, items: [product] });
    sagaTester.dispatch(CartActions.removeFromCart(product));
    await sagaTester.waitFor(CartActions.addToCartSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CartActions.addToCartSuccess([]));
  });

  it('remove item from cart with failure', async () => {
    sagaTester.updateState({ ...defaultState, items: [product] });
    sagaTester.dispatch(CartActions.removeFromCart());
    await sagaTester.waitFor(CartActions.addToCartFailure().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CartActions.addToCartFailure('Erro ao remover produto do carrinho'));
  });

  it('updates product quantity correctly', async () => {
    sagaTester.updateState({ ...defaultState, items: [product] });
    sagaTester.dispatch(CartActions.updateQty(3, product));
    await sagaTester.waitFor(CartActions.addToCartSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CartActions.addToCartSuccess([product]));
  });

  it('updates product quantity failure', async () => {
    sagaTester.updateState({ ...defaultState, items: [product] });
    sagaTester.dispatch(CartActions.updateQty());
    await sagaTester.waitFor(CartActions.addToCartFailure().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CartActions.addToCartFailure('Erro ao atualizar carrinho'));
  });
});
