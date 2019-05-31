import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../../styles';

const styles = StyleSheet.create({
  catBar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.pink,
    height: metrics.categoryBarHeight,
    paddingHorizontal: metrics.basePadding,
  },

  catButton: {
    marginRight: metrics.baseMargin,
    justifyContent: 'center',
    height: '100%',
  },

  catText: {
    fontSize: metrics.categoryFontSize,
    fontWeight: 'bold',
    color: colors.nonActiveCat,
  },

  catTextActive: {
    color: colors.white,
  },

  catActive: {
    borderBottomWidth: 5,
    borderBottomColor: colors.white,
  },
});

export default styles;