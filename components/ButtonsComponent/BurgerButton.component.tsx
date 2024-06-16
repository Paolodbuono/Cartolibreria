import React from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface BurgerButtonProps {
    onPress: (event: GestureResponderEvent) => void;
}

const BurgerButtonComponent: React.FC<BurgerButtonProps> = ({ onPress }) => {
    const urlImg = "../../assets/images/hamburger.png";

    return (
        <TouchableOpacity onPress={onPress}>
            <Image style={styles.image} source={require(urlImg)} />
        </TouchableOpacity>);
}

export default BurgerButtonComponent;

const styles = StyleSheet.create({ image: { width: 54, height: 38} });
