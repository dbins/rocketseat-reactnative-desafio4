import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import rootSaga from '../../src/store/sagas';
import reducer, { Creators as CategoriesActions } from '../../src/store/ducks/categories';
import api from '../../src/services/api';


const data = {
  categories: [
    {
      id: 1,
      title: 'Camisetas',
    },
    {
      id: 2,
      title: 'Camisas',
    },
  ],
};


const initialState = {
  categories: [
    {
      id: 1,
      title: 'Camisetas',
    },
  ],
  activeCategory: {},
};

describe('Categories Sagas testing', () => {
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

  it('get categories triggered with success', async () => {
    apiMock.onGet('/categories').reply(200, data);
    sagaTester.dispatch(CategoriesActions.getCategoriesRequest());
    await sagaTester.waitFor(CategoriesActions.getCategoriesSuccess().type);
    await sagaTester.waitFor(CategoriesActions.setActiveCategory().type);
    expect(sagaTester.wasCalled(CategoriesActions.getCategoriesSuccess().type)).toEqual(true);
    expect(sagaTester.wasCalled(CategoriesActions.setActiveCategory().type)).toEqual(true);
    expect(sagaTester.wasCalled(CategoriesActions.getCategoriesFailure().type)).toEqual(false);

    sagaTester.getCalledActions().forEach((action) => {
      if (action.type === CategoriesActions.getCategoriesSuccess().type) {
        expect(action.payload.cats).toEqual(data);
      }
      if (action.type === CategoriesActions.setActiveCategory().type) {
        expect(action.payload.category).toEqual(data.categories[0]);
      }
    });
  });

  it('get set categories with success', async () => {
    apiMock.onGet('/categories').reply(200, data);
    sagaTester.dispatch(CategoriesActions.setActiveCategory(data.categories[0]));
    await sagaTester.waitFor(CategoriesActions.setCategorySuccess().type);
    expect(sagaTester.wasCalled(CategoriesActions.setCategorySuccess().type)).toEqual(true);
  });

  it('get categories triggered with failure', async () => {
    apiMock.onGet('/categories').reply(400);
    sagaTester.dispatch(CategoriesActions.getCategoriesRequest());
    await sagaTester.waitFor(CategoriesActions.getCategoriesFailure().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(CategoriesActions.getCategoriesFailure('Erro ao buscar categorias'));
  });
});
