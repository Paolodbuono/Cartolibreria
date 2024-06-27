import React from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface BurgerButtonProps {
    onPress: (event: GestureResponderEvent) => void;
}

const urlImg = "../../assets/images/hamburger.png";

const BurgerButtonComponent: React.FC<BurgerButtonProps> = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <Image style={styles.image} source={require(urlImg)} />
        </TouchableOpacity>
    );
}

export default BurgerButtonComponent;

const styles = StyleSheet.create({
    image:
    {
    }
});
