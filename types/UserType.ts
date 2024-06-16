export interface UserType {
    ID: number;
    nome: string;
    indirizzo: string;
    cap: string;
    citta: string;
    prov: string;
    piva: string | null;
    email: string;
    telefono: string | null;
    fax: string | null;
    codfisc: string | null;
    sitoweb: string;
    telefono2: string;
    cellulare: string;
    cardpunti: string;
    cardcodice: string;
    sconto: number;
    nazione: string;
    password: string;
}


export const emptyUser: UserType = {
    ID: 0,
    nome: "",
    indirizzo: "",
    cap: "",
    citta: "",
    prov: "",
    piva: null,
    email: "",
    telefono: null,
    fax: null,
    codfisc: null,
    sitoweb: "",
    telefono2: "",
    cellulare: "",
    cardpunti: "",
    cardcodice: "",
    sconto: 0,
    nazione: "",
    password: ""
};