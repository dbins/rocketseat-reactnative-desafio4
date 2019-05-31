import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    margin: metrics.baseMargin,
  },

  subtotalContainer: {
    height: 100,
    backgroundColor: colors.white,
    marginBottom: -20,
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtotalTitle: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '800',
  },

  subtotalPrice: {
    marginTop: 5,
    fontSize: 20,
    color: colors.green,
    fontWeight: '800',
  },

});

export default styles;
