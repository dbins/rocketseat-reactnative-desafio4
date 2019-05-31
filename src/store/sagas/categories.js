import { call, put, select } from 'redux-saga/effects';

import { Creators as CategoriesActions } from '../ducks/categories';
import api from '../../services/api';

export function* getCategories() {
  try {
    const response = yield call(api.get, '/categories');
    yield put(CategoriesActions.getCategoriesSuccess(response.data));
    const categories = yield select(state => state.categories);
    if ((!categories.activeCategory || !categories.activeCategory.id) && categories.categories.length > 0) {
      yield put(CategoriesActions.setActiveCategory(categories.categories[0]));
    }
  } catch (err) {
    yield put(CategoriesActions.getCategoriesFailure('Erro ao buscar categorias'));
  }
}

export function* setCategory() {
  yield put(CategoriesActions.setCategorySuccess());
}
