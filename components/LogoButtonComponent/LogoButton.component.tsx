import React from 'react';
import { Image, StyleSheet } from 'react-native';

function LogoButtonComponent() {
    const urlImg = "../../assets/images/icon.png";
    return (
        <Image style={styles.image} source={require(urlImg)} />
    );
}

export default LogoButtonComponent;

const styles = StyleSheet.create({ image: { width: 50, height: 50 } });
