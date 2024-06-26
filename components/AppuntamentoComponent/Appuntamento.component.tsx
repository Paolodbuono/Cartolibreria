import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, Alert, Modal, Text, Button, ActivityIndicator as Spinner, TouchableOpacity } from 'react-native';

import { gs } from '@/style/globalStyles';
import { styles } from './Appuntamento.styles';
import EmailForm from './EmailFormComponent/EmailForm.component';
import { PrenotazioneData } from './Appuntamento.types';

import * as Notifications from 'expo-notifications';
import { BSub } from '../Commons/BSub.component';
import { SEDI, calendarsLocales, radioButtonSede } from '@/utils/constants';

const AppuntamentoComponent: React.FC<{}> = () => {

    const router = useRouter();

    const [sedeIndex, setSedeIndex] = useState<string>("1");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [prenotazionePresente, setPrenotazionePresente] = useState<boolean>(false);
    const [datiPrenotazionePresente, setDatiPrenotazionePresente] = useState<PrenotazioneData>();
    const [giornoPrenotazione, setGiornoPrenotazione] = useState<Date>(moment().toDate());
    const [selectedOrario, setSelectedOrario] = useState<number>(9);
    const [selectedMinuti, setSelectedMinuti] = useState<number>(0);
    const [orariMattino, setOrariMattino] = useState<{ key: number; label: string }[]>([]);
    const [minutiMattino, setMinutiMattino] = useState<{ key: number; label: string }[]>([]);
    const [modalCheckDateVisibile, setModalCheckDateVisibile] = useState<boolean>(false);
    const [modalInserInfoVisibile, setModalInserInfoVisibile] = useState<boolean>(false);
    const [prenotazioneDate, setPrenotazioneDate] = useState<string>("");
    const [resCheckDate, setResCheckDate] = useState<any>('');
    const [nome, setNome] = useState<string>('');
    const [cognome, setCognome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [numeroCell, setNumroCell] = useState<string>('');

    const [fontsLoaded] = useFonts({ 'Arial': require('@/assets/fonts/Arial.ttf') });

    const radioButtonsData: RadioButtonProps[] = useMemo(() => (radioButtonSede), []);

    LocaleConfig.locales['it'] = calendarsLocales;
    LocaleConfig.defaultLocale = 'it';

    useEffect(() => {
        const getNotificationPermission = async () => {
            try {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }

                if (finalStatus !== 'granted') {
                    throw new Error('Permission to access notifications denied');
                }
            } catch (error: any) {
                Alert.alert('Error', error.message);
            }
        };

        getNotificationPermission();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestArray = [];
                requestArray.push(AsyncStorage.getItem('userData'))
                requestArray.push(AsyncStorage.getItem('prenotazione'))
                requestArray.push(AsyncStorage.getItem('sedeSelezionata'));
                const [userData, prenotazione, sedeSelezionata] = await Promise.all(requestArray);

                if (userData) {
                    console.log('L\'utente ha effettuato la login (Appuntamento.Component)', userData);
                    const parsedUser = JSON.parse(userData);

                    setEmail(parsedUser.email);
                    setNumroCell(parsedUser.cellulare);
                    setNome(parsedUser.nome.split(" ")[0]);
                    setCognome(parsedUser.nome.split(" ")[1]);
                }

                if (prenotazione) {
                    const parsedPrenotazione = JSON.parse(prenotazione);
                    console.log('Confronto Prenotazioni ----> ', moment(), moment(parsedPrenotazione.dataPrenotazioneRaw), (moment() <= moment(parsedPrenotazione.dataPrenotazioneRaw)))

                    if (moment().isBefore(moment(parsedPrenotazione.dataPrenotazioneRaw).add(3, 'minutes'))) {
                        console.log('Prenotazione Valida ---->');
                        console.log('Dati prenotazione presente --->', parsedPrenotazione);
                        setDatiPrenotazionePresente(parsedPrenotazione);
                        setPrenotazionePresente(true);
                    } else {
                        console.log('Prenotazione scaduta ---->');
                        AsyncStorage.removeItem('prenotazione');
                    }
                }

                if (sedeSelezionata === SEDI[0]) setSedeIndex("0");
                if (sedeSelezionata === SEDI[1]) setSedeIndex("1");

                const tempOrariMattinoValue: string[] = [];
                const tempMinutiMattinoValue: string[] = [];
                const tempFields: { key: number; label: string }[] = [];
                const tempFieldsMinuti: { key: number; label: string }[] = [];

                for (let i = 9; i < 20; i++) {
                    if ((i >= 9 && i < 13) || (i > 15 && i < 20)) {
                        const hourText = moment().set({ hour: i, minute: 0 }).format('HH');
                        tempOrariMattinoValue.push(hourText);
                        tempFields.push({ key: i, label: hourText });
                    }
                }

                for (let i = 0; i < 60; i += 3) {
                    const minuteText = moment().minute(i).format('mm');
                    tempMinutiMattinoValue.push(minuteText);
                    tempFieldsMinuti.push({ key: i, label: minuteText });
                }

                setMinutiMattino(tempFieldsMinuti);
                setOrariMattino(tempFields);

                setIsLoading(false); // Fermiamo il Loading
            } catch (error) {
                console.log('Error fetching data', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleModalCheckDate = () => setModalCheckDateVisibile(!modalCheckDateVisibile);
    const handleToggleModalInserInfo = () => { setModalInserInfoVisibile(!modalInserInfoVisibile); };

    const handleRemovePrenotazione = async () => {
        Alert.alert("Cancella prenotazione", "Sei sicuro di voler cancellare la tua prenotazione?", [
            {
                text: "Annulla",
                style: "cancel"
            },
            {
                text: "Conferma",
                onPress: async () => {
                    try {
                        const prenotazioneJson = await AsyncStorage.getItem('prenotazione');
                        if (!prenotazioneJson) {
                            throw new Error('Nessuna prenotazione trovata');
                        }
                        const prenotazione = JSON.parse(prenotazioneJson);

                        // Rimuovi la notifica utilizzando l'ID salvato
                        await Notifications.cancelScheduledNotificationAsync(prenotazione.notificationId);

                    } catch (errro: any) {
                        console.log("eh", errro);
                    } finally {
                        // Rimuovi la prenotazione da AsyncStorage
                        await AsyncStorage.removeItem('prenotazione');

                        // Aggiorna lo stato dell'app o esegui altre azioni necessarie
                        setPrenotazionePresente(false);
                    }
                }
            }
        ]
        );
    };

    const checkDate = () => {
        const formdata = new FormData();
        const currentDate = moment().format("YYYY-MM-DD");
        const bookingDate = moment(giornoPrenotazione).format("YYYY-MM-DD");
        const currentHour = moment().hour();
        const currentMinute = moment().minute();
        const bookingHour = selectedOrario;
        const bookingMinute = selectedMinuti;

        const submitForm = async (ora: string) => {
            const url = `https://www.prenotazionilibreriabonagura.it/micro/services.php?sede=${SEDI[+sedeIndex]}&opt=1`;
            const headers = {
                'Token': '1me0si3nahr'
            };

            formdata.append("data", bookingDate);
            formdata.append("ora", ora);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: formdata
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log("Risultato check Date", result.esito);
                setResCheckDate(result.esito);
                setModalCheckDateVisibile(true);
                setPrenotazioneDate(" " + moment(giornoPrenotazione).format("DD-MM-YYYY") + " ore " + selectedOrario + ':' + (selectedMinuti < 10 ? "0" + selectedMinuti : selectedMinuti))
            } catch (error: any) {
                console.error('Fetch error:', error);
                // Aggiungi la gestione degli errori qui, ad esempio:
                console.log('Error:', error.message);
            }
        };

        if (currentDate === bookingDate) {
            console.log('Giorni prenotazione coincidono');

            if (currentHour < bookingHour || (currentHour === bookingHour && currentMinute <= bookingMinute)) {
                const ora = currentHour < bookingHour ?
                    `${bookingHour}:${bookingMinute}:00` :
                    `${bookingHour}:${bookingMinute}:00`;

                console.log(currentHour < bookingHour ? 'Ora prenotazione successiva ad ora attuale' : 'Ora prenotazione uguale ad ora attuale e minuti attuali minori di minuti selezionati');
                submitForm(ora);
            } else {
                Alert.alert('Prenotazione non disponibile', "L'orario selezionato non è valido, scegliere un orario che non è già passato");
            }
        } else if (currentDate < bookingDate) {
            submitForm(`${bookingHour}:${bookingMinute}:00`);
        } else {
            Alert.alert('Prenotazione non disponibile', "L'orario selezionato non è valido, scegliere un orario che non è già passato");
        }
    };



    const handlePrenota = async () => {
        if (!nome || !cognome || !email || !numeroCell) return Alert.alert('Errore', 'Compila tutti i campi');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Alert.alert('Errore', 'Inserisci un e-mail valida per prenotarti');

        const formdata = new FormData();
        formdata.append("data", moment(giornoPrenotazione).format("YYYY-MM-DD"));
        formdata.append("ora", `${selectedOrario}:${selectedMinuti}:00`);
        formdata.append("nome", nome);
        formdata.append("cognome", cognome);
        formdata.append("email", email);
        formdata.append("telefono", numeroCell);

        setIsLoading(true);

        try {
            const url = `https://www.prenotazionilibreriabonagura.it/micro/services.php?sede=${SEDI[+sedeIndex]}&opt=2`;
            const headers: HeadersInit = { 'Token': '1me0si3nahr' };

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: formdata
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            console.log('Risposta Insert Date ---->', result);

            if (result.esito.toLocaleLowerCase() !== 'ko') {
                setIsLoading(false);

                const dataPrenotazioneConOrario = moment(giornoPrenotazione)
                    .set({ hour: selectedOrario, minute: selectedMinuti, second: 0, millisecond: 0 });

                const notifTime = moment(dataPrenotazioneConOrario).subtract(35, 'minutes').toDate();

                // Schedula la notifica
                const schedulingOptions = {
                    content: {
                        title: 'Prenotazione in arrivo!',
                        body: `Hai una prenotazione alla cartolibreria tra 15 minuti.`,
                    },
                    trigger: notifTime,
                };


                const notificationId = await Notifications.scheduleNotificationAsync(schedulingOptions);

                const jsonPrenotazione = {
                    id: result.id,
                    nome,
                    cognome,
                    email,
                    cellulare: numeroCell,
                    sede: SEDI[+sedeIndex],
                    dataPrenotazioneRaw: moment(dataPrenotazioneConOrario),
                    dataPrenotazione: dataPrenotazioneConOrario.format('DD-MM-YYYY'),
                    orarioPrenotazione: dataPrenotazioneConOrario.format('HH:mm'),
                    notificationId: notificationId, // Salva l'ID della notifica qui

                };

                console.log('dataPrenotazioneConOrario ---->', JSON.stringify(jsonPrenotazione));
                await AsyncStorage.setItem('prenotazione', JSON.stringify(jsonPrenotazione));

                Alert.alert(
                    'Prenotazione effettuata',
                    `Prenotazione avvenuta con successo. Indica i tuoi dati quando verrai in negozio. Il tuo codice prenotazione è: ${result.id}`,
                    [{ text: 'OK', onPress: async () => { router.replace('HomeView'); } }],
                    { cancelable: false }
                );

                setModalInserInfoVisibile(false);
            } else {
                setIsLoading(false);
                Alert.alert('Errore', 'Problema con la prenotazione, riprova!');
            }
        } catch (error) {
            console.log('error prenotazione', error);
            Alert.alert('Errore', 'Problema con la prenotazione, riprova!');
        } finally {
            setIsLoading(false);
        }
    };


    if (!fontsLoaded) return <View style={gs.spinner} children={<Spinner size="large" />} />;
    if (isLoading) return <View style={gs.spinner} children={<Spinner size="large" />} />;

    if (prenotazionePresente) return (<>
        <View >
            <Text style={styles.title}>Grazie per la preferenza che ci hai accordato!</Text>
            <Text style={styles.textRiepilogoPrenotazione}>Presentati con questo ticket... e salti la fila! </Text>
            <Text style={styles.textRiepilogoPrenotazione}>Lo trovi nella sezione appuntamenti</Text>

            <Text style={styles.codicePrenotazione}>Sede prenotazione <BSub title={datiPrenotazionePresente?.sede ?? ""} /> </Text>
            <Text style={styles.codicePrenotazione}>Nome Cognome:  <BSub title={`${datiPrenotazionePresente?.nome} ${datiPrenotazionePresente?.cognome}`} /> </Text>
            <Text style={styles.codicePrenotazione}>Email:  <BSub title={datiPrenotazionePresente?.email ?? ""} /> </Text>
            <Text style={styles.codicePrenotazione}>Cellulare:  <BSub title={datiPrenotazionePresente?.numeroCell ?? ""} /> </Text>
            <Text style={styles.codicePrenotazione}>Giorno Prenotazione:  <BSub title={datiPrenotazionePresente?.dataPrenotazione ?? ""} /> </Text>
            <Text style={styles.codicePrenotazione}>Orario Prenotazione:  <BSub title={datiPrenotazionePresente?.orarioPrenotazione ?? ""} /> </Text>
            <Text style={styles.codicePrenotazione}>Numero prenotazione</Text>
            <Text style={styles.textRiepilogoNumeroPrenotazione}>{datiPrenotazionePresente?.id}</Text>
            <View style={styles.containeButtonCancella}>
                <Button title="Cancella Prenotazione" onPress={handleRemovePrenotazione} />
            </View>
        </View >
    </>)

    return (
        <>
            <Text style={styles.title}>Prenota un'appuntamento... e salta la fila!</Text>
            <Text style={styles.subTitle}>Seleziona sede dove vuoi prenotarti</Text>

            <RadioGroup
                radioButtons={radioButtonsData}
                onPress={setSedeIndex}
                selectedId={sedeIndex}
                containerStyle={{ display: "flex", flexDirection: "row" }}
            />
            <Calendar
                onDayPress={(day) => setGiornoPrenotazione(moment(day.dateString).toDate())}
                markedDates={{ [moment(giornoPrenotazione).format('YYYY-MM-DD')]: { selected: true, selectedColor: 'blue' } }}
                theme={{
                    textDayFontFamily: 'Arial',
                    textMonthFontFamily: 'Arial',
                    textDayHeaderFontFamily: 'Arial',
                    textDayFontWeight: '300',
                    textMonthFontWeight: '300',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                }}
                firstDay={1}
                monthFormat={'MMM yyyy'}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                accessibilityLanguage='it'
                style={styles.calendar}
            />

            <View style={styles.timeContainer}>
                <View>
                    <Text style={{ marginTop: 10, fontWeight: '800', alignSelf: "center" }}>Ora</Text>
                    <View style={styles.timeCell}>
                        <Picker style={{ width: '100%' }} selectedValue={selectedOrario} onValueChange={(itemValue, itemIndex) => setSelectedOrario(itemValue)}>
                            {orariMattino.map((orario) => <Picker.Item key={orario.key} label={orario.label} value={+orario.label} />)}
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text style={{ marginTop: 10, fontWeight: '800', alignSelf: "center" }}>Minuto</Text>
                    <View style={styles.timeCell}>
                        <Picker style={{ width: '100%' }} selectedValue={selectedMinuti} onValueChange={(itemValue, itemIndex) => setSelectedMinuti(itemValue)} >
                            {minutiMattino.map((orario) => <Picker.Item key={orario.key} label={orario.label} value={+orario.label} />)}
                        </Picker>
                    </View>
                </View>

            </View>

            <Button title="Cerca disponibilità orario" onPress={checkDate} />

            <Modal visible={modalCheckDateVisibile} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    {resCheckDate.toLocaleLowerCase() == 'ok' && <>
                        <View style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', height: "90%" }}>
                            <View style={{ display: "flex" }}>
                                <Text style={{ ...styles.title, fontSize: 32, marginBottom: 10, flex: 1 }}>L'orario selezionato è disponibile!</Text>
                                <Text style={{ ...styles.subTitle, fontWeight: '400', textAlign: 'center', marginBottom: 'auto', flex: 1 }}>
                                    Vuoi confermare la prenotazione per il
                                    <Text style={{ fontWeight: '800' }}>{prenotazioneDate}</Text>
                                    ?
                                </Text>
                            </View>

                            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: 150, height: 60, paddingVertical: 12, borderRadius: 8, marginRight: 10 }} onPress={toggleModalCheckDate}>
                                    <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>Annulla</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: 'blue', width: 150, height: 60, paddingVertical: 12, borderRadius: 8, marginLeft: 10 }}
                                    onPress={() => {
                                        setModalCheckDateVisibile(false);
                                        setModalInserInfoVisibile(true);
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>Conferma</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>}
                    {resCheckDate.toLocaleLowerCase() !== 'ok' && <>
                        <View style={styles.container}>
                            <Text style={styles.title}>Orario selezionato non disponibile!</Text>
                            <Text style={styles.subTitle}>
                                Anche se non trovi un orario utile, recati ugualmente presso uno dei nostri punti vendita.
                                Grazie ai molti addetti alle vendite, l'attesa sarà comunque breve!
                            </Text>
                            <TouchableOpacity style={styles.button} onPress={toggleModalCheckDate}>
                                <Text style={styles.buttonText}>Chiudi</Text>
                            </TouchableOpacity>
                        </View>
                    </>}
                </View>
            </Modal>
            <Modal visible={modalInserInfoVisibile} animationType="slide">
                <EmailForm
                    nome={nome}
                    setNome={setNome}
                    cognome={cognome}
                    setCognome={setCognome}
                    email={email}
                    setEmail={setEmail}
                    numeroCell={numeroCell}
                    setNumroCell={setNumroCell}
                    handlePrenota={handlePrenota}
                    handleToggleModalInserInfo={handleToggleModalInserInfo}
                    prenotazioneDate={prenotazioneDate}
                />
            </Modal>
        </>
    );
};

export default AppuntamentoComponent;