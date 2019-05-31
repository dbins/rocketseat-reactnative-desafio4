import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Text, FlatList } from "react-native";

import Cart from "../../../src/pages/cart";
import CartItem from "../../../src/pages/cart/components/CartItem";
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
const initialState = {
  cart: {
    items: [
      {
        image:
          "https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg",
        qty: 2,
        name: "Camiseta Hyperas Preta",
        brand: "Quiksilver",
        price: 49.99,
        id: 1
      },
      {
        name: "Camiseta Double Tap Preta",
        qty: 1,
        brand: "Quiksilver",
        image:
          "https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg",
        price: 59.99
      }
    ],
    error: null
  }
};

describe("Cart tests", () => {
  const store = mockStore(initialState);
  const total = initialState.cart.items
    .reduce((acc, item) => {
      return item.price * item.qty + acc;
    }, 0)
    .toFixed(2);
  function createWrapper() {
    //return shallow(<Cart />, { context: { store } });
    return mount(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
  }

  it("Should have correct props", () => {
    const wrapper = createWrapper();

    expect(wrapper.find("Cart").prop("items")).toEqual(initialState.cart.items);
    expect(wrapper.find("Cart").prop("total")).toEqual(total);
  });

  it("Should render correctly", () => {
    const wrapper = createWrapper();

    expect(wrapper.find(FlatList)).toHaveLength(1);
    expect(wrapper.find(FlatList).prop("data")).toEqual(
      initialState.cart.items
    );
    expect(
      wrapper
        .find(FlatList)
        .props()
        .keyExtractor(initialState.cart.items[0])
    ).toEqual("1");
    expect(
      wrapper
        .find(FlatList)
        .props()
        .renderItem(initialState.cart.items[0])
    ).toEqual(<CartItem />);

    expect(wrapper.find(Text).contains("Subtotal")).toBe(true);
    expect(wrapper.find(Text).contains(total)).toBe(true);
  });
});
