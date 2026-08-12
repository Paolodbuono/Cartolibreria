import { bg, md, sm } from "@/constants/FontSize";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const isPhone = width < 768;

export const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    card: {
        width: '100%',
        maxWidth: 1000,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
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
        marginTop: 4,
        color: '#4975be',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: md,
        marginTop: 16,
        width: '100%',
    },
    filterRow: {
        flexDirection: 'row',
        marginTop: 12,
        flexWrap: 'wrap',
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#e8e8e8',
    },
    chipActive: {
        backgroundColor: '#4975be',
    },
    chipLabel: {
        color: '#333333',
        fontSize: sm,
    },
    chipLabelActive: {
        color: '#ffffff',
        fontSize: sm,
    },
    countText: {
        marginTop: 12,
        fontSize: sm,
        color: '#888888',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#e0e0e0',
        paddingVertical: 8,
        backgroundColor: '#fafafa',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerCell: {
        color: '#333333',
        fontSize: sm,
        fontWeight: 'bold',
    },
    cell: {
        color: '#444444',
        fontSize: sm,
    },
    colNome: {
        flex: 2.2,
        paddingRight: 8,
    },
    colTelefono: {
        flex: 1.4,
        paddingRight: 8,
    },
    colStato: {
        flex: 1,
        paddingRight: 8,
    },
    colData: {
        flex: 1.5,
        paddingRight: 8,
    },
    colProvenienza: {
        flex: 1.3,
    },
    colAzioni: {
        flex: 0.8,
        alignItems: 'center',
    },
    loginBtn: {
        marginTop: 16,
        backgroundColor: '#4975be',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    loginBtnLabel: {
        color: '#ffffff',
        fontSize: md,
        fontWeight: 'bold',
    },
    deleteBtn: {
        marginTop: 8,
        backgroundColor: '#e8e8e8',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
    },
    deleteBtnConfirm: {
        backgroundColor: '#d9534f',
    },
    deleteBtnLabel: {
        color: '#333333',
        fontSize: sm,
        fontWeight: 'bold',
    },
    badgeSi: {
        color: '#1b7f37',
        fontWeight: 'bold',
    },
    badgeNo: {
        color: '#d9534f',
        fontWeight: 'bold',
    },
    badgeRevocato: {
        color: '#e67e22',
        fontWeight: 'bold',
    },
    cardItem: {
        borderWidth: 1,
        borderColor: '#eeeeee',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#ffffff',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    cardLabel: {
        color: '#999999',
        fontSize: sm,
    },
    cardValue: {
        color: '#333333',
        fontSize: sm,
        fontWeight: 'bold',
    },
    empty: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: md,
        color: '#999999',
    },
    error: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: md,
        color: '#d9534f',
    },
});
