import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    wrapper: { width: wp("100%"), padding: wp("5%"), height: "100%" },
    title: { fontSize: 26, padding: 10, fontWeight: '400', color: '#EB5F19' },
    titleBOLD: { fontSize: 26, padding: 10, fontWeight: '800', color: '#EB5F19' },
    subTitle: { fontSize: 24, fontWeight: '400', color: '#4975be', top: -5 },
    subTitleBOLD: { fontSize: 24, textAlign: 'center', fontWeight: '800', color: '#4975be', top: -5 },
    btnPosition: { position: 'absolute', bottom: 20, width: wp("90%"), alignSelf: "center" }
});
