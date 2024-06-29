import React, { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TouchableOpacity, TextInput, Text, Modal, ActivityIndicator as Spinner } from 'react-native';

import { gs } from '@/style/globalStyles';
import { styles } from './MyProfile.styles';
import { SEDI, radioButtonSede } from '@/utils/constants';
import TextComponent from '../Commons/Text.component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const NotLoggedComponent: React.FC<{}> = ({ }) => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nameLogin, setNameLogin] = useState('');
    const [modalSuccessLoginVisible, setModalSuccessLoginVisible] = useState(false);
    const [modalErrorLoginVisible, setModalErrorLoginVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [selectedSede, setSelectedSede] = useState<string>("0");

    const radioButtonsData: RadioButtonProps[] = useMemo(() => (radioButtonSede), []);

    const onLoginPress = async () => {
        const selectedIndexSede = +(selectedSede ?? 0);
        setIsLoading(true);

        try {
            const response = await fetch(`https://www.libreriabonagura.it/micro/login.asp?libreria=${SEDI[selectedIndexSede]}&name=${username}&password=${password}`);
            const loginResponse = await response.json();

            if (loginResponse && loginResponse.data && loginResponse.data[0]) {
                const jsonValue = JSON.stringify(loginResponse.data[0]);

                try {
                    await Promise.all([
                        AsyncStorage.setItem('userData', jsonValue),
                        AsyncStorage.setItem('sedeSelezionata', SEDI[selectedIndexSede])
                    ]);

                    setNameLogin(loginResponse.data[0].nome);
                    setIsLoading(false);
                    setModalSuccessLoginVisible(true);
                } catch (e) {
                    console.log('userData', jsonValue);
                    console.log('sedeSelezionata', SEDI[selectedIndexSede]);
                    console.log('Error saving data:', e);
                    setIsLoading(false);
                    setModalErrorLoginVisible(true);
                }
            } else {
                console.log('Invalid login response:', loginResponse);
                setIsLoading(false);
                setModalErrorLoginVisible(true);
            }
        } catch (e) {
            console.log('Error handling login response:', e);
            setIsLoading(false);
            setModalErrorLoginVisible(true);
        }
    };



    return (
        <View style={styles.container}>
            {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
            <TextComponent style={styles.title}>Benvenuto nell'aria riservata di Cartolibreria Bonagura srl</TextComponent>
            <TextComponent style={styles.subTitle}>Se sei già cliente accedi</TextComponent>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email"
                />
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={{ ...styles.input, flex: 1 }}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Password"
                />
                <View style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 50,
                    marginLeft: 10,
                    marginBottom: 5
                }}>
                </View>
            </View>
            <View style={styles.radioContainer}>
                <TextComponent style={styles.text}>Seleziona sede</TextComponent>
                <RadioGroup
                    radioButtons={radioButtonsData}
                    onPress={setSelectedSede}
                    selectedId={selectedSede}
                    containerStyle={{ display: "flex", flexDirection: "row", width: wp("80%"), justifyContent: "space-between" }}
                />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
                <TextComponent style={styles.textButton}>Log In</TextComponent>
            </TouchableOpacity>
            <View style={styles.bottomLinks}>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('PaswordRecoveryView')}>
                    <TextComponent style={styles.textButton}>Hai dimenticato la password?</TextComponent>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('SignInView')}>
                    <TextComponent style={styles.textButton}>Non sei cliente?</TextComponent>
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalSuccessLoginVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalSuccessLoginVisible(false)}>
                <View style={gs.modalWrapper}>
                    <View style={gs.modalHeader}>
                        <TextComponent style={gs.modalHeaderText}>Login andata a buon fine.</TextComponent>
                    </View>
                    <View style={gs.modalBody}>
                        <TextComponent style={gs.modalBodyText}>Bentornato {nameLogin}</TextComponent>
                    </View>
                    <View style={gs.modalActionButtons}>
                        <TouchableOpacity
                            style={gs.modalActionBtnConfirm}
                            onPress={() => {
                                setModalSuccessLoginVisible(false);
                                router.replace("HomeView");
                            }}>
                            <TextComponent style={gs.modalActionBtnConfirmLabel}>VAI A HOME</TextComponent>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalErrorLoginVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalErrorLoginVisible(false)}>
                <View style={gs.modalWrapper}>
                    <View style={gs.modalHeader}>
                        <TextComponent style={gs.modalHeaderText}>Errore nella login.</TextComponent>
                    </View>
                    <View style={gs.modalBody}>
                        <TextComponent style={gs.modalBodyText}>Controlla Login, Password e sede.</TextComponent>
                        <TextComponent style={gs.modalBodyText}>Poi riprova</TextComponent>
                    </View>
                    <View style={gs.modalActionButtons}>
                        <TouchableOpacity
                            style={gs.modalActionBtnConfirm}
                            onPress={() => { setModalErrorLoginVisible(false); }}>
                            <TextComponent style={gs.modalActionBtnConfirmLabel}>CHIUDI</TextComponent>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
}


