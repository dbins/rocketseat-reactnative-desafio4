import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { Text, Image, TouchableOpacity, TextInput } from "react-native";
import configureStore from "redux-mock-store";

import CartItem from "../../../src/pages/cart/components/CartItem";
import { Creators as CartActions } from "../../../src/store/ducks/cart";
require("react-native-mock-render/mock");

const mockStore = configureStore([]);

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
const product = {
  image:
    "https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg",
  qty: 2,
  name: "Camiseta Hyperas Preta",
  brand: "Quiksilver",
  price: 49.99
};

describe("Cart tests", () => {
  const store = mockStore({});
  function createWrapper() {
    //return shallow(<CartItem product={product} />, { context: { store } });
    return mount(
      <Provider store={store}>
        <CartItem product={product} />
      </Provider>
    );
  }

  it("Should have correct props", () => {
    const wrapper = createWrapper();

    expect(wrapper.find("CartItem").state("qty")).toEqual(product.qty);
    expect(wrapper.find(CartItem).prop("product")).toEqual(product);
  });

  it("Should render correctly", () => {
    const wrapper = createWrapper();

    expect(wrapper.find(Image).prop("source")).toEqual({ uri: product.image });
    expect(wrapper.find(Text).contains(product.brand)).toBe(true);
    expect(wrapper.find(Text).contains(product.name)).toBe(true);
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text).contains("X")).toBe(true);
  });

  it("Should be able to Remove from Cart", () => {
    const wrapper = createWrapper();
    wrapper
      .find(TouchableOpacity)
      .props()
      .onPress();
    expect(store.getActions()).toContainEqual(
      CartActions.removeFromCart(product)
    );
  });

  it("Should be able to update Qty", () => {
    const wrapper = createWrapper();
    expect(wrapper.find("CartItem").state("qty")).toEqual(product.qty);

    wrapper
      .find(TextInput)
      .props()
      .onChangeText("4");
    expect(store.getActions()).toContainEqual(
      CartActions.updateQty(4, product)
    );
  });

  it("Should be able to update Qty", () => {
    const wrapper = createWrapper();
    expect(wrapper.find("CartItem").state("qty")).toEqual(product.qty);

    wrapper
      .find(TextInput)
      .props()
      .onChangeText("ZA");
    expect(store.getActions()).toContainEqual(
      CartActions.updateQty(0, product)
    );
  });
});
