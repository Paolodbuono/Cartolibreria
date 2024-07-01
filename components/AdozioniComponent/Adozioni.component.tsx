import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Text, Button, Modal, ActivityIndicator, ActivityIndicator as Spinner, TouchableOpacity, } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { gs } from '@/style/globalStyles';
import TextComponent from '../Commons/Text.component';
import { md } from '@/constants/FontSize';

export const AdozioniComponent = ({ }) => {
    const [nextButtonFirstStepEnabled, setNextButtonFirstStepEnabled] = useState(true);
    const [nextButtonSecondStepEnabled, setNextButtonSecondStepEnabled] = useState(true);
    const [sedeSelezionata, setSede] = useState('');
    const [showLoadingArea, setShowLoadingArea] = useState(false);
    const [showLoadingSchool, setShowLoadingShool] = useState(false);
    const [showLoadingOtherInfo, setShowLoadingOtherInfo] = useState(false);
    const [showLoadingBooks, setShowLoadingBooks] = useState(false);
    const [selectedIndexShool, setSelectedIndexSchool] = useState(0);
    const [selectedIndexCourse, setSelectedIndexCourse] = useState(0);
    const [selectedIndexSection, setSelectedIndexSection] = useState(0);
    const [selectedIndexClass, setSelectedIndexClass] = useState(0);
    const [areasNames, setAreasNames] = useState([]);
    const [areas, setAreas] = useState([]);
    const [schoolsNames, setSchoolsNames] = useState([]);
    const [schoolsIds, setSchoolsIds] = useState([]);
    const [courses, setCourses] = useState([]);
    const [coursesName, setCoursesName] = useState([]);
    const [sectionsName, setSectionsName] = useState([]);
    const [classes, setClasses] = useState([]);
    const [classesName, setClassesName] = useState([]);
    const [books, setBooks] = useState([]);
    const [modalScuolaNonPresente, setModalScuolaNonPresente] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [lockSede, setLockSede] = useState(false);
    const [modalSuccessAddToCartVisibile, setModalSuccessAddToCartVisibile] = useState(false);
    const [modalErrorUtenteNonLoggato, setModalErrorUtenteNonLoggato] = useState(false);
    const [showModalMoreInfo, setShowModalMoreInfo] = useState(false);
    const [moreInfoBook, setMoreInfoBook] = useState<{ titolo?: string }>({});
    const [selectedIndexArea, setSelectedIndexArea] = useState(0);

    const SEDI = ['poggiomarino', 'pompei'];

    useEffect(() => {
        Promise.all([
            AsyncStorage.getItem('userData'),
            AsyncStorage.getItem('sedeSelezionata')
        ])
            .then((res: any) => {
                const [userData, sedeSelezionata] = res;
                if (userData) {
                    setCurrentUser(JSON.parse(userData));
                }
                if (SEDI[0] === sedeSelezionata || SEDI[1] === sedeSelezionata) {
                    setSede(sedeSelezionata);
                    setNextButtonFirstStepEnabled(false);
                    setLockSede(true);
                }
                setIsLoading(false);
            });
    }, []);

    const selectSedePompei = () => {
        setSede(SEDI[1]);
        setNextButtonFirstStepEnabled(false);
    };

    const selectSedePoggiomarino = () => {
        setSede(SEDI[0]);
        setNextButtonFirstStepEnabled(false);
    };

    const onNextFirstStep = () => {
        setShowLoadingArea(true);
        fetch('https://www.libreriabonagura.it/micro/getAreas.asp?libreria=' + sedeSelezionata, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((areas) => {
                const tempAreas = [];
                const tempAreasName = [];
                areas.data.forEach(area => {
                    tempAreasName.push(area.scucitta)
                    tempAreas.push(<Picker.Item key={area.scucitta} label={area.scucittal} value={area.scucittal} />)
                });
                setAreasNames(tempAreasName);
                setAreas(tempAreas);
                setShowLoadingArea(false);
                loadShoolsFromArea(tempAreasName[0]);
            })
            .catch((e) => console.log('errore richiesta area !!!!!!!!!', e));
    };

    const loadShoolsFromArea = (areaName = null) => {
        if (areaName !== null) {
            setNextButtonSecondStepEnabled(true);
            setShowLoadingShool(true);
            fetch('https://www.libreriabonagura.it/micro/getSchools.asp?libreria=' + sedeSelezionata + '&area=' + areaName)
                .then((res) => res.json())
                .then((schools) => {
                    const tempSchoolsName = schools.data.map(school => school.scuolacit.replace('\"', ''));
                    const tempoSchoolsIds = schools.data.map(school => school.id);
                    setSchoolsNames(tempSchoolsName);
                    setSchoolsIds(tempoSchoolsIds);
                    setShowLoadingShool(false);
                    loadInfoSchoolFromId(tempoSchoolsIds[0]);
                });
        }
    };

    const loadInfoSchoolFromId = (id) => {
        setShowLoadingOtherInfo(true);
        setNextButtonSecondStepEnabled(true);
        const urls = [
            fetch('https://www.libreriabonagura.it/micro/getCourses.asp?libreria=' + sedeSelezionata + '&school=' + id),
            fetch('https://www.libreriabonagura.it/micro/getSections.asp?libreria=' + sedeSelezionata + '&school=' + id),
            fetch('https://www.libreriabonagura.it/micro/getClasses.asp?libreria=' + sedeSelezionata + '&school=' + id)
        ];

        Promise.all(urls)
            .then((resRaw) => Promise.all(resRaw.map(r => r.json())))
            .then((responseTotal) => {
                responseTotal.forEach((response, index) => {
                    switch (index) {
                        case 0:
                            setCoursesName(response.data.map(course => course.tipo));
                            break;
                        case 1:
                            setSectionsName(response.data);
                            break;
                        case 2:
                            setClassesName(response.data.map(singleClass => singleClass.classe));
                            break;
                        default:
                            break;
                    }
                });
                setShowLoadingOtherInfo(false);
                setNextButtonSecondStepEnabled(false);
            });
    };

    const onNextSecondStep = () => {
        setShowLoadingBooks(true);
        fetch('https://www.libreriabonagura.it/micro/getBooks.asp?libreria=' + sedeSelezionata + '&school=' + schoolsIds[selectedIndexShool - 1] + '&type=' + encodeURIComponent(coursesName[(selectedIndexCourse - 1)]) + '&class=' + classesName[(selectedIndexClass - 1)] + '&section=' + sectionsName[(selectedIndexSection - 1)])
            .then((res) => res.json())
            .then((books) => {
                setBooks(books.data);
                setShowLoadingBooks(false);
            });
    };

    const getPrezzoUsato = (prezzoNuovo) => {
        const price = parseFloat(prezzoNuovo);
        const sconto = (price * 35) / 100;
        return (prezzoNuovo - sconto).toFixed(2) + " €";
    };

    const renderBooks = (info) => {
        return (
            <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', height: hp('20%'), marginTop: 10 }}>
                <Image style={{ height: '100%', width: '20%', flex: 1 }} source={{ uri: `https://www.libreriabonagura.it/${info.item.url}` }} />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 2 }}>
                    <Text>{info.item.titolo}</Text>
                    <Text>{info.item.autore}</Text>
                    <Text>{info.item.prezzo.toFixed(2)}€</Text>
                    <Text>{getPrezzoUsato(info.item.prezzo)}</Text>
                    <Button title="Dettagli" onPress={() => { setMoreInfoBook(info.item); setShowModalMoreInfo(true); }} />
                </View>
                <Button title="Aggiungi" onPress={() => addBookToCart(info.item)} />
            </View>
        );
    };

    const addBookToCart = (book) => {
        if (currentUser === undefined || currentUser === null) {
            setModalErrorUtenteNonLoggato(true);
            return;
        }

        const payload = {
            user: currentUser.id,
            sede: sedeSelezionata,
            book: book.id,
            quantity: 1
        };

        fetch('https://www.libreriabonagura.it/micro/addToCart.asp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status === 'success') {
                    setModalSuccessAddToCartVisibile(true);
                } else {
                    setModalErrorUtenteNonLoggato(true);
                }
            });
    };

    const onPaymentStepComplete = () => {
        if (books.length === 0) {
            return;
        }
        navigation.navigate("Cart");
    };

    if (isLoading) return <View style={gs.spinner} children={<Spinner size="large" />} />;


    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <ProgressSteps>
                <ProgressStep label="Primo passo" nextBtnDisabled={nextButtonFirstStepEnabled} onNext={onNextFirstStep} nextBtnText="Successivo">
                    <View >
                        {!lockSede && <TextComponent style={{ fontSize: md }}>Seleziona una delle nostre sedi:</TextComponent>}
                        {lockSede && <TextComponent style={{ fontSize: md }}>Puoi consultare e acquistare libri, solo presso la sede in cui sei registrato !</TextComponent>}

                        <TouchableOpacity onPress={selectSedePompei} disabled={lockSede && sedeSelezionata === SEDI[0]}>
                            <View
                                style={{
                                    marginTop: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: "center",
                                    backgroundColor: sedeSelezionata === SEDI[1] ? '#FC7307' : '#ffffff',
                                    width: 225,
                                    height: 175,
                                }}
                            >
                                <Image
                                    style={{ width: 175, height: 125 }}
                                    source={require('@/assets/images/sedePompei.jpg')}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={selectSedePoggiomarino} disabled={lockSede && sedeSelezionata === SEDI[1]}>
                            <View
                                style={{
                                    marginTop: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: "center",
                                    backgroundColor: sedeSelezionata === SEDI[0] ? '#FC7307' : '#ffffff',
                                    width: 225,
                                    height: 175,
                                }}
                            >
                                <Image
                                    style={{ width: 175, height: 125 }}
                                    source={require('@/assets/images/sedePoggiomarino.png')}
                                />
                            </View>
                        </TouchableOpacity>
                        {showLoadingArea && <ActivityIndicator size="large" />}
                    </View>
                </ProgressStep>
                <ProgressStep label="Secondo Passo" nextBtnDisabled={nextButtonSecondStepEnabled} onNext={onNextSecondStep} nextBtnText="Cerca" previousBtnText="Indietro">
                    <View>
                        <Text >Selezionare una città:</Text>
                        {showLoadingSchool && <ActivityIndicator size="large" />}
                        {!showLoadingSchool && <>
                            <Picker
                                selectedValue={selectedIndexArea}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    loadShoolsFromArea(areasNames[itemIndex]);
                                    setSelectedIndexArea(itemIndex);
                                }}>
                                {areas}
                            </Picker>
                        </>}
                    </View>
                    <View>
                        <Text>Seleziona scuola, corso, sezione, classe</Text>
                        {showLoadingOtherInfo && <Picker
                            selectedValue={selectedIndexArea}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => {
                                loadShoolsFromArea(areasNames[itemIndex]);
                                setSelectedIndexArea(itemIndex);
                            }}>
                            {areas}
                        </Picker>}
                    </View>
                </ProgressStep>
                <ProgressStep label="Step 4" onSubmit={onPaymentStepComplete}>
                    <View>
                        <Text>Libri</Text>
                        {books.map(book => renderBooks({ item: book }))}
                        {showLoadingBooks && <ActivityIndicator size="large" />}
                    </View>
                </ProgressStep>
            </ProgressSteps>
            <Modal visible={showModalMoreInfo} transparent={true}>
                <View>
                    <Text>{moreInfoBook.titolo}</Text>
                    <Button title="Close" onPress={() => setShowModalMoreInfo(false)} />
                </View>
            </Modal>
            <Modal visible={modalSuccessAddToCartVisibile} transparent={true}>
                <View>
                    <Text>Libro aggiunto al carrello!</Text>
                    <Button title="Close" onPress={() => setModalSuccessAddToCartVisibile(false)} />
                </View>
            </Modal>
            <Modal visible={modalErrorUtenteNonLoggato} transparent={true}>
                <View>
                    <Text>Errore! Utente non loggato.</Text>
                    <Button title="Close" onPress={() => setModalErrorUtenteNonLoggato(false)} />
                </View>
            </Modal>

        </SafeAreaView>
    );
};
