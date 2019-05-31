import { put, select } from 'redux-saga/effects';

import { Creators as CartActions } from '../ducks/cart';

export function* addToCart({ payload: { product } }) {
  try {
    const currentItems = yield select(state => state.cart.items);
    const itemIndex = currentItems ? currentItems.findIndex(item => item.id === product.id) : -1;
    if (itemIndex === -1) {
      product.qty = 1;
      currentItems.push(product);
    } else {
      currentItems[itemIndex].qty += 1;
    }
    yield put(CartActions.addToCartSuccess(currentItems));
  } catch (error) {
    yield put(CartActions.addToCartFailure('Erro ao adicionar produto no carrinho'));
  }
}

export function* removeFromCart({ payload: { product } }) {
  try {
    const currentItems = yield select(state => state.cart.items);
    const updatedItems = currentItems.filter(item => item.id !== product.id);
    yield put(CartActions.addToCartSuccess(updatedItems));
  } catch (error) {
    yield put(CartActions.addToCartFailure('Erro ao remover produto do carrinho'));
  }
}

export function* updateQty({ payload: { product, qty } }) {
  try {
    const currentItems = yield select(state => state.cart.items);
    const itemIndex = currentItems.findIndex(item => item.id === product.id);
    currentItems[itemIndex].qty = qty;
    yield put(CartActions.addToCartSuccess(currentItems));
  } catch (error) {
    yield put(CartActions.addToCartFailure('Erro ao atualizar carrinho'));
  }
}
