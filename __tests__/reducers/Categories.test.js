import categoryReducer, { Creators as CategoriesActions } from '../../src/store/ducks/categories';

const initialState = {
  categories: [
    {
      id: 1,
      title: 'Camisetas',
    },
  ],
  activeCategory: {},
  loading: false,
  error: null,
};

const newCat = {
  id: 2,
  title: 'Camisas',
};

describe('Category reducer tests', () => {

  it('get category request', () => {
    const state = categoryReducer(initialState, CategoriesActions.getCategoriesRequest());

    expect(state.categories).toHaveLength(1);
    expect(state.loading).toBe(true);
  });

  it('getCategoriesSuccess', () => {
    const state = categoryReducer(initialState, CategoriesActions.getCategoriesSuccess([...[newCat], ...initialState.categories]));

    expect(state.categories).toHaveLength(2);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.categories[0]).toEqual(newCat);
  });

  it('getCategoriesFailure', () => {
    const state = categoryReducer(initialState, CategoriesActions.getCategoriesFailure('Erro ao buscar categorias'));

    expect(state.categories).toHaveLength(1);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual('Erro ao buscar categorias');
  });

  it('setActiveCategory', () => {
    const state = categoryReducer(initialState, CategoriesActions.setActiveCategory(newCat));
    expect(state.activeCategory).toEqual(newCat);
  });

  it('setActiveCategory Failure', () => {
    const state = categoryReducer(initialState, CategoriesActions.setCategoryfailure('Erro ao selecionar Categoria'));
    expect(state.error).toEqual('Erro ao selecionar Categoria');
  });

  it('setActiveCategory Success', () => {
    const state = categoryReducer(initialState, CategoriesActions.setCategorySuccess());
    expect(state).toEqual(initialState);
  });
});
