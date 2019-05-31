import React from 'react';
import { shallow } from 'enzyme';
import { Text, TouchableOpacity } from 'react-native';
import sinon from 'sinon';

import CategoryItems from '../../../src/pages/home/components/CategoryItems';

const activeCat = {
  id: 1,
  title: 'Camisetas',
};

const changeCat = sinon.spy();

describe('Category Item tests', () => {
  function createWrapper() {
    return shallow(<CategoryItems
      selectedCategory={activeCat}
      repo={activeCat}
      changeCategory={changeCat}
    />);
  }

  it('renders correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text).contains(activeCat.title)).toBe(true);
  });

  it('can change Category', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    wrapper.find(TouchableOpacity).simulate('press');
    expect(changeCat.withArgs(activeCat).calledOnce).toBe(true);
  });
});
