export type OrderType = {
    ISBN: string;
    AUTORE: string;
    TITOLO: string;
    EDITORE: string;
    TCOPIE: number;
    prezzo: number;
    flag: 1 | 2 | 3 | 4 | 5 | 6 | 8;
    stato?: string;
}

export type OrderStatusType = {
    [key: number]: string;
};
