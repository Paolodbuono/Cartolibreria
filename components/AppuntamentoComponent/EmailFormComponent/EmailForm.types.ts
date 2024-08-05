// /src/types/types.ts

export interface EmailFormProps {
  nome: string;
  setNome: (nome: string) => void;
  cognome: string;
  setCognome: (cognome: string) => void;
  numeroCell: string;
  setNumroCell: (numeroCell: string) => void;
  handlePrenota: () => void;
  handleToggleModalInserInfo: () => void;
  prenotazioneDate: string;
}

export interface EmailFormHandle {
  handleClearChildState: () => void;
}
