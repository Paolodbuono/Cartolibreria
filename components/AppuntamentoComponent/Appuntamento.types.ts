import { Moment } from "moment";

export interface PrenotazioneData {
    id: number;
    nome: string;
    cognome: string;
    email?: string;
    numeroCell: string;
    dataPrenotazioneRaw: Moment;
    dataPrenotazione: string;
    sede: string;
    numPrenotazione: string;
    orarioPrenotazione: string;
}