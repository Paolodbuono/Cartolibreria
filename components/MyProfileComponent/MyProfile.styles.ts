import { bg, md } from '@/constants/FontSize';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: bg,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: md,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: wp('100%'),
        paddingRight: wp('5%'),
        paddingLeft: wp('5%'),
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: wp('90%'),
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        marginBottom: 20,
    },
    radioContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: md,
        marginBottom: 10,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
        width: wp('90%'),
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#f4511e',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        width: wp('80%'),
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        alignItems: 'center',
    },
    textButton: {
        color: '#fff',
        fontSize: bg,
    },
    linkButton: {
        color: '#007bff',
        fontSize: md,
    },
    bottomLinks: {
        margin: 20,
        width: wp('90%'),
        borderTopWidth: 1,
        borderColor: "#8dc6ff"

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
});
