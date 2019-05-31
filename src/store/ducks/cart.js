export const Types = {
  ADD_TO_CART_REQUEST: 'cart/ADD_TO_CART_REQUEST',
  ADD_TO_CART_SUCCESS: 'cart/ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE: 'cart/ADD_TO_CART_FAILURE',
  REMOVE_FROM_CART: 'cart/REMOVE_FROM_CART',
  UPDATE_QTY: 'cart/UPDATE_QTY',
};

const initialState = {
  items: [],
  error: null,
  subTotal: 0,
};

export default function cart(state = initialState, action = {}) {
  switch (action.type) {
    case Types.ADD_TO_CART_SUCCESS:
      return { ...state, items: action.payload.updatedItems, error: null };
    case Types.ADD_TO_CART_FAILURE:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}

export const Creators = {

  addToCart: product => ({
    type: Types.ADD_TO_CART_REQUEST,
    payload: { product },
  }),

  addToCartSuccess: updatedItems => ({
    type: Types.ADD_TO_CART_SUCCESS,
    payload: { updatedItems },
  }),

  addToCartFailure: error => ({
    type: Types.ADD_TO_CART_FAILURE,
    payload: { error },
  }),

  removeFromCart: product => ({
    type: Types.REMOVE_FROM_CART,
    payload: { product },
  }),

  updateQty: (qty, product) => ({
    type: Types.UPDATE_QTY,
    payload: { qty, product },
  }),

};
