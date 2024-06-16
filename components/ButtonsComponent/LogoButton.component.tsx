import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

function LogoButtonComponent() {
    const router = useRouter();

    const urlImg = "../../assets/images/icon.png";

    const handlePress = () => {
        router.replace("HomeView");
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Image style={styles.image} source={require(urlImg)} />
        </TouchableOpacity>);
}

export default LogoButtonComponent;

const styles = StyleSheet.create({ image: { width: 50, height: 50 } });
