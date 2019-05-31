import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import Home from "./pages/home";
import Cart from "./pages/cart";
import ProductDetail from "./pages/productDetail";

import { colors } from "./styles";

const stackNavOptions = {
  navigationOptions: {
    headerTintColor: colors.pink,
    headerBackTitle: null,
    headerTitleStyle: {
      fontSize: 16,
      fontWeight: "bold"
    },
    headerStyle: {
      height: 54
    }
  }
};

const tabNavOptions = {
  tabBarPosition: "bottom",
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: colors.white,
    inactivateTintColor: colors.grey,
    style: {
      backgroundColor: "#1F63AE",
      height: 40,
      paddingTop: 20
    }
  }
};

const Product = createStackNavigator(
  {
    Home: { screen: Home },
    ProductDetail: { screen: ProductDetail }
  },
  stackNavOptions
);

const Checkout = createStackNavigator(
  {
    Cart: { screen: Cart }
  },
  stackNavOptions
);

const Rotas = createBottomTabNavigator(
  {
    Product: { screen: Product },
    Checkout: { screen: Checkout }
  },
  tabNavOptions
);

const Routes = createAppContainer(Rotas);

export default Routes;
