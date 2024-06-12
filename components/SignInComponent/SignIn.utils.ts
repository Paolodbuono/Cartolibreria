import { Field } from "./SignIn.types";

export const SEDI = ['poggiomarino', 'pompei'];

export const fields: Field[] = [
    {
        label: 'Cognome',
        placeholder: "Inserisci il cognome",
        caption: "Inserire cognome dell'alunno!",
        formName: 'cognome'
    },
    {
        label: 'Nome',
        placeholder: "Inserisci il nome",
        caption: 'Inserire nome alunno!',
        formName: 'nome'
    },
    {
        label: 'Data Di Nascita (* opzionale)',
        placeholder: 'Inserire data nel formato gg/mm/aaaa',
        caption: "Inserire la data di nascita dell'alunno",
        type: 'date',
        formName: 'date'
    },
    {
        label: 'E-Mail',
        placeholder: "Inserisci e-mail",
        caption: 'Inserire una e-mail a cui riesce ad accedere',
        type: 'email',
        formName: 'email'
    },
    {
        label: 'Password',
        placeholder: 'Inserisci la password',
        caption: '',
        formName: 'password'
    },
    {
        label: 'Conferma Password',
        placeholder: 'Inserisci password di conferma',
        caption: '',
        formName: 'password2'
    },
    {
        label: 'Indirizo',
        placeholder: 'Inserisci indirizzo',
        caption: "Inserisci l'indirizzo a cui poi saranno spediti i prodotti",
        formName: 'indirizzo'
    },
    {
        label: 'Numero civico',
        placeholder: 'Inserisci numero civico',
        caption: "Inserisci il civico con indicazione di interno, scala ecc",
        formName: 'numerocivico'
    },
    {
        label: 'CAP',
        placeholder: 'Inserisci CAP',
        caption: "",
        formName: 'cap'
    },
    {
        label: 'Città',
        placeholder: 'Inserisci Città',
        caption: "",
        formName: 'citta'
    },
    {
        label: 'Provincia',
        placeholder: 'Inserisci Provincia',
        caption: "",
        formName: 'provincia'
    },
    {
        label: 'Cellulare',
        placeholder: 'Inserisci Cellulare',
        caption: "",
        formName: 'cellulare'
    },
];
