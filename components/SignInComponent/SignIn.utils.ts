import { Field } from "./SignIn.types";

export const SEDI = ['poggiomarino', 'pompei'];

export const fields: Field[] = [
    {
        label: 'Cognome',
        placeholder: "Nome",
        caption: "Inserire il cognome dell'alunno",
        formName: 'cognome'
    },
    {
        label: 'Nome',
        placeholder: "Cognome",
        caption: 'Inserire il nome dell\'alunno',
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

export const PRIVACY = "Privacy ai sensi dell'art. 13 del D.lgs. 30.06.2003 n. 196 e del Regolamento 679/2016" +
    "a) Oggetto del trattamento CARTOLIBRERIA BONAGURA SRL POMPEI con sede legale in VIA TENENTE RAVALLESE 10-12 - 80045 POMPEI (NA) (di seguito anche solo \"azienda\") - Telefono 08118461118 e-mail pompei@libreriabonagura.it, raccoglie e tratta i dati personali forniti dai propri clienti quale Titolare del Trattamento. Pertanto, ai sensi dell'art. 13 del D.Lgs. 30 giugno 2003 n.196 \"Codice in materia di protezione dei dati personali\" (di seguito anche solo \"Codice Privacy\") e del Regolamento 679/2016 (di seguito \"Regolamento\"), le fornisce le seguenti informazioni." +
    "b) Finalita' del trattamento I dati che ci comunica saranno utilizzati al fine di dar seguito al suo ordine e per finalita' a questo strettamente connesse, collegate, derivate e strumentali. Utilizziamo i suoi dati personali per:" +
    "1 - adempiere agli obblighi contrattuali nei suoi confronti e fornirle i nostri servizi, per rispettare la normativa vigente, per proteggere i suoi interessi vitali o per altre esigenze di interesse pubblico." +
    "2 - contattarla via telefono, posta, e-mail, sms, ecc. per informazioni sullo stato dei suoi ordini." +
    "3 - svolgere finalita' di marketing diretto ai sensi dell'art. 23 e 130 del Codice Privacy, vale a dire per contattarla via telefono, posta, e-mail, sms, ecc... per comunicazioni pubblicitarie, commerciali o informative relative a prodotti e/o servizi da noi forniti." +
    "4 - verificare il suo grado di soddisfazione relativo ai nostri prodotti, servizi, proposte commerciali." +
    "c) Quali conseguenze in caso di mancato o incompleto conferimento dei dati. Ferma restando la sua autonomia personale in qualita' di interessato, il conferimento dei suoi dati personali per le finalita' contrattuali indicate al punto b) 1 e' obbligatorio poiche', in difetto, la nostra azienda si trovera' nella impossibilita' di dare seguito al suo ordine, mentre e' facoltativo relativamente alle altre finalita' di cui ai punti b) 2, b) 3 e b) 4. Pertanto, nel caso di mancato o incompleto conferimento dei dati:" +
    "- di cui al punto b) 2: non potremo fornirle informazioni sullo stato dell'ordine." +
    "- di cui al punto b) 3 e b) 4: non potremo inviarle comunicazioni commerciali e rilevare il suo grado di soddisfazione sui nostri prodotti, servizi e proposte." +
    "d) Modalita' del trattamento. I dati saranno trattati, per le suddette finalita', in via informatizzata e cartacea nel rispetto della normativa vigente e comunque in modo da garantirne la sicurezza, la riservatezza, nonche' impedirne la divulgazione od uso non autorizzati, l'alterazione o distruzione." +
    "e) Periodo di conservazione dei dati. I dati personali saranno conservati per il periodo necessario a perseguire le finalita' indicate al paragrafo b). In ogni caso conserveremo le sue informazioni per il periodo necessario ad adempiere ai nostri obblighi legali o normativi. Il periodo di conservazione delle informazioni personali dipende dallo scopo per cui vengono trattati i dati e dagli strumenti con cui tali informazioni personali sono trattate." +
    "f) A chi comunichiamo i dati I suoi dati personali potranno essere comunicati a:" +
    "- societa' del nostro gruppo ed esterne che si occupano di marketing diretto e di indagini di mercato." +
    "- soggetti che agiscono, in qualita' di responsabili (interni ed esterni) della nostra azienda, nonche' al personale degli uffici amministrativi e commerciali." +
    "- consulenti in materia contabile, amministrativa, legale, tributaria e finanziaria, nonche' a soggetti, enti od autorita' a cui la comunicazione dei dati sia obbligatoria in forza di legge o di ordini di pubblica autorita'. Tali soggetti tratteranno i dati in qualita' di autonomi titolari del trattamento ai sensi dell’art. 28 del Codice Privacy." +
    "- soggetti terzi di servizi di spedizione con i quali condividiamo indirizzi di consegna, informazioni di contatto e codici delle spedizioni al fine di facilitare la consegna degli oggetti acquistati e altre comunicazioni correlate alla consegna." +
    "- fornitori terzi di siti web, applicazioni, software, servizi e strumenti con cui collaboriamo affinche' possano erogarci i servizi richiesti." +
    "- societa' di manutenzione e riparazione delle apparecchiature informatiche." +
    "g) Dove sono memorizzate ed elaborate le informazioni personali. Ci impegniamo ad adottare tutte le misure ragionevolmente necessarie per garantire che i dati personali siano trattati in modo sicuro e in conformita' alla presente informativa." +
    "h) Cediamo i dati al di fuori dell’Unione Europea? I vostri dati personali possono essere trasferiti e trattati in una o piu' nazioni all'interno o al di fuori dell'Unione Europea. Cederemo i dati al di fuori dell'UE solo ai paesi che la Commissione Europea ritiene offrire un adeguato livello di protezione, o dove la nostra societa' ha attuato garanzie appropriate per preservare la riservatezza di tali informazioni." +
    "i) Accesso ai dati personali. In qualsiasi momento puo' conoscere i suoi dati personali da noi gestiti con il suo consenso inviando una mail all'indirizzo indicato al punto a) all'attenzione del Responsabile Privacy. In alcuni casi previsti dalla normativa vigente, nonostante l'eventuale suo diritto di richiedere modifica o cancellazione dei dati personali, potremmo comunque rifiutare tali modifiche o cancellazioni." +
    "l) I diritti riconosciuti dal Codice Privacy e dal Regolamento. Mediante comunicazione da inviare alla nostra azienda ad uno dei recapiti indicati al punto a) all'attenzione del Responsabile Privacy si potranno in ogni momento esercitare i diritti di cui all'art. 7 del Codice Privacy, circa l'indicazione dell'esistenza di dati che la riguardano, l'origine, la finalita' e le modalita' del trattamento. Inoltre, ai sensi dell'art. 13 del Regolamento Europeo n. 679/2016 sulla protezione dei dati personali, si rammenta che le sono riconosciuti i seguenti ulteriori diritti:" +
    "- il diritto di chiedere al titolare la limitazione del trattamento dei dati che la riguardano o di opporsi al loro trattamento, oltre al diritto alla portabilita' dei dati." +
    "- il diritto, qualora il trattamento sia basato sul consenso, di revocarlo in qualsiasi momento senza pregiudicare la liceita' del trattamento basata sul consenso prestato prima della revoca." +
    "- il diritto di proporre reclamo a un'autorita' di controllo. Per eventuali reclami o segnalazioni sulle modalita' di trattamento delle sue informazioni personali faremo ogni sforzo per rispondere alle sue preoccupazioni. Tuttavia, se lo desidera, potra' inoltrare i suoi reclami e/o segnalazioni all’Autorita' di Controllo." +
    "m) Responsabile del trattamento Il Responsabile del trattamento dei suoi dati e' Cartolibreria Bonagura s.r.l. Pompei raggiungibile via e-mail all'indirizzo pompei@libreriabonagura.it, cui lei puo' rivolgersi per far valere i diritti specificati al punto l). La Societa' rispondera' tempestivamente alle sue eventuali domande e/o reclami in relazione alle informazioni personali e in conformita' con le leggi applicabili.";
