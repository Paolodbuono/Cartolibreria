import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isTablet = wp('100%') > 768;

function LogoButtonComponent() {
    const router = useRouter();

    const urlImg = "../../assets/images/adaptive-icon.png";

    const handlePress = () => {
        router.replace("/HomeView");
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Image style={styles.image} source={require(urlImg)} />
        </TouchableOpacity>);
}

export default LogoButtonComponent;

const styles = StyleSheet.create({ image: { width: isTablet ? 75 : 35, height: isTablet ? 75 : 35 } });
