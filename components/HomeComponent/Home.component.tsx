import React, { useCallback } from 'react';
import { View, Image, Pressable, Linking, Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isTablet = wp('100%') > 768;

const HomeComponent: React.FC<{}> = () => {
    const openSite = useCallback(() => {
        Linking.openURL('https://www.libreriabonagura.it');
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require('../../assets/images/headerBonaguraLogo.png')}
                />
            </View>
            <Pressable onPress={openSite} style={{ flex: 1 }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                    source={require('../../assets/images/dismessa.png')}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: isTablet ? 12 : 6,
        backgroundColor: '#fff',
    },
    logo: {
        width: wp('100%'),
        height: isTablet ? 100 : 60,
    },
});

export default HomeComponent;
