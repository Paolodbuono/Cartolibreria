import React from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { fields } from './SignIn.utils';
import TextComponent from '../Commons/Text.component';

interface Field {
    label: string;
    placeholder: string;
    type?: string;
    caption?: string;
}

interface Props {
    formValues: React.MutableRefObject<string[]>
}

const FormFields: React.FC<Props> = ({ formValues }) => {
    const handleOnChangeText = (nextValue: string, index: number) => {
        const newArray = [...formValues.current];
        newArray[index] = nextValue.trim();
        formValues.current = newArray;
    };

    const infoAlert = () =>
        Alert.alert(
            'Perché chiediamo la data di nascita?',
            'Questo campo è opzionale, viene chiesto solo per evitare casi di omonimia che ti possono creare problemi per la gestione della compravendita.',
            [{ text: 'Ok', style: 'cancel', },],
        );

    const renderField = (element: Field, index: number) => {
        return (
            <View style={styles.container} key={index}>
                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={element.placeholder}
                        onChangeText={(val) => handleOnChangeText(val, index)}
                        autoCapitalize={element.type === "email" ? "none" : "words"}
                        autoCorrect={element.type === "email" ? false : true}
                    />
                    {element.type === "date" && (
                        <TouchableOpacity
                            style={{
                                paddingTop: 5,
                                paddingRight: 13,
                                paddingLeft: 13,
                                paddingBottom: 5,
                                backgroundColor: '#007bff',
                                borderRadius: 100,
                            }}
                            onPress={infoAlert}>
                            <TextComponent>i</TextComponent>
                        </TouchableOpacity>
                    )}
                </View>
                {element.caption && <TextComponent style={styles.caption}>{element.caption}</TextComponent>}
            </View>
        );
    };



    return (
        <>
            {fields.map((element, index) => renderField(element, index))}
        </>
    );
};

export default FormFields;

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        marginBottom: 10, // Aggiunta margin inferiore per separare i campi
    },
    inputText: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginRight: 5, // Aggiunto margine destro per separare l'icona dal campo di input
        paddingVertical: 5,
        width: wp('80%'),
        fontSize: 16,
    },
    caption: {
        fontSize: 12,
        fontStyle: 'italic',
        color: 'gray',
    },
});
