import { bg, md } from '@/constants/FontSize';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Platform } from 'react-native';

const isTabletOrDesktop = wp('100%') > 768;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: "center",
        ...(isTabletOrDesktop && {
            backgroundColor: '#f0f0f0',
            flexDirection: 'column',
            padding: 20,
            paddingBottom: 100
        })
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: isTabletOrDesktop ? 100 : 60,
        marginTop: 10
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: isTabletOrDesktop ? 80 : 60,
    },
    buttonActionRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 40,
    },
    buttonContainer: {
        display: "flex",
        gap: Platform.OS === 'web' ? 0 : 10,
        width: isTabletOrDesktop ? 350 : undefined,
    },
    buttonLabel: {
        textAlign: 'center',
        fontSize: md + 2,
        color: '#4975be',
    },
    buttonImportant: {
        marginTop: (Platform.OS === 'web' ? -40 : 10) ,
        marginBottom: -30,
        backgroundColor: 'rgb(235 96 25)',
        paddingVertical: 16,
        borderRadius: 8,
        padding: isTabletOrDesktop ? 50 : 20,
    },
    image: {
        margin: "auto",
        width: isTabletOrDesktop ? 200 : (Platform.OS === 'web' ? 75 : undefined),
        height: isTabletOrDesktop ? 200 : (Platform.OS === 'web' ? 75 : undefined),
    },
    imgBanner: {
        marginTop: 10,
        width: wp('100%'),
        height: isTabletOrDesktop ? 250 : 100,
    },
    imgFooter: {
        width: wp('100%'),
        height: 100,
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
