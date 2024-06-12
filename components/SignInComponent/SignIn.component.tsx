import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, View, Alert, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Radio, Layout, Icon, Input, Button, Modal, Card, Spinner, CheckBox, RadioGroup } from '@ui-kitten/components';
import { Props } from './SignIn.types';
import { fields, SEDI } from './SignIn.utils';

// import { PRIVACY } from '../utils/constants';
// import CustomToolBar from '../components/customToolbar.component';
// import EmailForm from '../components/emailForm.component';

export const SigninScreen: React.FC<Props> = ({ navigation }) => {
    const childRef = useRef<any>();
    const values = useRef<string[]>([]);
    const [fieldsToRender, setFieldsToRender] = useState<JSX.Element[]>([]);
    const [checked, setChecked] = useState<boolean>(false);
    const [modalResponseVisibile, setModalResponseVisibile] = useState<boolean>(false);
    const [modalErrorVisibile, setModalErrorVisibile] = useState<boolean>(false);
    const [modalErrorText, setModalErrorText] = useState<string>("");
    const [modalText, setModalText] = useState<string>("");
    const [modalTextError, setModalTextError] = useState<string>("");
    const [sedeIndex, setSedeIndex] = useState<number>(0);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const styles = StyleSheet.create({
        container: {
            padding: 5
        },
        title: {
            fontSize: hp('2.6%'),
            textAlign: 'center',
            fontWeight: '500',
            marginTop: 10,
            color: '#EB5F19'
        },
        subTitle: {
            fontSize: hp('2.4%'),
            marginTop: 10,
            textAlign: 'center',
            fontWeight: '100',
            color: '#4975be'
        },
        containerForm: {
            marginTop: hp('1.5%'),
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        inputText: {
            width: '80%',
            maxWidth: '80%'
        },
        backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        radio: {
            margin: 2,
        },
        text: {
            fontSize: hp('1.8%'),
            color: '#4975be'
        },
    });

    const InfoIcon = (props: any) => (
        <Icon {...props} name='info-outline' />
    );

    const AlertIcon = (props: any) => (
        <Icon {...props} name='alert-circle-outline' />
    );

    const CalendarIcon = (props: any) => (
        <Icon {...props} name='calendar' />
    );

    useEffect(() => {
        const tempFields: JSX.Element[] = [];
        fields.forEach((element, index) => {
            if (element.type !== undefined) {
                switch (element.type) {
                    case 'date':
                        if (element.caption !== "") {
                            tempFields.push(
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxWidth: wp('80%') }} key={index}>
                                    <TextInput
                                        style={styles.inputText}
                                        value={values.current[index]}
                                        placeholder={element.placeholder}
                                        onChangeText={(nextValue) => {
                                            const newArray = [...values.current];
                                            newArray[index] = nextValue;
                                            values.current = newArray;
                                        }}
                                    />
                                    {/* <CalendarIcon /> */}
                                    {/* <Button size='small' style={{ marginLeft: wp('0.9%') }} accessoryLeft={InfoIcon} onPress={() => {
                                        Alert.alert('Perchè chiediamo la data di nascita', 'Questo campo è opzionale, viene chiesto solo per evitare casi di omonimia che ti possono creare problemi per la gestione della compravendita.');
                                    }} /> */}
                                </View>
                            );
                        } else {
                            // tempFields.push(
                            //     <TextInput
                            //         style={styles.inputText}
                            //         value={values.current[index]}
                            //         label={element.label}
                            //         accessoryRight={CalendarIcon}
                            //         size='large'
                            //         placeholder={element.placeholder}
                            //         onChangeText={(nextValue) => {
                            //             const newArray = [...values.current];
                            //             newArray[index] = nextValue;
                            //             values.current = newArray;
                            //         }}
                            //         key={index}
                            //     />
                            // );
                        }
                        break;
                    case 'email':
                        tempFields.push(
                            // <EmailForm
                            //     ref={childRef}
                            //     placeholder={element.placeholder}
                            //     label={element.label}
                            //     size='large'
                            //     autoCapitalize='none'
                            //     autoCorrect={false}
                            //     width='100%'
                            //     maxWidth='100%'
                            //     justifyContentParent='center'
                            //     alignItemsParent='center'
                            //     marginTopParent={hp('1%')}
                            //     widthParent={wp('80%')}
                            //     onChangeText={(nextValue: string) => {
                            //         const newArray = [...values.current];
                            //         newArray[index] = nextValue.trim();
                            //         values.current = newArray;
                            //     }}
                            //     key={index}
                            // />
                        );
                        break;
                    default:
                        break;
                }
            } else {
                if (element.caption !== "") {
                    // tempFields.push(
                    //     <TextInput
                    //         style={styles.inputText}
                    //         value={values.current[index]}
                    //         label={element.label}
                    //         size='large'
                    //         placeholder={element.placeholder}
                    //         caption={element.caption}
                    //         // captionIcon={AlertIcon}
                    //         onChangeText={(nextValue) => {
                    //             const newArray = [...values.current];
                    //             newArray[index] = nextValue;
                    //             values.current = newArray;
                    //         }}
                    //         key={index}
                    //     />
                    // );
                } else {
                    // tempFields.push(
                    //     <TextInput
                    //         style={styles.inputText}
                    //         value={values.current[index]}
                    //         label={element.label}
                    //         size='large'
                    //         placeholder={element.placeholder}
                    //         onChangeText={(nextValue) => {
                    //             const newArray = [...values.current];
                    //             newArray[index] = nextValue;
                    //             values.current = newArray;
                    //         }}
                    //         key={index}
                    //     />
                    // );
                }
            }
        });

        setFieldsToRender(tempFields);
    }, []);

    const checkEqualsPassword = (): boolean => {
        let toReturn = false;
        let password: string | undefined = undefined;
        let password2: string | undefined = undefined;

        fields.forEach((element, index) => {
            if (element.formName === 'password') {
                password = values.current[index];
            } else if (element.formName === 'password2') {
                password2 = values.current[index];
            }
        });

        if (password && password2) {
            toReturn = password === password2;
        }
        return toReturn;
    }

    const controlFields = (): boolean => {
        let toReturn = false;
        if (checkEqualsPassword()) {
            values.current.forEach((value) => {
                if (value && value !== '') {
                    toReturn = true;
                } else {
                    toReturn = false;
                }
            });
        }
        return toReturn;
    }

    const handleSubmit = async () => {
        // if (controlFields() && checked) {
        //     const toSend: { [key: string]: string } = { sede: SEDI[sedeIndex] };
        //     fields.forEach((element, index) => {
        //         toSend[element.formName] = values.current[index];
        //     });

        //     try {
        //         setShowSpinner(true);
        //         const response = await axios.post('http://centrounid.com:3000/signup', toSend);
        //         if (response.data && response.data.status === 'ok') {
        //             setModalText(response.data.response);
        //             setModalResponseVisibile(true);
        //             setTimeout(() => {
        //                 navigation.navigate('Login');
        //             }, 5000);
        //         } else {
        //             setModalTextError(response.data.response);
        //             setModalErrorVisibile(true);
        //         }
        //         setShowSpinner(false);
        //     } catch (error) {
        //         setShowSpinner(false);
        //         setModalTextError('Errore durante la richiesta di registrazione, riprova piú tardi.');
        //         setModalErrorVisibile(true);
        //     }
        // } else if (!controlFields()) {
        //     setModalTextError('Alcuni campi obbligatori non sono stati compilati correttamente.');
        //     setModalErrorVisibile(true);
        // } else if (!checked) {
        //     setModalTextError('Non hai accettato la privacy policy');
        //     setModalErrorVisibile(true);
        // }
    }

    return (
        <SafeAreaView>
            {/* <CustomToolBar navigation={navigation} title='Registrazione' /> */}
            <KeyboardAwareScrollView>
                <View style={styles.containerForm}>
                    <Text style={styles.title}>Modulo di registrazione</Text>
                    <Text style={styles.subTitle}>I seguenti campi sono tutti obbligatori</Text>
                    {fieldsToRender}
                </View>
                {/* <View style={styles.containerForm}>
                        
                        <Text style={styles.text}>Selezionare sede alla quale si vuole registrare</Text>
                        <RadioGroup
                            selectedIndex={sedeIndex}
                            onChange={index => setSedeIndex(index)}
                            style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginTop: 10 }}>
                            <Radio style={styles.radio} status='warning'>Poggiomarino</Radio>
                            <Radio style={styles.radio} status='warning'>Pompei</Radio>
                        </RadioGroup>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxWidth: wp('80%') }}>
                            <CheckBox checked={checked} onChange={(nextChecked) => setChecked(nextChecked)}>
                                <Text style={styles.text}>Accetta privacy policy </Text>
                            </CheckBox>
                            <Button size='small' style={{ marginLeft: wp('0.9%') }} accessoryLeft={InfoIcon} onPress={() => {
                                // Alert.alert('Privacy policy', PRIVACY);
                            }} />
                        </View>
                        <Button onPress={handleSubmit} style={{ marginTop: hp('1.5%'), backgroundColor: '#4975be', borderColor: '#4975be' }}>Invia</Button>
                        <Modal
                            visible={modalResponseVisibile}
                            backdropStyle={styles.backdrop}
                            onBackdropPress={() => setModalResponseVisibile(false)}>
                            <Card disabled={true}>
                                <Text>{modalText}</Text>
                                <Button onPress={() => setModalResponseVisibile(false)}>
                                    Chiudi
                                </Button>
                            </Card>
                        </Modal>
                        <Modal
                            visible={modalErrorVisibile}
                            backdropStyle={styles.backdrop}
                            onBackdropPress={() => setModalErrorVisibile(false)}>
                            <Card disabled={true}>
                                <Text>{modalTextError}</Text>
                                <Button onPress={() => setModalErrorVisibile(false)}>
                                    Chiudi
                                </Button>
                            </Card>
                        </Modal>
                        <Modal
                            visible={showSpinner}
                            backdropStyle={styles.backdrop}>
                            <Card disabled={true}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ marginRight: wp('2%') }}>Caricamento in corso</Text>
                                    <Spinner size='small' />
                                </View>
                            </Card>
                        </Modal>
                    </View> */}
            </KeyboardAwareScrollView>
            Sign In Component
        </SafeAreaView>
    )
};
