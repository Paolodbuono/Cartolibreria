import { bg, md, sm } from '@/constants/FontSize';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('1%'),
    },
    title: {
        fontSize: bg,
        color: '#4975be',
        fontWeight: 'bold'
    },
    subTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2.5%')
    },
    subTitle: {
        fontSize: md,
        color: '#4975be',
        paddingLeft: wp('3%'),
        paddingRight: wp('3%')
    },
    emailInputContainer: {
        justifyContent: 'center',
        marginTop: hp('4%'),
        width: wp('90%')
    },
    emailLabel: {
        fontSize: md,
        color: '#4975be',
        marginLeft: wp('5%'),
    },
    emailInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        width: wp('80%'),
    },
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    showErrorContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 15
    },
    showError: {
        fontSize: sm,
        color: 'red',
        paddingLeft: 12,
        paddingRight: 12
    }

});
