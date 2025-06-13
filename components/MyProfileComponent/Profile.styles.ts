import { bg, md } from '@/constants/FontSize';
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const isTablet = width > 768;

export const styles = StyleSheet.create({
    wrapper: isTablet ? { width: wp("100%"), padding: wp("5%"), height: "100%" } : { width: wp("90%"), padding: wp("5%"), height: "100%" },
    title: { fontSize: bg, padding: 10, fontWeight: '400', color: '#EB5F19' },
    titleBOLD: { fontSize: bg, padding: 10, fontWeight: '800', color: '#EB5F19' },
    subTitle: { fontSize: md, fontWeight: '400', color: '#4975be', top: -5 },
    subTitleBOLD: { fontSize: md, textAlign: 'center', fontWeight: '800', color: '#4975be', top: -5 },
    btnPosition: { position: 'absolute', bottom: 20, width: wp("90%"), alignSelf: "center" }
});
