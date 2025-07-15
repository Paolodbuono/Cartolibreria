import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Button, Text, TextInput, View, ActivityIndicator as Spinner } from 'react-native';

import { styles } from "./PasswordRecovery.styles";
import TextComponent from "../Commons/Text.component";

const PaswordRecoveryComponent: React.FC<{}> = () => {
    const router = useRouter();

    return (
        <>

            <View style={styles.titleContainer}>
                <TextComponent style={styles.title}>
                    La password è il nome dell'alunno tutto in minuscolo
                </TextComponent>
            </View>
            <View style={styles.bottomContainer}>
                <Button onPress={() => router.replace("/SignInView")} title="Indietro" />
            </View>
        </>
    );
}


export default PaswordRecoveryComponent;
