export const Types = {
  GET_REQUEST: 'categories/GET_REQUEST',
  GET_SUCCESS: 'categories/GET_SUCCESS',
  GET_FAILURE: 'categories/GET_FAILURE',
  SET_CATEGORY: 'categories/SET_CATEGORY',
  SET_CATEGORY_SUCCESS: 'categories/SET_CATEGORY_SUCCESS',
  SET_CATEGORY_FAILURE: 'categories/SET_CATEGORY_FAILURE',
};

const initialState = {
  categories: [],
  activeCategory: {},
  loading: false,
  error: null,
};

export default function categories(state = initialState, action = {}) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, categories: action.payload.cats, loading: false };
    case Types.GET_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    case Types.SET_CATEGORY:
      return { ...state, activeCategory: action.payload.category };
    case Types.SET_CATEGORY_FAILURE:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}

export const Creators = {
  getCategoriesRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getCategoriesSuccess: cats => ({
    type: Types.GET_SUCCESS,
    payload: { cats },
  }),

  getCategoriesFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),

  setActiveCategory: category => ({
    type: Types.SET_CATEGORY,
    payload: { category },
  }),

  setCategorySuccess: () => ({
    type: Types.SET_CATEGORY_SUCCESS,
  }),

  setCategoryfailure: error => ({
    type: Types.SET_CATEGORY_FAILURE,
    payload: { error },
  }),

};
