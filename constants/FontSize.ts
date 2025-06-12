
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isTablet = wp('100%') > 768;
const isDesktop = wp('100%') > 1668;

export const bg = isTablet ? (24 * 2) / 2 : 24;
export const md = isTablet ? (18 * 2) / 2 : 18;
export const sm = isTablet ? (12 * 2) / 2 : 12;
