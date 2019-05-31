import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  catBar: {
    flexDirection: 'row',
    width: '150%',
    backgroundColor: colors.pink,
    height: metrics.categoryBarHeight,
    paddingHorizontal: metrics.basePadding,
  },

  productsContainer: {
    margin: metrics.baseMargin,
  },

  catLoading: {
    backgroundColor: colors.pink,
    height: metrics.categoryBarHeight,
  },

  prodLoading: {
    marginTop: metrics.baseMargin * 2,
  },

});

export default styles;
