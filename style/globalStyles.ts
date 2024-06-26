import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const gs = StyleSheet.create({
    spinner: {
        color: "blue",
        height: hp("100%"),
        width: wp("100%"),
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
    },
    modalWrapper: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        height: hp('100%'),
        width: wp('100%'),

        backgroundColor: "white",

        display: "flex",
        alignContent: "space-between"
    },
    modalHeader: {
        flex: 3,
        paddingBottom: 60,
    },
    modalHeaderText: {
        textAlign: 'center',
        fontWeight: '800',
        color: '#EB5F19',
        width: wp("90%"),
        fontSize: 32
    },
    modalBody: {
        flex: 10,
    },
    modalBodyText: {
        fontSize: 22,
        color: '#4975be',
        fontWeight: '600',
        textAlign: 'center',
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
    modalActionButtons: {
        flex: 3
    },
    modalActionBtnConfirm: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,

    },
    modalActionBtnConfirmLabel: {
        color: 'white',
        fontSize: 16,
        height: 35,
        textAlign: 'center',
        textAlignVertical:"center",
        fontWeight: 'bold',
    }

});