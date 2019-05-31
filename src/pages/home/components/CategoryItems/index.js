import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const CategoryItem = ({ selectedCategory, repo, changeCategory }) => (
  <TouchableOpacity
    onPress={() => changeCategory(repo)}
    style={[styles.catButton, selectedCategory.id === repo.id ? styles.catActive : null]}
  >
    <Text
      style={[styles.catText, selectedCategory.id === repo.id ? styles.catTextActive : null]}
    >{repo.title}
    </Text>
  </TouchableOpacity>
);

CategoryItem.propTypes = {
  selectedCategory: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  repo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
  }).isRequired,
  changeCategory: PropTypes.func.isRequired,
};

export default CategoryItem;
