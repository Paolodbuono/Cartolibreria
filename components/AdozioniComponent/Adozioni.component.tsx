import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Text, ActivityIndicator as Spinner, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { gs } from '@/style/globalStyles';
import { SEDI } from '@/utils/constants';
import { styles } from './Adozioni.styles';
import TextComponent from '../Commons/Text.component';
import { CustomProgressStep } from './CustomProgressStep';
import { CustomProgressSteps } from './CustomProgressSteps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface State {
    nextButtonFirstStepEnabled: boolean;
    sedeSelezionata: string;
    isLoading: boolean;
    isLoadingCitta: boolean;
    isLoadingScuole: boolean;
    isLoadingOtherInfo: boolean;
    showLoadingBooks: boolean;
    selectedIdxScuola: number;
    selectedIdxCorso: number;
    selectedIdxSezione: number;
    selectedIdxClasse: number;
    nomiCittaPickerItem: React.JSX.Element[];
    nomiScuolePickerItem: React.JSX.Element[];
    corsiPickerItem: string[];
    sezioniPickerItem: string[];
    classiPickerItem: string[];
    availableSchoolsIds: number[];
    coursesName: string[];
    sectionsName: string[];
    classesName: string[];
    books: any[];
    lockSede: boolean;
    selectedCitta: string;
    selectedScuola: string
}

const initialState: State = {
    nextButtonFirstStepEnabled: true,
    sedeSelezionata: '',
    isLoading: true,
    isLoadingCitta: true,
    isLoadingScuole: true,
    isLoadingOtherInfo: true,
    showLoadingBooks: true,
    selectedIdxScuola: 0,
    selectedIdxCorso: 0,
    selectedIdxSezione: 0,
    selectedIdxClasse: 0,
    nomiCittaPickerItem: [],
    nomiScuolePickerItem: [],
    corsiPickerItem: [],
    sezioniPickerItem: [],
    classiPickerItem: [],
    availableSchoolsIds: [],
    coursesName: [],
    sectionsName: [],
    classesName: [],
    books: [],
    lockSede: false,
    selectedCitta: '',
    selectedScuola: ''
};

