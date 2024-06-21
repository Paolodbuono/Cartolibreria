import React, { useState, useEffect, useMemo } from 'react';
import { View, Alert, Modal, Text, Button, ActivityIndicator as Spinner } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Appuntamento.styles';
import { SEDI } from './Appuntamento.constants';
import { gs } from '@/style/globalStyles';
import EmailForm from './EmailFormComponent/EmailForm.component';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

interface PrenotazioneScreenProps {
    navigation: any;
}

interface PrenotazioneData {
    nome: string;
    cognome: string;
    email: string;
    numeroCell: string;
    dataPrenotazioneRaw: string;
    dataPrenotazione: string;
    sede: string;
    numPrenotazione: string;
}

const AppuntamentoComponent: React.FC<PrenotazioneScreenProps> = () => {

    const router = useRouter();

    const [sedeIndex, setSedeIndex] = useState<string>("0");
    const [isLoading, setIsLoading] = useState(true);
    const [prenotazionePresente, setPrenotazionePresente] = useState(false);
    const [datiPrenotazionePresente, setDatiPrenotazionePresente] = useState<PrenotazioneData | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [giornoPrenotazione, setGiornoPrenotazione] = useState<Date>(moment().toDate());
    const [selectedOrario, setSelectedOrario] = useState(0);
    const [selectedMinuti, setSelectedMinuti] = useState(0);
    const [orariMattino, setOrariMattino] = useState<{ key: number; label: string }[]>([]);
    const [orariMattinoValue, setOrariMattinoValue] = useState<string[]>([]);
    const [minutiMattino, setMinutiMattino] = useState<{ key: number; label: string }[]>([]);
    const [minutiMattinoValue, setMinutiMattinoValue] = useState<string[]>([]);
    const [modalCheckDateVisibile, setModalCheckDateVisibile] = useState(false);
    const [modalInserInfoVisibile, setModalInserInfoVisibile] = useState(false);
    const [resCheckDate, setResCheckDate] = useState<any>('');
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [numeroCell, setNumroCell] = useState('');

    const radioButtonsData: RadioButtonProps[] = useMemo(() => ([
        { id: '1', label: 'Poggiomarino', value: 'Poggiomarino' },
        { id: '2', label: 'Pompei', value: 'Pompei' }
    ]), []);

    LocaleConfig.locales['it'] = {
        monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        monthNamesShort: ['Gen.', 'Feb.', 'Mar.', 'Apr.', 'Mag.', 'Giu.', 'Lug.', 'Ago.', 'Set.', 'Ott.', 'Nov.', 'Dic.'],
        dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mer.', 'Gio.', 'Ven.', 'Sab.'],
    };

    LocaleConfig.defaultLocale = 'it';


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

                    setIsLogged(true);
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
                setMinutiMattinoValue(tempMinutiMattinoValue);
                setOrariMattino(tempFields);
                setOrariMattinoValue(tempOrariMattinoValue);

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
                    await AsyncStorage.removeItem('prenotazione');
                    setPrenotazionePresente(false);
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

        const submitForm = (ora: string) => {
            formdata.append("data", bookingDate);
            formdata.append("ora", ora);

            axios.post(`https://www.prenotazionilibreriabonagura.it/micro/services.php?sede=${SEDI[+sedeIndex]}&opt=1`, formdata, {
                headers: { "Token": "1me0si3nahr" }
            }).then(response => response.data)
                .then(result => {
                    console.log("Risultato check Date", result.esito);
                    setResCheckDate(result.esito);
                    setModalCheckDateVisibile(true);
                }).catch(error => console.log('error', error));
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
        formdata.append("ora", selectedOrario + ':' + selectedMinuti + ':00');
        formdata.append("nome", nome);
        formdata.append("cognome", cognome);
        formdata.append("email", email);
        formdata.append("telefono", numeroCell);
        setIsLoading(true);
        axios.post("https://www.prenotazionilibreriabonagura.it/micro/services.php?sede=" + SEDI[+sedeIndex] + "&opt=2", formdata, { headers: { "Token": "1me0si3nahr" } })
            .then(response => response.data).then(result => {
                console.log('Risposta Insert Date ---->', result)
                if (result.esito.toLocaleLowerCase() !== 'ko') {
                    setIsLoading(false);
                    const dataPrenotazioneConOrario = moment(giornoPrenotazione);
                    dataPrenotazioneConOrario.set({ hour: selectedOrario, minute: selectedMinuti, second: 0, millisecond: 0 })
                    const jsonPrenotazione = {
                        id: result.id,
                        nome,
                        cognome,
                        email,
                        cellulare: numeroCell,
                        sede: SEDI[+sedeIndex],
                        dataPrenotazioneRaw: moment(dataPrenotazioneConOrario),
                        dataPrenotazione: dataPrenotazioneConOrario.format('DD-MM-YYYY'),
                        orarioPrenotazione: dataPrenotazioneConOrario.format('HH:mm')
                    }

                    console.log('dataPrenotazioneConOrario ---->', JSON.stringify(jsonPrenotazione));
                    AsyncStorage.setItem('prenotazione', JSON.stringify(jsonPrenotazione));

                    Alert.alert('Prenotazione effettuata', 'Prenotazione avvenuta con successo indica i tuoi dati quando verrai in negozio. Il tuo codice prenotazione è: ' + result.id,
                        [{ text: 'OK', onPress: async () => { router.replace("HomeView"); } },],
                        { cancelable: false }
                    );
                    setModalInserInfoVisibile(false);
                } else {
                    setIsLoading(false);
                    Alert.alert('Errore', 'Problema con la prenotazione riprova!');
                }
            })
            .catch(error => {
                console.log('error prenotazione', error)
                Alert.alert('Errore', 'Problema con la prenotazione riprova!');
            });
    };

    if (isLoading) return <View style={gs.spinner} children={<Spinner size="large" />} />;

    if (prenotazionePresente) return (<>
        <View style={styles.containerRiepilogoPrenotazione}>
            <Text style={styles.textRiepilogoPrenotazione}>Prenotazione effettuata per il giorno</Text>
            <Text style={styles.textRiepilogoNumeroPrenotazione}>{datiPrenotazionePresente?.dataPrenotazione}</Text>
            <View style={styles.containeButtonCancella}>
                <Button title="Cancella Prenotazione" onPress={handleRemovePrenotazione} />
            </View>
        </View>
    </>)

    return (
        <>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>Prenota un'appuntamento... e salta la fila!</Text>
                </View>

                <View style={styles.containerSediForm}>
                    <Text style={styles.textRiepilogoPrenotazione}>Seleziona sede dove vuoi prenotarti</Text>
                    <View style={styles.containerCalendar}>
                        <RadioGroup
                            radioButtons={radioButtonsData}
                            onPress={setSedeIndex}
                            selectedId={sedeIndex}
                            containerStyle={{ display: "flex", flexDirection: "row" }}
                        />
                    </View>
                </View>
                <View style={styles.containerCalendar}>
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
                    />
                    <View style={styles.timeContainer}>
                        <View style={styles.hours}>
                            <Text>Ora</Text>
                            <Picker style={{ width: '100%' }} selectedValue={selectedOrario} onValueChange={(itemValue, itemIndex) => setSelectedOrario(itemValue)}>
                                {orariMattino.map((orario) => (
                                    <Picker.Item key={orario.key} label={orario.label} value={+orario.label} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.minutes}>
                            <Text>Minuto</Text>
                            <Picker style={{ width: '100%' }} selectedValue={selectedMinuti} onValueChange={(itemValue, itemIndex) => setSelectedMinuti(itemValue)}>
                                {minutiMattino.map((orario) => (
                                    <Picker.Item key={orario.key} label={orario.label} value={+orario.label} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <Button title="Cerca disponibilità orario" onPress={checkDate} />
                </View>
            </View>
            <Modal
                visible={modalCheckDateVisibile}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    {resCheckDate.toLocaleLowerCase() == 'ok' && <>
                        <View >
                            <Text>L'orario selezionato è disponibile </Text>
                            <Text>Vuoi confermare la prenotazione per: {moment(giornoPrenotazione).format("DD-MM-YYYY") + " ore " + selectedOrario + ':' + (selectedMinuti < 10 ? "0" + selectedMinuti : selectedMinuti)}</Text>
                            <Button title="Conferma" onPress={() => {
                                setModalCheckDateVisibile(false)
                                setModalInserInfoVisibile(true)
                            }} />
                            <Button title="Annulla" onPress={toggleModalCheckDate} />
                        </View>
                    </>}
                    {resCheckDate.toLocaleLowerCase() !== 'ok' && <>
                        <View >
                            <Text>Orario selezionato non disponibile! </Text>
                            <Text>Anche se non trovi un orario utile recati ugualmente presso uno dei nostri punti vendita. </Text>
                            <Text>Grazie ai molti addetti alle vendite l'attesa sarà comunque breve!</Text>
                            <Button title="Chiudi" onPress={toggleModalCheckDate} />
                        </View>
                    </>}
                </View>
            </Modal>
            <Modal visible={modalInserInfoVisibile} transparent={true} animationType="slide">
                <View style={styles.container}>
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
                    />
                    <Button title="Chiudi" onPress={handleToggleModalInserInfo} />
                </View>
            </Modal>
        </>
    );
};

export default AppuntamentoComponent;