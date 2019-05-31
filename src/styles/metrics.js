import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  categoryBarHeight: 44,
  categoryFontSize: 12,
  imageHeight: 180,
  basePadding: 20,
  baseMargin: 20,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
