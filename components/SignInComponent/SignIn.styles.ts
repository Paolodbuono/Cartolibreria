import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 10,
        color: '#EB5F19'
    },
    subTitle: {
        fontSize: 24,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '100',
        color: '#4975be'
    },
    containerForm: {
        marginTop: hp('1.5%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    radio: {
        margin: 2,
    },
    text: {
        fontSize: 18,
        color: '#4975be'
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    sendBtn: {
        marginTop: hp('2.5%'),
        backgroundColor: '#4975be',
        padding: 10,
        width: 120,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center"

    }
});