import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../../styles';

const styles = StyleSheet.create({

  productContainer: {
    backgroundColor: colors.white,
    marginBottom: metrics.baseMargin / 2,
    padding: metrics.basePadding,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  description: {
    width: '50%',
  },

  productRight: {
    width: '15%',
    flexDirection: 'row',
  },

  image: {
    height: 60,
    width: '15%',
    alignSelf: 'center',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  brand: {
    color: colors.grey,
    fontSize: 11,
  },

  price: {
    paddingTop: metrics.basePadding / 2,
    color: colors.green,
    fontWeight: '900',
    fontSize: 14,
  },

  qty: {
    borderWidth: 0.5,
    borderColor: colors.grey,
    height: 30,
    width: 30,
    textAlign: 'center',
    paddingTop: 5,
  },

  removeButton: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },

  removeText: {
    color: colors.grey,
    fontWeight: '900',
  },

});

export default styles;