export const AdozioniComponent = ({ }) => {
    const [state, setState] = useState<State>(initialState);

    const updateState = (newState: Partial<State>) => { setState(prevState => ({ ...prevState, ...newState })); }

    const fetchData = async () => {
        updateState({ isLoading: true })
        try {

            const sedeSelezionata = await AsyncStorage.getItem('sedeSelezionata')

            if (SEDI[0] === sedeSelezionata || SEDI[1] === sedeSelezionata) {
                updateState({ sedeSelezionata: sedeSelezionata, nextButtonFirstStepEnabled: false, lockSede: true });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        updateState({ isLoading: false })
    };

    useEffect(() => {
        fetchData();
    }, []);

    /** @param {number} sedeIndex - L'indice della sede (0 per Poggiomarino, 1 per Pompei). */
    const selectSede = (sedeIndex: number) => {
        updateState({
            sedeSelezionata: SEDI[sedeIndex],
            nextButtonFirstStepEnabled: false
        });

    };

    const fetchAreasAndSetState = async () => {
        try {
            updateState({ isLoadingCitta: true, isLoadingScuole: true, isLoadingOtherInfo: true });

            const response = await fetch(`https://www.libreriabonagura.it/micro/getAreas.asp?libreria=${state.sedeSelezionata}`, {
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

            updateState({ nomiCittaPickerItem: tempCitta });
            fetchSchoolsFromCitta(tempAreasName[0]);
        } catch (error) {
            console.error('Errore durante la richiesta delle aree:', error);
        }
        updateState({ isLoadingCitta: false });
    };

    const fetchBooksAndSetState = async () => {
        try {
            updateState({ showLoadingBooks: true });

            const url = `https://www.libreriabonagura.it/micro/getBooks.asp?libreria=${state.sedeSelezionata}&school=${state.availableSchoolsIds[state.selectedIdxScuola ?? 0]}&type=${encodeURIComponent(state.coursesName[state.selectedIdxCorso])}&class=${state.classesName[state.selectedIdxClasse]}&section=${state.sectionsName[state.selectedIdxSezione]}`;
            const response = await fetch(url);
            const booksData = await response.json();

            updateState({ books: booksData.data, showLoadingBooks: false });
        } catch (error) {
            console.error('Errore durante la richiesta dei libri:', error);
        }
    };

    const fetchSchoolsFromCitta = async (citta: string) => {
        try {
            updateState({
                isLoadingScuole: true,
                isLoadingOtherInfo: true
            });


            if (citta !== null) {
                const response = await fetch(`https://www.libreriabonagura.it/micro/getSchools.asp?libreria=${state.sedeSelezionata}&area=${citta}`);
                const schoolsData: { data: Array<{ id: number; nome: string, scuolacit: string }> } = await response.json();

                const tempSchoolsName: { id: number; nome: string, scuolacit: string }[] = schoolsData.data.map(school => ({
                    ...school,
                    nome: school.scuolacit.replace('\"', ''),
                }));

                const tempSchoolsIds: number[] = schoolsData.data.map(school => school.id);



                updateState({
                    nomiScuolePickerItem: tempSchoolsName.map(el => <Picker.Item key={el.id} label={el.nome} value={JSON.stringify(el)} />),
                    availableSchoolsIds: tempSchoolsIds
                });

                fetchOtherInfo(tempSchoolsIds[0]);
            }
        } catch (error) {
            console.error('Errore durante la richiesta delle scuole:', error);
        } finally {
            updateState({ isLoadingScuole: false });
        }
    };

    const fetchOtherInfo = async (id: number) => {
        try {
            updateState({ isLoadingOtherInfo: true });

            const urls = [
                `https://www.libreriabonagura.it/micro/getCourses.asp?libreria=${state.sedeSelezionata}&school=${id}`,
                `https://www.libreriabonagura.it/micro/getSections.asp?libreria=${state.sedeSelezionata}&school=${id}`,
                `https://www.libreriabonagura.it/micro/getClasses.asp?libreria=${state.sedeSelezionata}&school=${id}`
            ];

            const responses = await Promise.all(urls.map(url => fetch(url)));
            const [coursesName, sectoinsName, classesName] = await Promise.all(responses.map(res => res.json()));

            updateState({
                coursesName: coursesName.data.map(course => course.tipo),
                sectionsName: sectoinsName.data,
                classesName: classesName.data.map(singleClass => singleClass.classe),
                corsiPickerItem: coursesName.data.map(el => <Picker.Item key={el.tipo} label={el.tipo} value={el.tipo} />),
                sezioniPickerItem: sectoinsName.data.map(el => <Picker.Item key={el} label={el} value={el} />),
                classiPickerItem: classesName.data.map(el => <Picker.Item key={el.classe} label={el.classe} value={el.classe} />),
                isLoadingOtherInfo: false
            });

        } catch (error) {
            console.error('Errore durante la richiesta delle informazioni sulla scuola:', error);
        }
    };

    const getPrezzoUsato = (prezzoNuovo) => {
        const price = parseFloat(prezzoNuovo);
        const sconto = (price * 35) / 100;
        return (prezzoNuovo - sconto).toFixed(2) + " €";
    };

    if (state.isLoading) return <View style={gs.spinner} children={<Spinner size="large" />} />;

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
                        nextBtnDisabled={state.nextButtonFirstStepEnabled}
                        onNext={fetchAreasAndSetState}
                        nextBtnText="Successivo"
                    >
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.imagesContainer}>
                                <TouchableOpacity
                                    onPress={() => selectSede(0)}
                                    disabled={state.lockSede && state.sedeSelezionata === SEDI[1]}
                                    style={styles.imageWrapper}
                                >
                                    <View style={[
                                        styles.sedeContainer,
                                        state.sedeSelezionata === SEDI[0] && styles.selectedSede
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
                                    disabled={state.lockSede && state.sedeSelezionata === SEDI[0]}
                                    style={styles.imageWrapper}
                                >
                                    <View style={[
                                        styles.sedeContainer,
                                        state.sedeSelezionata === SEDI[1] && styles.selectedSede
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
                        nextBtnDisabled={state.isLoadingOtherInfo}
                        onPrevious={() => null}
                        onNext={fetchBooksAndSetState}
                        nextBtnText="Cerca   "
                        previousBtnText="Indietro   "
                    >
                        <ScrollView>
                            <View>
                                <TextComponent>Selezionare una città:</TextComponent>
                                {state.isLoadingCitta && <Spinner size="large" />}
                                {!state.isLoadingCitta && (
                                    <Picker
                                        selectedValue={state.selectedCitta}
                                        onValueChange={(itemValue) => {
                                            console.log("itemValue", itemValue);
                                            updateState({ selectedCitta: itemValue });
                                            fetchSchoolsFromCitta(itemValue);
                                        }}>
                                        {state.nomiCittaPickerItem}
                                    </Picker>
                                )}
                            </View>

                            <View>
                                <TextComponent>Selezionare una scuola:</TextComponent>
                                {state.isLoadingScuole && <Spinner size="large" />}
                                {!state.isLoadingScuole && (
                                    <Picker 
                                        selectedValue={state.selectedScuola}
                                        onValueChange={(itemValue) => {
                                            const item = JSON.parse(itemValue);
                                            updateState({ selectedIdxScuola: item.id, selectedScuola: itemValue });
                                            fetchOtherInfo(item.id);
                                        }}>
                                        {state.nomiScuolePickerItem}
                                    </Picker>
                                )}
                            </View>

                            <View>
                                <TextComponent>Seleziona Corso, Classe e Sezione:</TextComponent>
                                {state.isLoadingOtherInfo && <Spinner size="large" />}
                                {!state.isLoadingOtherInfo && (
                                    <>
                                        <Picker
                                            selectedValue={state.coursesName[state.selectedIdxCorso]}
                                            onValueChange={(itemValue, itemIndex) => updateState({ selectedIdxCorso: itemIndex })}>
                                            {state.corsiPickerItem}
                                        </Picker>

                                        <Picker
                                            selectedValue={state.classesName[state.selectedIdxClasse]}
                                            onValueChange={(itemValue, itemIndex) => updateState({ selectedIdxClasse: itemIndex })}>
                                            {state.classiPickerItem}
                                        </Picker>

                                        <Picker
                                            selectedValue={state.sectionsName[state.selectedIdxSezione]}
                                            onValueChange={(itemValue, itemIndex) => updateState({ selectedIdxSezione: itemIndex })}>
                                            {state.sezioniPickerItem}
                                        </Picker>
                                    </>
                                )}
                            </View>
                        </ScrollView>
                    </CustomProgressStep>

                    <CustomProgressStep label="Lista Libri" previousBtnText="Indietro  ">
                        <ScrollView>
                            {state.showLoadingBooks && <Spinner size="large" style={gs.spinner} />}
                            {!state.showLoadingBooks && state.books.map((book, idx) => (
                                <View key={idx}>
                                    <Image
                                        source={{ uri: `https://www.libreriabonagura.it/wbresize.aspx?f=${book.isbn}.jpg&c=100&w=150` }}
                                    />
                                    <View>
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