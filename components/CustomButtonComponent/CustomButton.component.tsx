import React from 'react';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, View, StyleSheet, GestureResponderEvent } from 'react-native';

interface InfoButtonProps {
    onPress: (event: GestureResponderEvent) => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <FontAwesomeIcon icon={faInfo} style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff', // Colore di sfondo del bottone
        borderRadius: 20, // Bordo arrotondato del bottone
        padding: 10, // Spaziatura interna del bottone
        pointerEvents: "none"
    },
    icon: {
        color: 'white', // Colore dell'icona
        fontSize: 20, // Dimensione dell'icona
    },
});

export default InfoButton;
