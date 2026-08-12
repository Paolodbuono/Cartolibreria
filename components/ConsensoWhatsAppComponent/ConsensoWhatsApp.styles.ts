import { bg, md, sm } from "@/constants/FontSize";
import { StyleSheet, Dimensions } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const isPhone = Dimensions.get('window').width < 768;

export const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    card: {
        width: '100%',
        maxWidth: 560,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: bg,
        textAlign: 'center',
        fontWeight: '500',
        color: '#EB5F19',
    },
    subtitle: {
        fontSize: md,
        textAlign: 'center',
        marginTop: 6,
        color: '#4975be',
    },
    label: {
        fontSize: md,
        color: '#4975be',
        marginTop: 20,
        marginBottom: 4,
    },
    inputText: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 8,
        fontSize: md,
        width: '100%',
    },
    consentBox: {
        marginTop: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#fafafa',
    },
    consentText: {
        fontSize: sm,
        color: '#333333',
        lineHeight: 18,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 16,
    },
    checkbox: {
        margin: 4,
        marginTop: 2,
    },
    checkLabel: {
        fontSize: sm,
        color: '#4975be',
        flex: 1,
        marginLeft: 4,
    },
    checkCaption: {
        fontSize: sm,
        color: '#999999',
        flex: 1,
        marginLeft: 4,
        marginTop: 2,
    },
    privacyLink: {
        fontSize: sm,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    errorText: {
        fontSize: sm,
        color: '#d9534f',
        marginTop: 12,
        textAlign: 'center',
    },
    sendBtn: {
        marginTop: 20,
        backgroundColor: '#25D366',
        paddingVertical: isPhone ? 12 : 16,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    sendBtnIcon: {
        marginRight: 8,
    },
    sendBtnLabel: {
        color: 'white',
        fontSize: isPhone ? 16 : 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flexShrink: 1,
    },
    confirmOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    confirmModal: {
        width: '100%',
        maxWidth: 420,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    confirmTitle: {
        fontSize: bg,
        textAlign: 'center',
        fontWeight: '500',
        color: '#EB5F19',
    },
    confirmBody: {
        fontSize: md,
        textAlign: 'center',
        marginTop: 10,
        color: '#4975be',
    },
    confirmBtnRow: {
        flexDirection: 'row',
        marginTop: 20,
    },
    confirmBtn: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmBtnSecondary: {
        backgroundColor: '#e0e0e0',
        marginRight: 6,
    },
    confirmBtnPrimary: {
        backgroundColor: '#25D366',
        marginLeft: 6,
    },
    confirmBtnLabel: {
        color: '#333333',
        fontSize: md,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    confirmBtnLabelPrimary: {
        color: '#ffffff',
        fontSize: md,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    confirmTitleOk: {
        fontSize: bg,
        textAlign: 'center',
        fontWeight: '500',
        color: '#25D366',
    },
    confirmText: {
        fontSize: md,
        textAlign: 'center',
        marginTop: 12,
        color: '#4975be',
    },
    confirmMarginTop: {
        marginTop: hp('3%'),
    },
});
