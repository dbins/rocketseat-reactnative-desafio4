import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as CategoriesActions } from "../../store/ducks/categories";
import { Creators as ProductsActions } from "../../store/ducks/products";

import styles from "./styles";
import CategoryItem from "./components/CategoryItems";
import ProductItem from "./components/ProductItem";
import colors from "../../styles/colors";

class Home extends Component {
  static navigationOptions = {
    title: "GoCommerce!",
    headerStyle: {
      backgroundColor: "#1F63AE"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={24} color={tintColor} />
    )
  };

  static propTypes = {
    getCategoriesRequest: PropTypes.func.isRequired,

    categories: PropTypes.shape({
      categories: PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired,
      activeCategory: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
      }).isRequired
    }).isRequired,

    products: PropTypes.shape({
      products: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          brand: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired
        })
      ).isRequired,
      loading: PropTypes.bool.isRequired
    }).isRequired,

    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,

    setSelectedProduct: PropTypes.func.isRequired,
    setActiveCategory: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getCategoriesRequest();
  };

  navigateToProduct = async product => {
    await this.props.setSelectedProduct(product);
    this.props.navigation.navigate("ProductDetail");
  };

  render() {
    const {
      categories,
      activeCategory,
      loading: catLoading
    } = this.props.categories;
    const { products, loading: prodLoading } = this.props.products;

    return (
      <View style={styles.container}>
        {catLoading ? (
          <ActivityIndicator
            size="small"
            color="#FFF"
            style={styles.catLoading}
          />
        ) : (
          <FlatList
            id="categoriesList"
            contentContainerStyle={styles.catBar}
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={cat => String(cat.id)}
            renderItem={({ item }) => (
              <CategoryItem
                changeCategory={this.props.setActiveCategory}
                repo={item}
                selectedCategory={activeCategory}
              />
            )}
            extraData={activeCategory}
          />
        )}

        {prodLoading ? (
          <ActivityIndicator
            size="large"
            color="#FF6996"
            style={styles.prodLoading}
          />
        ) : (
          <FlatList
            id="productsList"
            contentContainerStyle={styles.productsContainer}
            data={products}
            keyExtractor={product => String(product.id)}
            renderItem={({ item }) => (
              <ProductItem
                navigateToProduct={this.navigateToProduct}
                product={item}
              />
            )}
            numColumns={2}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  products: state.products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CategoriesActions, ...ProductsActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
