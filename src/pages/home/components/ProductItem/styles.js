import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginRight: 10,
    marginLeft: -3,
    padding: metrics.basePadding,
    backgroundColor: colors.white,
    marginBottom: metrics.baseMargin / 2,
  },

  image: {
    height: 180,
    width: '80%',
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

});

export default styles;
