import { bg, md } from '@/constants/FontSize';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Platform } from 'react-native';

const isTablet = wp('100%') > 600;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: "center",
        ...(isTablet && {
            backgroundColor: '#f0f0f0',
            flexDirection: 'column',
            padding: 20,
        })
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: isTablet ? 50 : (Platform.OS === 'web' ? 30 : 60),
        marginTop: isTablet ? 80 : 10
    },
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: isTablet ? 80 : 30,
    },
    buttonActionRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 40,
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: Platform.OS === 'web' ? 0 : 10,
        width: isTablet ? 150 : undefined,
    },
    buttonLabel: {
        textAlign: 'center',
        fontSize: md + 2,
        color: '#4975be',
    },
    buttonImportant: {
        marginTop: (Platform.OS === 'web' ? -40 : 10),
        marginBottom: -30,
        backgroundColor: 'rgb(235 96 25)',
        paddingVertical: 16,
        borderRadius: 8,
        padding: isTablet ? 30 : 20,
    },
    image: {
        margin: "auto",
        width: isTablet ? 80 : (Platform.OS === 'web' ? 65 : undefined),
        height: isTablet ? 80 : (Platform.OS === 'web' ? 65 : undefined),
    },
    imgSimple: {
        width: isTablet ? 500 : (Platform.OS === 'web' ? 300 : undefined),
        height: isTablet ? 100 : (Platform.OS === 'web' ? 55 : undefined),
    },
    imgBanner: {
        marginTop: 10,
        width: wp('100%'),
        height: isTablet ? 150 : 100,
        ...(isTablet && {
            top: -100,
            position: "absolute",
        })
    },
    imgFooter: {
        width: wp('100%'),
        height: 100,
        zIndex: -1
    },
    imgFooterTablet: {
        position: "absolute",
        bottom: -700,
        width: wp('100%'),
        height: 1000,
        zIndex: -1
    },
    welcome: {
        color: '#4975be',
        fontSize: md + 2,
        fontWeight: 'bold',
        marginBottom: -60
    }
});
