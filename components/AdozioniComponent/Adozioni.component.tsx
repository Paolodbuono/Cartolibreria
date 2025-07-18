import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Text, ActivityIndicator as Spinner, TouchableOpacity, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { gs } from '@/style/globalStyles';
import { SEDI } from '@/utils/constants';
import { styles } from './Adozioni.styles';
import TextComponent from '../Commons/Text.component';
import { CustomProgressStep } from './CustomProgressStep';
import { CustomProgressSteps } from './CustomProgressSteps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const isWeb = Platform.OS === "web";

const isTablet = wp('100%') > 600; // Condizione per determinare se è tablet

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
    coursesName: string[];
    sectionsName: string[];
    classesName: string[];
    lockSede: boolean;
    selectedCitta: string;
    selectedScuola: string
    LibriDaAcquistare: any[];
    LibriPosseduti: any[];
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
    coursesName: [],
    sectionsName: [],
    classesName: [],
    LibriDaAcquistare: [],
    LibriPosseduti: [],
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

            const sedeSelezionata = isWeb ? localStorage.getItem('sedeSelezionata') : await AsyncStorage.getItem('sedeSelezionata')

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
            await fetchSchoolsFromCitta(tempAreasName[0]);
        } catch (error) {
            console.error('Errore durante la richiesta delle aree:', error);
        }
        updateState({ isLoadingCitta: false });
    };

    const fetchBooksAndSetState = async () => {
        try {
            updateState({ showLoadingBooks: true });
            console.log("state", state)

            const url = `https://www.libreriabonagura.it/micro/getBooks.asp?libreria=${state.sedeSelezionata}&school=${state.selectedIdxScuola}&type=${encodeURIComponent(state.coursesName[state.selectedIdxCorso])}&class=${state.classesName[state.selectedIdxClasse]}&section=${state.sectionsName[state.selectedIdxSezione]}`;
            const response = await fetch(url);
            const booksData = await response.json();

            updateState({ LibriDaAcquistare: booksData.LibriDaAcquistare, showLoadingBooks: false, LibriPosseduti: booksData.LibriPosseduti });
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
                });

                await fetchOtherInfo(tempSchoolsIds[0], tempSchoolsName[0].nome);
            }
        } catch (error) {
            console.error('Errore durante la richiesta delle scuole:', error);
        } finally {
            updateState({ isLoadingScuole: false });
        }
    };

    const fetchOtherInfo = async (id: number, itemValue: string) => {
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
                coursesName: coursesName.data.map((course: { tipo: any; }) => course.tipo),
                sectionsName: sectoinsName.data,
                classesName: classesName.data.map((singleClass: { classe: any; }) => singleClass.classe),
                corsiPickerItem: coursesName.data.map((el: { tipo: string | undefined; }) => <Picker.Item key={el.tipo} label={el.tipo} value={el.tipo} />),
                sezioniPickerItem: sectoinsName.data.map((el: string | undefined) => <Picker.Item key={el} label={el} value={el} />),
                classiPickerItem: classesName.data.map((el: { classe: string | undefined; }) => <Picker.Item key={el.classe} label={el.classe} value={el.classe} />),
                isLoadingOtherInfo: false,
                selectedIdxScuola: id,
                selectedScuola: itemValue,
                selectedIdxCorso: 0,
                selectedIdxClasse: 0,
                selectedIdxSezione: 0
            });

        } catch (error) {
            console.error('Errore durante la richiesta delle informazioni sulla scuola:', error);
        }
    };

    const getPrezzoUsato = (prezzoNuovo: string) => {
        const price = parseFloat(prezzoNuovo);
        const sconto = (price * 35) / 100;
        return (price - sconto).toFixed(2) + " €";
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
                <CustomProgressSteps state={state}>
                    <CustomProgressStep
                        label="Sede"
                        nextBtnDisabled={state.nextButtonFirstStepEnabled}
                        onNext={fetchAreasAndSetState}
                        nextBtnText="Successivo"
                    >
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.imagesContainer}>
                                {/* Sede Pompei */}
                                <TouchableOpacity
                                    onPress={() => selectSede(1)}
                                    disabled={state.lockSede && state.sedeSelezionata === SEDI[0]}
                                    style={styles.imageWrapper}
                                >
                                    <View style={[styles.sedeContainer, state.sedeSelezionata === SEDI[1] && styles.selectedSede]}>
                                        <Image
                                            style={[
                                                styles.sedeImage,
                                                state.lockSede && state.sedeSelezionata === SEDI[0] && styles.disabledImage,
                                            ]}
                                            source={require('@/assets/images/sedePompei.png')}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </TouchableOpacity>
                                {/* Sede Poggiomarino */}
                                <TouchableOpacity
                                    onPress={() => selectSede(0)}
                                    disabled={state.lockSede && state.sedeSelezionata === SEDI[1]}
                                    style={styles.imageWrapper}
                                >
                                    <View style={[styles.sedeContainer, state.sedeSelezionata === SEDI[0] && styles.selectedSede]}>
                                        <Image
                                            style={[
                                                styles.sedeImage,
                                                state.lockSede && state.sedeSelezionata === SEDI[1] && styles.disabledImage,
                                            ]}
                                            source={require('@/assets/images/sedePoggiomarino.jpg')}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </CustomProgressStep>
                    <CustomProgressStep
                        label="Informazioni"
                        nextBtnDisabled={state.isLoadingOtherInfo || state.isLoading || state.isLoadingCitta || state.isLoadingScuole}
                        onPrevious={() => null}
                        onNext={fetchBooksAndSetState}
                        nextBtnText="Cerca"
                        previousBtnText="Indietro"
                    >
                        <ScrollView>
                            <TextComponent >Selezionare una città:</TextComponent>
                            {state.isLoadingCitta && <Spinner size="large" />}
                            {!state.isLoadingCitta && (
                                <View style={styles.step}>
                                    <Picker
                                        mode="dropdown" // Android dropdown
                                        style={{
                                            padding: 0,
                                            margin: 0,
                                        }}
                                        selectedValue={state.selectedCitta}
                                        onValueChange={(itemValue) => {
                                            updateState({ selectedCitta: itemValue });
                                            fetchSchoolsFromCitta(itemValue);
                                        }}>
                                        {state.nomiCittaPickerItem}
                                    </Picker>
                                </View>
                            )}

                            <TextComponent>Selezionare una scuola:</TextComponent>
                            {state.isLoadingScuole && <Spinner size="large" />}
                            {!state.isLoadingScuole && (
                                <View style={styles.step}>
                                    <Picker
                                        selectedValue={state.selectedScuola}
                                        onValueChange={(itemValue) => {
                                            const item = JSON.parse(itemValue);
                                            fetchOtherInfo(item.id, itemValue);
                                        }}>
                                        {state.nomiScuolePickerItem}
                                    </Picker>
                                </View>
                            )}

                            <TextComponent>Seleziona Corso, Classe e Sezione:</TextComponent>
                            {state.isLoadingOtherInfo && <Spinner size="large" />}
                            {!state.isLoadingOtherInfo && (
                                <>
                                    <View style={styles.step}>
                                        <Picker
                                            selectedValue={state.coursesName[state.selectedIdxCorso]}
                                            onValueChange={(itemValue, itemIndex) => updateState({ selectedIdxCorso: itemIndex })}>
                                            {state.corsiPickerItem}
                                        </Picker>
                                    </View>
                                    <View style={styles.step}>

                                        <Picker
                                            selectedValue={state.classesName[state.selectedIdxClasse]}
                                            onValueChange={(itemValue, itemIndex) => updateState({ selectedIdxClasse: itemIndex })}>
                                            {state.classiPickerItem}
                                        </Picker>
                                    </View>
                                    <View style={styles.step}>

                                        <Picker
                                            selectedValue={state.sectionsName[state.selectedIdxSezione]}
                                            onValueChange={(itemValue, itemIndex) => updateState({ selectedIdxSezione: itemIndex })}>
                                            {state.sezioniPickerItem}
                                        </Picker>
                                    </View>
                                </>
                            )}
                        </ScrollView>
                    </CustomProgressStep>

                    <CustomProgressStep label="Lista Libri" previousBtnText="Indietro" onPrevious={() => null}>
                        {state.showLoadingBooks && <Spinner size="large" style={gs.spinner} />}
                        {!state.showLoadingBooks && <>
                            {Platform.OS === 'web' && isTablet && <>
                                <View style={styles.listaLibri}>
                                    {state.LibriDaAcquistare.map((book, idx) => (
                                        <View key={idx} style={styles.bookItem}>
                                            <Image style={styles.bookImage} source={{ uri: `https://www.libreriabonagura.it/wbresize.aspx?f=${book.isbn}.jpg&c=100&w=150` }} />
                                            <Text style={styles.title}>{book.titolo}</Text>
                                            <Text style={styles.author}>{book.autore}</Text>
                                            <Text style={styles.price}>Nuovo: {book.prezzo.toFixed(2)}€</Text>
                                            <Text style={styles.price}>Usato: {getPrezzoUsato(book.prezzo)}</Text>
                                        </View>
                                    ))}
                                    {state.LibriPosseduti.length > 0 && <Text style={{...styles.sezioneTitolo, width: "100%", alignSelf: "stretch"}}>Libri già Posseduti</Text>}
                                    {state.LibriPosseduti.map((book, idx) => (
                                        <View key={idx} style={styles.bookItem}>
                                            <Image style={styles.bookImage} source={{ uri: `https://www.libreriabonagura.it/wbresize.aspx?f=${book.isbn}.jpg&c=100&w=150` }} />
                                            <Text style={styles.title}>{book.titolo}</Text>
                                            <Text style={styles.author}>{book.autore}</Text>
                                            <Text style={styles.price}>Nuovo: {book.prezzo.toFixed(2)}€</Text>
                                            <Text style={styles.price}>Usato: {getPrezzoUsato(book.prezzo)}</Text>
                                        </View>
                                    ))}
                                </View>
                            </>}
                            {(Platform.OS !== 'web' || (Platform.OS === 'web' && !isTablet)) &&
                                <ScrollView>
                                    {state.LibriDaAcquistare.map((book, idx) => (
                                        <View key={idx}>
                                            <Image style={styles.bookImage} source={{ uri: `https://www.libreriabonagura.it/wbresize.aspx?f=${book.isbn}.jpg&c=100&w=150` }} />
                                            <View>
                                                <Text>{book.titolo}</Text>
                                                <Text>{book.autore}</Text>
                                                <Text>Nuovo: {book.prezzo.toFixed(2)}€</Text>
                                                <Text>Usato: {getPrezzoUsato(book.prezzo)}</Text>
                                            </View>
                                        </View>
                                    ))}
                                    {state.LibriPosseduti.length > 0 && <Text style={styles.sezioneTitolo}>Libri già Posseduti</Text>}
                                    {state.LibriPosseduti.map((book, idx) => (
                                        <View key={idx}>
                                            <Image style={styles.bookImage} source={{ uri: `https://www.libreriabonagura.it/wbresize.aspx?f=${book.isbn}.jpg&c=100&w=150` }} />
                                            <View>
                                                <Text>{book.titolo}</Text>
                                                <Text>{book.autore}</Text>
                                                <Text>Nuovo: {book.prezzo.toFixed(2)}€</Text>
                                                <Text>Usato: {getPrezzoUsato(book.prezzo)}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            }
                        </>}
                    </CustomProgressStep>
                </CustomProgressSteps>
            </View>
        </SafeAreaView>
    )
};