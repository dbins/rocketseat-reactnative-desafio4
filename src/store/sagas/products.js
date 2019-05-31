import { call, put, select } from 'redux-saga/effects';

import { Creators as ProductActions } from '../ducks/products';
import api from '../../services/api';

export function* getProducts() {
  try {
    yield put(ProductActions.getProductsRequest());
    const catId = yield select(state => state.categories.activeCategory.id);
    const response = yield call(api.get, `/category_products/${catId}`);
    yield put(ProductActions.getProductsSuccess(response.data.products));
  } catch (err) {
    yield put(ProductActions.getProductsFailure('Erro ao buscar Produtos'));
  }
}
