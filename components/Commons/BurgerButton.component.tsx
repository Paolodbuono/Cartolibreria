import React from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isTablet = wp('100%') > 768;

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
        ...(isTablet && {
            right: -25,
            top: -75,
            position: "absolute",
            padding: 20,
            margin: 50,
            width: 50,
            height: 50
        })
    },
});
