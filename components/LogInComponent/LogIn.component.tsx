import React, { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, TouchableOpacity, TextInput, Text, Modal, ActivityIndicator as Spinner } from 'react-native';

import { useRouter } from 'expo-router';
import { styles } from './LogIn.styles';

import CustomButtonComponent from '../ButtonsComponent/CustomButton.component';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

export const LogInComponent: React.FC<{}> = ({ }) => {

    const router = useRouter();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nameLogin, setNameLogin] = useState('');
    const [modalSuccessLoginVisible, setModalSuccessLoginVisible] = useState(false);
    const [modalErrorLoginVisible, setModalErrorLoginVisible] = useState(false);

    const [isLogged, setIsLogged] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [userLogged, setUserLogged] = useState();
    const [showSpinnerDuringLogin, setShowSpinnerDuringLogin] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(false);

    const SEDI = ['poggiomarino', 'pompei'];

    const [selectedSede, setSelectedSede] = useState<string | undefined>();


    const radioButtonsData: RadioButtonProps[] = useMemo(() => ([
        { id: '1', label: 'Poggiomarino', value: 'Poggiomarino' },
        { id: '2', label: 'Pompei', value: 'Pompei' }
    ]), []);

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    setShowSpinner(false);
                    setNameLogin(JSON.parse(value).nome);
                    setUserLogged(JSON.parse(value));
                    setIsLogged(true);
                } else {
                    setShowSpinner(false);
                    setIsLogged(false);
                }
            } catch (e) {
                console.log('Error fetching data from AsyncStorage:', e);
            }
        };

        getData();
    }, []);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const login = () => {
        setShowSpinnerDuringLogin(true);
        fetch(`https://www.libreriabonagura.it/micro/login.asp?libreria=${SEDI[selectedIndex]}&name=${username}&password=${password}`)
            .then((res) => res.json())
            .then((loginResponse) => {
                if (loginResponse && loginResponse.data && loginResponse.data[0]) {
                    try {
                        const jsonValue = JSON.stringify(loginResponse.data[0]);
                        const arraySaveStorege = [
                            AsyncStorage.setItem('userData', jsonValue),
                            AsyncStorage.setItem('sedeSelezionata', SEDI[selectedIndex])
                        ];

                        Promise.all(arraySaveStorege)
                            .then(() => {
                                setNameLogin(loginResponse.data[0].nome);
                                setShowSpinnerDuringLogin(false);
                                setModalSuccessLoginVisible(true);
                            })
                            .catch((e) => {
                                console.log('Error saving data:', e);
                                setShowSpinnerDuringLogin(false);
                                setModalErrorLoginVisible(true);
                            });
                    } catch (e) {
                        console.log('Error handling login response:', e);
                        setShowSpinnerDuringLogin(false);
                        setModalErrorLoginVisible(true);
                    }
                } else {
                    console.log('Invalid login response:', loginResponse);
                    setShowSpinnerDuringLogin(false);
                    setModalErrorLoginVisible(true);
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                setShowSpinnerDuringLogin(false);
                setModalErrorLoginVisible(true);
            });
    };

    const renderNotLoggedScreen = () => (
        <View style={styles.container}>
            <Modal
                visible={modalSuccessLoginVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalSuccessLoginVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Login andata a buon fine.</Text>
                        <Text>Bentornato {nameLogin}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalSuccessLoginVisible(false);
                                router.replace("HomeView");
                            }}>
                            <Text>VAI A HOME</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalErrorLoginVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalErrorLoginVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Errore nella login</Text>
                        <Text>Controlla Login, Password e sede. Poi riprova</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { setModalErrorLoginVisible(false); }}>
                            <Text>CHIUDI</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View>
                {showSpinnerDuringLogin && <View style={{
                    height: hp("100%"),
                    width: wp("100%"),
                    display: "flex",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Spinner size="large" />
                </View>}
                <Text style={styles.title}>Benvenuto nell'aria riservata di Cartolibreria Bonagura srl</Text>
                <Text style={styles.subTitle}>Se sei già cliente accedi</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Login"
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={secureTextEntry}
                            placeholder="Password"
                        />
                        <CustomButtonComponent onPress={toggleSecureEntry} icon={secureTextEntry ? "eye" : "closedEye"} />
                    </View>
                </View>
                <View style={styles.radioContainer}>
                    <Text style={styles.text}>Seleziona sede</Text>
                    <RadioGroup
                        radioButtons={radioButtonsData}
                        onPress={setSelectedSede}
                        selectedId={selectedSede}
                        containerStyle={{ display: "flex", flexDirection: "row" }}
                    />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={login}>
                    <Text style={styles.textButton}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.bottomLinks}>
                    <TouchableOpacity onPress={() => router.push('PaswordRecoveryView')}>
                        <Text style={styles.textButton}>Hai dimenticato la password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('SignInView')}>
                        <Text style={styles.textButton}>Non sei cliente?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return renderNotLoggedScreen();
}

export default LogInComponent;
