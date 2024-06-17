import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { Button, Text, TextInput, View, ActivityIndicator as Spinner } from 'react-native';

import { styles } from "./PasswordRecovery.styles";
import { gs } from "@/style/globalStyles";

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
                <Text style={styles.title}>
                    Recupera Password per accedere
                </Text>
            </View>
            <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>
                    Inserisci il tuo indirizzo di posta elettronica,riceverai un'Email con la password per accedere ai nostri servizi
                </Text>
            </View>
            <View style={styles.emailInputContainer}>
                <Text style={styles.emailLabel}>
                    Email
                </Text>
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
                        <Text style={styles.showError}>
                            {errorLabel}
                        </Text>
                    </View>
                )}
            </View>
        </>
    );
}


export default PaswordRecoveryComponent;
