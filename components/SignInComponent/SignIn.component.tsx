import React, { useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Alert, Text, Button, TouchableOpacity, Modal, ActivityIndicator as Spinner } from 'react-native';

import FormFields from './FormField.component';
import { fields, PRIVACY } from './SignIn.utils';

import { gs } from '@/style/globalStyles';
import { SEDI, radioButtonSede } from '@/utils/constants';
import { styles } from './SignIn.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const SignInComponent: React.FC<{}> = () => {
    const formValues = useRef<string[]>([]);
    const router = useRouter();

    const [checked, setChecked] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedSede, setSelectedSede] = useState<string | undefined>();
    const [modalErrorVisibile, setModalErrorVisibile] = useState<boolean>(false);
    const [modalResponseText, setModalResponseText] = useState<string>("");
    const [modalResponseVisible, setModalResponseVisible] = useState<boolean>(false);

    const radioButtonsData: RadioButtonProps[] = useMemo(() => (radioButtonSede), []);

    const isEqualPasswords = () => {
        const password = formValues.current[fields.findIndex(field => field.formName === 'password')];
        const password2 = formValues.current[fields.findIndex(field => field.formName === 'password2')];

        return password && password2 && password === password2;
    };

    const isValidEmail = () => {
        let toReturn = false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        fields.forEach((field, index) => {
            if (field.formName === 'email') {
                toReturn = formValues.current[index] !== undefined && emailRegex.test(formValues.current[index]);
            }
        })

        return toReturn;
    }

    const allFieldsRequiredExsist = () => {
        let toReturn = true;
        fields.forEach((field, index) => {
            if (field.formName !== 'email' && field.formName !== 'password' && field.formName !== 'password2' && field.formName !== 'date') {
                if (!(formValues.current[index] !== undefined && formValues.current[index] !== '')) {
                    toReturn = false;
                }
            }
        })

        return toReturn;
    }

    const controlFields = (): boolean => {
        if (!isEqualPasswords()) return false;

        let toReturn = true;
        fields.forEach((field, index) => {
            if (field.formName !== 'email' && field.formName !== 'password' && field.formName !== 'password2' && field.formName !== 'date') {
                if (!(formValues.current[index] !== undefined && formValues.current[index] !== '')) {
                    toReturn = false;
                }
            }
        })

        return toReturn;
    }

    const handleSubmit = async () => {
        if (!isValidEmail()) {
            console.log('Attenzione mail non valida')
            setModalText('Per poterti registrare devi inserire un\' indirizzo email valido!');
            setModalErrorVisibile(true)
            return;
        }
        if (!isEqualPasswords()) {
            console.log('Attenzione password non corrispondono !!!')
            setModalText('Password e Conferma Password non corrispondono, per poterti registrare devono essere uguali!');
            setModalErrorVisibile(true)
            return;
        }
        if (!allFieldsRequiredExsist()) {
            console.log('Attenzione alcuni campi richiesti non ci sono !!!')
            setModalText('Alcuni campi sono vuoti, controllare che tutti i campi richiesti siamo valorizzati!');
            setModalErrorVisibile(true)
            return;
        }

        if (!checked) {
            setModalText('Non hai accettato la privacy policy');
            setModalErrorVisibile(true);
            return;
        }

        if (!controlFields()) {
            setModalText('Alcuni campi obbligatori non sono stati compilati correttamente.');
            setModalErrorVisibile(true);
            return;
        }

        signInRequest(); // faccio la richiesta post per registrarmi
    }

    const signInRequest = () => {
        const urlencoded = new URLSearchParams();
        console.log('Dati di invio ------>', formValues.current);
        let date = undefined;
        let cell = undefined;
        fields.forEach((field, index) => {
            if (field.formName === 'nome') {
                urlencoded.append(field.formName, formValues.current[index]);
                setModalText(formValues.current[index])
            } else if (field.formName === 'date') {
                date = formValues.current[index];
            } else if (field.formName === 'cellulare') {
                cell = formValues.current[index];
                urlencoded.append(field.formName, formValues.current[index]);
            } else {
                urlencoded.append(field.formName, formValues.current[index]);
            }
        })

        if (date !== undefined) {
            urlencoded.append("uniqueId", date);
        } else {
            urlencoded.append("uniqueId", cell ?? "");
        }

        urlencoded.append("azienda", "");
        urlencoded.append("telefono", "");
        urlencoded.append("telefono2", "");
        urlencoded.append("sitoweb", "");
        urlencoded.append("partitaiva", "");
        urlencoded.append("codfisc", "");
        urlencoded.append("note", "");
        urlencoded.append("newsletter", "si");
        urlencoded.append("desiderofattura", "si");
        urlencoded.append("tipo", "");
        urlencoded.append("scuola", "");
        urlencoded.append("nazione", "Italia");
        urlencoded.append("codicesegreto", "");
        urlencoded.append("privacy", "on");
        urlencoded.append("inviadati.x", "83");
        urlencoded.append("inviadati.y", "0");

        console.log('URL encoded --->', urlencoded)
        setIsLoading(true);
        const indexSede: number = +(selectedSede ?? 0);
        axios.post('https://www.libreriabonagura.it/micro/registrazione_.asp?libreria=' + SEDI[indexSede], urlencoded)
            .then((res) => {
                setIsLoading(false);
                console.log('Risposta ----->', res.data)
                if (res.data.Status === "ok") {
                    setModalResponseText("")
                    setModalResponseVisible(true)
                } else if (res.data.Error) {
                    setModalResponseText(res.data.Error)
                    setModalResponseVisible(true)
                } else {
                    setModalResponseText('Errore generico!')
                    setModalResponseVisible(true)
                }
            })
    }

    const trattamentoDeiDatiAlert = () => Alert.alert('Condizioni trattamento dei dati', PRIVACY, [{ text: 'Ok', style: 'cancel' }]);

    const handleOnClickResponseModal = () => {
        if (modalResponseText) setModalResponseVisible(false);
        else {
            router.replace("HomeView"); // redirectToHome
        }
    }
    return (
        <View>
            <KeyboardAwareScrollView>
                {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
                {!isLoading && <>
                    <View style={styles.containerForm}>
                        <Text style={styles.title}>Modulo di registrazione</Text>
                        <Text style={styles.text}>I seguenti campi sono tutti obbligatori</Text>
                        <FormFields formValues={formValues} />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.text}>Selezionare sede alla quale si vuole registrare</Text>
                        <RadioGroup
                            radioButtons={radioButtonsData}
                            onPress={setSelectedSede}
                            selectedId={selectedSede}
                            containerStyle={{ display: "flex", flexDirection: "row" }}
                        />
                        <View style={styles.section}>
                            <Checkbox
                                style={styles.checkbox}
                                value={checked}
                                onValueChange={setChecked}
                                color={checked ? '#4630EB' : undefined}
                            />
                            <Text style={{ fontSize: hp('1.8%'), color: '#4975be' }}>Accetta il trattamento dei dati  </Text>
                            <TouchableOpacity
                                style={{
                                    paddingTop: 5,
                                    paddingRight: 13,
                                    paddingLeft: 13,
                                    paddingBottom: 5,
                                    backgroundColor: '#007bff',
                                    borderRadius: 100,
                                }}
                                onPress={trattamentoDeiDatiAlert}>
                                <Text>i</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleSubmit} style={styles.sendBtn}>
                            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Registrati</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType='slide'
                            visible={modalErrorVisibile}
                            transparent={true}
                            onRequestClose={() => setModalErrorVisibile(false)}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>{modalText}</Text>
                                    <Button title="Chiudi" onPress={() => setModalErrorVisibile(false)} />
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType='slide'
                            visible={modalResponseVisible}
                            transparent={true}
                            onRequestClose={() => setModalResponseVisible(false)}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    {modalResponseText === "" && <>
                                        <Text>Registrazione avvenuta con successo.</Text>
                                        <Text>Benvenuto in Cartolibreria Bonagura {modalText}</Text>
                                    </>}
                                    {modalResponseText && <View>
                                        <Text style={styles.modalText}>Errore nella registrazione</Text>
                                        <Text>{modalResponseText}</Text>
                                    </View>}
                                    <Button title={modalResponseText ? "Riprova" : "Vai a Home"} onPress={handleOnClickResponseModal} />
                                </View>
                            </View>
                        </Modal>
                    </View>
                </>
                }
            </KeyboardAwareScrollView>

        </View>
    )
};

export default SignInComponent;