export const Types = {
  GET_REQUEST: 'products/GET_REQUEST',
  GET_SUCCESS: 'products/GET_SUCCESS',
  GET_FAILURE: 'products/GET_FAILURE',
  SET_PRODUCT: 'products/SET_PRODUCT',
};

const initialState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, loading: false, error: null, products: action.payload.products };
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.SET_PRODUCT:
      return { ...state, selectedProduct: action.payload.product };
    default:
      return state;
  }
}

export const Creators = {
  getProductsRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getProductsSuccess: products => ({
    type: Types.GET_SUCCESS,
    payload: { products },
  }),

  getProductsFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),

  setSelectedProduct: product => ({
    type: Types.SET_PRODUCT,
    payload: { product },
  }),

};
