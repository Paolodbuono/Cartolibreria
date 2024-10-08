import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Text, ActivityIndicator as Spinner, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { gs } from '@/style/globalStyles';
import TextComponent from '../Commons/Text.component';
import { bg, md } from '@/constants/FontSize';
import { SEDI } from '@/utils/constants';
import { styles } from './Adozioni.styles';
import { CustomProgressStep } from './CustomProgressStep';
import { CustomProgressSteps } from './CustomProgressSteps';

export const AdozioniComponent = ({ }) => {
    const [nextButtonFirstStepEnabled, setNextButtonFirstStepEnabled] = useState(true);

    const [sedeSelezionata, setSede] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCitta, setIsLoadingCitta] = useState(true);
    const [isLoadingScuole, setIsLoadingScuole] = useState(true);
    const [isLoadingOtherInfo, setIsLoadingOtherInfo] = useState(true);

    const [showLoadingBooks, setShowLoadingBooks] = useState(true);

    const [selectedIdxScuola, setSelectedIdxScuola] = useState(0);
    const [selectedIdxCorso, setSelectedIdxCorso] = useState(0);
    const [selectedIdxSezione, setSelectedIdxSezione] = useState(0);
    const [selectedIdxClasse, setSelectedIdxClasse] = useState(0);

    const [nomiCittaPickerItem, setNomiCittaPickerItem] = useState<Array<any>>([]);
    const [nomiScuolePickerItem, setNomiScuolePickerItem] = useState<Array<any>>([]);
    const [corsiPickerItem, setCorsiPickerItem] = useState<Array<any>>([]);
    const [sezioniPickerItem, setSezioniPickerItem] = useState<Array<any>>([]);
    const [classiPickerItem, setClassiPickerItem] = useState<Array<any>>([]);

    const [schoolsIds, setSchoolsIds] = useState([]);

    const [coursesName, setCoursesName] = useState([]);
    const [sectionsName, setSectionsName] = useState([]);
    const [classesName, setClassesName] = useState([]);

    const [books, setBooks] = useState([]);
    const [lockSede, setLockSede] = useState(false);
    const [selectedCitta, setSelectedCitta] = useState();
    const [selectedScuola, setSelectedScuola] = useState();

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const sedeSelezionata = await AsyncStorage.getItem('sedeSelezionata')

            if (SEDI[0] === sedeSelezionata || SEDI[1] === sedeSelezionata) {
                setSede(sedeSelezionata);
                setNextButtonFirstStepEnabled(false);
                setLockSede(true);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchAreasAndSetState = async () => {
        try {
            setIsLoadingCitta(true);
            setIsLoadingScuole(true);
            setIsLoadingOtherInfo(true);

            const response = await fetch(`https://www.libreriabonagura.it/micro/getAreas.asp?libreria=${sedeSelezionata}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const areasData: { "data": Array<{ "scucitta": string }> } = await response.json();

            const tempCitta: Array<any> = [];
            const tempAreasName: Array<string> = [];


            areasData.data.forEach(area => {
                tempAreasName.push(area["scucitta"]);
                tempCitta.push(<Picker.Item key={area["scucitta"]} label={area["scucitta"]} value={area["scucitta"]} />);
            });

            setNomiCittaPickerItem(tempCitta);
            fetchSchoolsFromCitta(tempAreasName[0]);
            setIsLoadingCitta(false);
        } catch (error) {
            console.error('Errore durante la richiesta delle aree:', error);
        }
    };

    const fetchBooksAndSetState = async () => {
        try {
            setShowLoadingBooks(true);

            const url = `https://www.libreriabonagura.it/micro/getBooks.asp?libreria=${sedeSelezionata}&school=${schoolsIds[selectedIdxScuola ?? 0]}&type=${encodeURIComponent(coursesName[selectedIdxCorso])}&class=${classesName[selectedIdxClasse]}&section=${sectionsName[selectedIdxSezione]}`;
            const response = await fetch(url);
            const booksData = await response.json();

            setBooks(booksData.data);
            setShowLoadingBooks(false);
        } catch (error) {
            console.error('Errore durante la richiesta dei libri:', error);
        }
    };

    const fetchSchoolsFromCitta = async (citta: string) => {
        try {
            setIsLoadingScuole(true);
            setIsLoadingOtherInfo(true);

            if (citta !== null) {
                const response = await fetch(`https://www.libreriabonagura.it/micro/getSchools.asp?libreria=${sedeSelezionata}&area=${citta}`);
                const schoolsData: { data: Array<{ id: number; nome: string, scuolacit: string }> } = await response.json();

                const tempSchoolsName: { id: number; nome: string, scuolacit: string }[] = schoolsData.data.map(school => ({
                    ...school,
                    nome: school.scuolacit.replace('\"', ''),
                }));

                const tempSchoolsIds: number[] = schoolsData.data.map(school => school.id);

                setNomiScuolePickerItem(tempSchoolsName.map(el => <Picker.Item key={el.id} label={el.nome} value={el} />));
                setSchoolsIds(tempSchoolsIds);
                fetchOtherInfo(tempSchoolsIds[0]);

            }
        } catch (error) {
            console.error('Errore durante la richiesta delle scuole:', error);
        } finally {
            setIsLoadingScuole(false);
        }
    };

    const fetchOtherInfo = async (id: number) => {
        try {
            setIsLoadingOtherInfo(true);

            const urls = [
                `https://www.libreriabonagura.it/micro/getCourses.asp?libreria=${sedeSelezionata}&school=${id}`,
                `https://www.libreriabonagura.it/micro/getSections.asp?libreria=${sedeSelezionata}&school=${id}`,
                `https://www.libreriabonagura.it/micro/getClasses.asp?libreria=${sedeSelezionata}&school=${id}`
            ];

            const responses = await Promise.all(urls.map(url => fetch(url)));
            const [coursesName, sectoinsName, classesName] = await Promise.all(responses.map(res => res.json()));

            console.log("coursesName", coursesName);
            console.log("sectoinsName", sectoinsName);
            console.log("classesName", classesName);

            setCoursesName(coursesName.data.map(course => course.tipo));
            setSectionsName(sectoinsName.data);
            setClassesName(classesName.data.map(singleClass => singleClass.classe));

            setCorsiPickerItem(coursesName.data.map(el => <Picker.Item key={el.tipo} label={el.tipo} value={el.tipo} />))
            setSezioniPickerItem(sectoinsName.data.map(el => <Picker.Item key={el} label={el} value={el} />))
            setClassiPickerItem(classesName.data.map(el => <Picker.Item key={el.classe} label={el.classe} value={el.classe} />))

            setIsLoadingOtherInfo(false);
        } catch (error) {
            console.error('Errore durante la richiesta delle informazioni sulla scuola:', error);
        }
    };

    /** @param {number} sedeIndex - L'indice della sede (0 per Poggiomarino, 1 per Pompei). */
    const selectSede = (sedeIndex: number) => {
        setSede(SEDI[sedeIndex]);
        setNextButtonFirstStepEnabled(false);
    };

    const onNextFirstStep = () => fetchAreasAndSetState();
    const onNextSecondStep = () => fetchBooksAndSetState();


    const getPrezzoUsato = (prezzoNuovo) => {
        const price = parseFloat(prezzoNuovo);
        const sconto = (price * 35) / 100;
        return (prezzoNuovo - sconto).toFixed(2) + " €";
    };

    if (isLoading) return <View style={gs.spinner} children={<Spinner size="large" />} />;

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, width: wp("100%") }}>
            <View style={{ position: "absolute", alignItems: 'center', width: wp("90%"), paddingHorizontal: wp("5%") }}>
                <TextComponent style={styles.subTitle}>
                    In questa sezione puoi solo consultare le liste dei libri adottati con i relativi prezzi. Per acquistare e/o ordinare vai alla home page.
                </TextComponent>
            </View>
            <View style={{ marginTop: 70, height: hp("80%"), flex: 1 }}>
                <CustomProgressSteps>
                    <CustomProgressStep 
                        label="Sede" 
                        nextBtnDisabled={nextButtonFirstStepEnabled} 
                        onNext={onNextFirstStep} 
                        nextBtnText="Successivo"
                    >
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.imagesContainer}>
                                <TouchableOpacity
                                    onPress={() => selectSede(0)}
                                    disabled={lockSede && sedeSelezionata === SEDI[1]}
                                    style={styles.imageWrapper}
                                >
                                    <View style={[
                                        styles.sedeContainer,
                                        sedeSelezionata === SEDI[0] && styles.selectedSede
                                    ]}>
                                        <Image
                                            style={styles.sedeImage}
                                            source={require('@/assets/images/sedePoggiomarino.png')}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => selectSede(1)}
                                    disabled={lockSede && sedeSelezionata === SEDI[0]}
                                    style={styles.imageWrapper}
                                >
                                    <View style={[
                                        styles.sedeContainer,
                                        sedeSelezionata === SEDI[1] && styles.selectedSede
                                    ]}>
                                        <Image
                                            style={styles.sedeImage}
                                            source={require('@/assets/images/sedePompei.jpg')}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </CustomProgressStep>

                    <CustomProgressStep 
                        label="Informazioni" 
                        nextBtnDisabled={isLoadingOtherInfo} 
                        onNext={onNextSecondStep} 
                        nextBtnText="Cerca   " 
                        previousBtnText="Indietro   "
                    >
                        <ScrollView>
                            <View>
                                <TextComponent>Selezionare una città:</TextComponent>
                                {isLoadingCitta && <Spinner size="large" />}
                                {!isLoadingCitta && (
                                    <Picker
                                        selectedValue={selectedCitta}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => {
                                            setSelectedCitta(itemValue);
                                            fetchSchoolsFromCitta(itemValue);
                                        }}>
                                        {nomiCittaPickerItem}
                                    </Picker>
                                )}
                            </View>

                            <View>
                                {isLoadingScuole && <Spinner size="large" />}
                                {!isLoadingScuole && (
                                    <>
                                        <TextComponent>Selezionare una scuola:</TextComponent>
                                        <Picker
                                            selectedValue={selectedScuola}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedIdxScuola(itemIndex);
                                                setSelectedScuola(itemValue);
                                                fetchOtherInfo(itemValue.id);
                                            }}>
                                            {nomiScuolePickerItem}
                                        </Picker>
                                    </>
                                )}
                            </View>

                            <View>
                                {isLoadingOtherInfo && <Spinner size="large" />}
                                {!isLoadingOtherInfo && (
                                    <>
                                        <TextComponent>Seleziona Corso, Classe e Sezione:</TextComponent>
                                        <Picker
                                            style={styles.picker}
                                            selectedValue={coursesName[selectedIdxCorso]}
                                            onValueChange={(itemValue, itemIndex) => setSelectedIdxCorso(itemIndex)}>
                                            {corsiPickerItem}
                                        </Picker>

                                        <Picker
                                            style={styles.picker}
                                            selectedValue={classesName[selectedIdxClasse]}
                                            onValueChange={(itemValue, itemIndex) => setSelectedIdxClasse(itemIndex)}>
                                            {classiPickerItem}
                                        </Picker>

                                        <Picker
                                            style={styles.picker}
                                            selectedValue={sectionsName[selectedIdxSezione]}
                                            onValueChange={(itemValue, itemIndex) => setSelectedIdxSezione(itemIndex)}>
                                            {sezioniPickerItem}
                                        </Picker>
                                    </>
                                )}
                            </View>
                        </ScrollView>
                    </CustomProgressStep>

                    <CustomProgressStep label="Lista Libri" previousBtnText="Indietro  ">
                        <ScrollView>
                            {showLoadingBooks && <Spinner size="large" style={gs.spinner} />}
                            {!showLoadingBooks && books.map((book, idx) => (
                                <View key={idx} style={styles.bookItem}>
                                    <Image 
                                        style={styles.bookImage} 
                                        source={{ uri: `https://www.libreriabonagura.it/wbresize.aspx?f=${book.isbn}.jpg&c=100&w=150` }} 
                                    />
                                    <View style={styles.bookInfo}>
                                        <Text>{book.titolo}</Text>
                                        <Text>{book.autore}</Text>
                                        <Text>Nuovo: {book.prezzo.toFixed(2)}€</Text>
                                        <Text>Usato: {getPrezzoUsato(book.prezzo)}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </CustomProgressStep>
                </CustomProgressSteps>
            </View>
        </SafeAreaView>
    )
};