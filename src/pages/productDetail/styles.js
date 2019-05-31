import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  
  container: {
    backgroundColor: colors.white,
    margin: metrics.baseMargin,
    marginBottom: 250,
  },

  image: {
    height: 285,
  },

  decription: {
    flexDirection: 'row',
    padding: metrics.basePadding,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  productName: {
    width: '60%',
    fontWeight: 'bold',
    fontSize: 18,
  },

  productBrand: {
    color: colors.grey,
    fontSize: 12,
  },

  productPrice: {
    width: '40%',
    textAlign: 'right',
    color: colors.green,
    fontWeight: 'bold',
    fontSize: 24,
  },

  cartButton: {
    height: 45,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.basePadding,
  },

  cartText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
