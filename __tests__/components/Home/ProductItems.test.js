import React from 'react';
import { shallow } from 'enzyme';
import { Text, TouchableOpacity, Image } from 'react-native';
import sinon from 'sinon';

import ProductItem from '../../../src/pages/home/components/ProductItem';

const navigateFn = sinon.spy();

const product = {
  image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
  name: 'Camiseta Hyperas Preta',
  brand: 'Quiksilver',
  price: 49.99,
};

describe('Category Item tests', () => {
  function createWrapper() {
    return shallow(<ProductItem
      product={product}
      navigateToProduct={navigateFn}
    />);
  }

  it('renders correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text).contains(product.brand)).toBe(true);
    expect(wrapper.find(Text).contains(product.price)).toBe(true);
    expect(wrapper.find(Text).contains(product.name)).toBe(true);
    expect(wrapper.find(Image).prop('source')).toEqual({ uri: product.image });
  });

  it('can navigate to product', () => {
    const wrapper = createWrapper();

    wrapper.find(TouchableOpacity).simulate('press');
    expect(navigateFn.withArgs(product).calledOnce).toBe(true);
  });
});
