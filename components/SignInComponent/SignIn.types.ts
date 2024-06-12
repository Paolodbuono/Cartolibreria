export interface Field {
    label: string;
    placeholder: string;
    caption: string;
    type?: 'date' | 'email';
    formName: string;
}

export interface Props {
    navigation: {
        navigate: (screen: string) => void;
    };
}