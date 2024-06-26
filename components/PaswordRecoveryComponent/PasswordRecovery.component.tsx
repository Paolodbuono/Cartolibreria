import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { Button, Text, TextInput, View, ActivityIndicator as Spinner } from 'react-native';

import { styles } from "./PasswordRecovery.styles";
import { gs } from "@/style/globalStyles";
import TextComponent from "../Commons/Text.component";

const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const PaswordRecoveryComponent: React.FC<{}> = () => {
    const router = useRouter();


    const [emailAddress, setEmailAddress] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [errorLabel, setErrorLabel] = useState<string>("");

    const handleRecovery = () => {
        const isValid = validateEmail(emailAddress);

        console.log('Is valid', isValid);
        setShowError(!isValid);

        if (!isValid) {
            setErrorLabel("Inserisci un'e-mail valida");
            return;
        }

        if (isValid) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("emailrecupera", emailAddress);

            setShowSpinner(true);

            axios.post('https://www.libreriabonagura.it/micro/recupero.asp', urlencoded)
                .then((res) => {
                    setShowSpinner(false);
                    if (res.data && res.data.err === "" || !res.data) {
                        router.replace("HomeView");
                    } else {
                        setErrorLabel(res.data.err);
                        setShowError(true);
                    }
                });
        }
    };


    return (
        <>
            {showSpinner && <View style={gs.spinner} children={<Spinner size="large" />} />}

            <View style={styles.titleContainer}>
                <TextComponent style={styles.title}>
                    Recupera Password per accedere
                </TextComponent>
            </View>
            <View style={styles.subTitleContainer}>
                <TextComponent style={styles.subTitle}>
                    Inserisci il tuo indirizzo di posta elettronica,riceverai un'Email con la password per accedere ai nostri servizi
                </TextComponent>
            </View>
            <View style={styles.emailInputContainer}>
                <TextComponent style={styles.emailLabel}>
                    Email
                </TextComponent>
                <TextInput
                    style={styles.emailInput}
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Inserisci l'email"
                />
            </View>
            <View style={styles.bottomContainer}>
                <Button onPress={handleRecovery} title="Recupera" />
                {showError && (
                    <View style={styles.showErrorContainer}>
                        <TextComponent style={styles.showError}>
                            {errorLabel}
                        </TextComponent>
                    </View>
                )}
            </View>
        </>
    );
}


export default PaswordRecoveryComponent;
