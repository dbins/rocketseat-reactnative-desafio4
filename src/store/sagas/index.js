import { all, takeLatest } from "redux-saga/effects";

import { Types as CategoriesTypes } from "../ducks/categories";
import { Types as CartTypes } from "../ducks/cart";

import { getCategories, setCategory } from "./categories";
import { getProducts } from "./products";
import { addToCart, removeFromCart, updateQty } from "./cart";

export default function* rootSaga() {
  return yield all([
    takeLatest(CategoriesTypes.GET_REQUEST, getCategories),
    takeLatest(CategoriesTypes.SET_CATEGORY, setCategory),
    takeLatest(CategoriesTypes.SET_CATEGORY_SUCCESS, getProducts),
    takeLatest(CartTypes.ADD_TO_CART_REQUEST, addToCart),
    takeLatest(CartTypes.REMOVE_FROM_CART, removeFromCart),
    takeLatest(CartTypes.UPDATE_QTY, updateQty)
  ]);
}
