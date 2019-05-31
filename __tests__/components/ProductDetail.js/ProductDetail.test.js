import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import createStore from "redux-mock-store";
import { ScrollView, Image, Text, TouchableOpacity } from "react-native";
import sinon from "sinon";

import ProductDetail from "../../../src/pages/productDetail";
import { Creators as CartActions } from "../../../src/store/ducks/cart";

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM("", { url: "https://example.org/" }).window;
global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    global[property] = document.defaultView[property];
  }
});
function suppressDomErrors() {
  const suppressedErrors = /(Received `%s` for a non-boolean attribute `%s`|React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser|PascalCase)/;
  // eslint-disable-next-line no-console
  const realConsoleError = console.error;
  // eslint-disable-next-line no-console
  console.error = message => {
    if (message.match(suppressedErrors)) {
      return;
    }
    realConsoleError(message);
  };
}
suppressDomErrors();
const mockStore = createStore();

const initialState = {
  products: {
    selectedProduct: {
      image:
        "https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg",
      qty: 2,
      name: "Camiseta Hyperas Preta",
      brand: "Quiksilver",
      price: 49.99
    }
  }
};

describe("Product Detail Testing", () => {
  const store = mockStore(initialState);
  const navigateFn = sinon.spy();
  const navigation = {
    navigate: navigateFn,
    dispatch: () => {},
    state: { routeName: "testRoute" }
  };
  function createWrapper() {
    //return shallow(<ProductDetail navigation={navigation} />, {
    //  context: { store }
    //});
    return mount(
      <Provider store={store}>
        <ProductDetail {...initialState} navigation={navigation} />
      </Provider>
    );
  }

  it("have correct props", () => {
    const wrapper = createWrapper();
    //console.log(wrapper.props());
    //Desta forma consegue chegar nas props enviadas pelo Provider.
    //console.log(wrapper.find("ProductDetail").props());
    //console.log(wrapper.prop("products"));
    expect(wrapper.find("ProductDetail").prop("products")).toEqual(
      initialState.products
    );
  });

  it("have render correctly", () => {
    const { selectedProduct } = initialState.products;
    const wrapper = createWrapper();
    expect(wrapper.find(ScrollView)).toHaveLength(1);
    expect(wrapper.find(Image).prop("source")).toEqual({
      uri: selectedProduct.image
    });
    expect(wrapper.find(Text).contains(selectedProduct.name)).toBe(true);
    expect(wrapper.find(Text).contains(selectedProduct.brand)).toBe(true);
    expect(wrapper.find(Text).contains(String(selectedProduct.price))).toBe(
      true
    );
    expect(wrapper.find(Text).contains("Adicionar ao Carrinho")).toBe(true);
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
  });

  it("can add to cart", async () => {
    const wrapper = createWrapper();
    const flushAllPromises = () =>
      new Promise(resolve => setImmediate(resolve));

    wrapper.find(TouchableOpacity).simulate("click");
    //console.log(store);
    //console.log(store.getActions());
    //return flushAllPromises().then(() => {
    //  expect(store.getActions()).toContainEqual(
    //    CartActions.addToCart(initialState.products.selectedProduct)
    //  );
    //});
    //await expect(store.getActions()).toContainEqual(
    //  CartActions.addToCart(initialState.products.selectedProduct)
    //);
  });
});
