import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const ProductItem = ({ product, navigateToProduct }) => (
  <TouchableOpacity onPress={() => navigateToProduct(product)} style={styles.container}>
    <Image resizeMode="contain" style={styles.image} source={{ uri: product.image }} />
    <View style={styles.description}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
    </View>
  </TouchableOpacity>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  navigateToProduct: PropTypes.func.isRequired,
};

export default ProductItem;
