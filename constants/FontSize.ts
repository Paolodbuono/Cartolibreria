
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isTabletOrDesktop = wp('100%') > 768;

export const bg = isTabletOrDesktop ? (24 * 5) / 2 : 24;
export const md = isTabletOrDesktop ? (18 * 5) / 2 : 18;
export const sm = isTabletOrDesktop ? (12 * 5) / 2 : 12;
