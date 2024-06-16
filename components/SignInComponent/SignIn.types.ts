export interface Field {
    label: string;
    placeholder: string;
    caption: string;
    type?: 'date' | 'email';
    formName: string;
}