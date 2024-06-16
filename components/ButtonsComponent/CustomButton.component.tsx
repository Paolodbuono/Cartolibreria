import React from 'react';
import { faInfo, faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, View, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
    onPress: (event: GestureResponderEvent) => void,
    icon: string
}

const CustomButtonComponent: React.FC<CustomButtonProps> = ({ onPress, icon }) => {
    const { type, btnStyle, fontStyle } = getIconType(icon);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={btnStyle}>
                <FontAwesomeIcon icon={type} style={fontStyle} size={20} />
            </View>
        </TouchableOpacity>
    );
};

const getIconType = (icon: string): { type: IconDefinition, btnStyle: any, fontStyle: any } => {
    switch (icon.toLowerCase()) {
        case "info": return { type: faInfo, btnStyle: styleSheet.infoBtn, fontStyle: styleSheet.infoIcon };
        case "eye": return { type: faEye, btnStyle: styleSheet.eyeBtn, fontStyle: styleSheet.eyeIcon };
        case "closedeye": return { type: faEyeSlash, btnStyle: styleSheet.eyeBtn, fontStyle: styleSheet.eyeIcon };
        default: return { type: faInfo, btnStyle: icon, fontStyle: icon };
    }
}

const styleSheet = StyleSheet.create({
    infoBtn: {
        backgroundColor: '#007bff', // Colore di sfondo del bottone
        borderRadius: 20, // Bordo arrotondato del bottone
        padding: 3, // Spaziatura interna del bottone
        pointerEvents: "none"
    },
    infoIcon: {
        color: 'white', // Colore dell'icona
    },
    eyeBtn: {
        backgroundColor: 'white', // Colore di sfondo del bottone
        borderRadius: 20, // Bordo arrotondato del bottone
        padding: 3, // Spaziatura interna del bottone
        pointerEvents: "none"
    },
    eyeIcon: {
        color: 'black', // Colore dell'icona
    },
});

export default CustomButtonComponent;
