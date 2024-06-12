import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface EmailFormProps {
    placeholder: string;
    label: string;
    onChangeText: (nextValue: string) => void;
}

const EmailComponent: React.FC<EmailFormProps> = ({ placeholder, label, onChangeText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChangeText}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
};

export default EmailComponent;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('1%'),
        width: wp('80%'),
    },
    input: {
        width: '100%',
        maxWidth: '100%',
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 8,
    },
});
