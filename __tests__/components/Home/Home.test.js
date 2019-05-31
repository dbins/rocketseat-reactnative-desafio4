import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { FlatList, View, ActivityIndicator } from "react-native";
import sinon from "sinon";
require("react-native-mock-render/mock");
import Home from "../../../src/pages/home";
import { Creators as CategoriesActions } from "../../../src/store/ducks/categories";
import { Creators as ProductsActions } from "../../../src/store/ducks/products";

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
  categories: {
    categories: [
      {
        id: 1,
        title: "Camisetas"
      },
      {
        id: 2,
        title: "Camisas"
      }
    ],
    activeCategory: {
      id: 1,
      title: "Camisetas"
    },
    loading: false,
    error: null
  },
  products: {
    products: [
      {
        image:
          "https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg",
        name: "Camiseta Hyperas Preta",
        brand: "Quiksilver",
        price: 49.99,
        id: 1
      },
      {
        name: "Camiseta Double Tap Preta",
        brand: "Quiksilver",
        image:
          "https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg",
        price: 59.99
      }
    ],
    loading: false,
    error: null,
    selectedProduct: {}
  }
};

const loadingState = {
  categories: {
    categories: [],
    activeCategory: {},
    loading: true,
    error: null
  },
  products: {
    products: [],
    loading: true,
    error: null,
    selectedProduct: {}
  }
};

const navigateFn = sinon.spy();
const navigation = {
  navigate: navigateFn,
  dispatch: function() {},
  state: { routeName: "testRoute" }
};

describe("Home tests", () => {
  const store = mockStore(initialState);
  function createWrapper() {
    //return shallow(<Home navigation={navigation} />, { context: { store } });
    return mount(
      <Provider store={store}>
        <Home navigation={navigation} />
      </Provider>
    );
  }

  it("it renders correctly", () => {
    const wrapper = createWrapper();
    const {
      categories: { categories },
      products: { products }
    } = initialState;

    expect(wrapper.find(View)).toHaveLength(13);
    expect(wrapper.find(FlatList)).toHaveLength(2);
    expect(wrapper.find(ActivityIndicator)).toHaveLength(0);

    expect(wrapper.find('FlatList[id="categoriesList"]').prop("data")).toEqual(
      categories
    );

    expect(wrapper.find('FlatList[id="productsList"]').prop("data")).toEqual(
      products
    );

    expect(
      wrapper
        .find('FlatList[id="categoriesList"]')
        .props()
        .keyExtractor(categories[0])
    ).toEqual("1");

    expect(
      wrapper
        .find('FlatList[id="productsList"]')
        .props()
        .keyExtractor(products[0])
    ).toEqual("1");

    //DESATIVADO
    // expect(wrapper.dive().find({ id: 'categoriesList' }).props().renderItem(categories))
    //   .toEqual(<CategoryItems
    //     changeCategory={changeCat}
    //     repo={undefined}
    //     selectedCategory={initialState.categories.activeCategory}
    //   />);
    //expect(
    //  wrapper
    //    .find('FlatList[id="productsList"]')
    //    .props()
    //    .renderItem(products[0])
    //).toEqual(
    //  <ProductItem navigateToProduct={navigateToProduct} product={undefined} />
    //);

    expect(store.getActions()).toContainEqual(
      CategoriesActions.getCategoriesRequest()
    );
  });

  it("it shows loading components", () => {
    const emptystore = mockStore(loadingState);
    //const wrapper = shallow(<Home navigation={navigation} />, {
    //  context: { store: emptystore }
    //});
    const wrapper = mount(
      <Provider store={emptystore}>
        <Home navigation={navigation} />
      </Provider>
    );

    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(FlatList)).toHaveLength(0);
    expect(wrapper.find(ActivityIndicator)).toHaveLength(2);
  });

  it("it triggers navigateToProduct", async () => {
    const wrapper = createWrapper();

    //wrapper.instance().navigateToProduct(initialState.products.products[0]);
    //await expect(store.getActions()).toContainEqual(
    //  ProductsActions.setSelectedProduct(initialState.products.products[0])
    //);
    //expect(navigateFn.calledOnce).toBe(true);
  });
});
