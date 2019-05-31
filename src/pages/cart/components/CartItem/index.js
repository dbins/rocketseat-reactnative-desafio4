import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CartActions } from '../../../../store/ducks/cart';

import styles from './styles';

class CartItem extends Component {
  static propTypes = {
    product: PropTypes.shape({
      qty: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    updateQty: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  }

  state = {
    qty: null,
  }

  componentWillMount() {
    this.setState({ qty: this.props.product.qty });
  }

  handleQtyChange(qty, product) {
    const formattedQty = Math.trunc(qty);

    if (formattedQty > -1 && (!Number.isNaN(formattedQty))) {
      this.props.updateQty(formattedQty, product);
      this.setState({ qty: formattedQty });
    } else {
      this.setState({ qty: 0 });
      this.props.updateQty(0, product);
    }
  }

  render() {
    const { product, removeFromCart } = this.props;
    return (
      <View style={styles.productContainer}>
        <Image resizeMode="contain" style={styles.image} source={{ uri: product.image }} />
        <View style={styles.description}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.price}>R${product.price}</Text>
        </View>
        <View style={styles.productRight}>
          <TextInput
            style={styles.qty}
            onChangeText={text => this.handleQtyChange(text, product)}
            value={String(this.state.qty)}
          />
          <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(product)} >
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(CartItem);
