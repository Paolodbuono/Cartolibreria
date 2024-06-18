// /src/types/types.ts

export interface EmailFormProps {
    nome: string;
    setNome: (nome: string) => void;
    cognome: string;
    setCognome: (cognome: string) => void;
    email: string;
    setEmail: (email: string) => void;
    numeroCell: string;
    setNumroCell: (numeroCell: string) => void;
    orariMattino: Array<{ key: number; label: string }>;
    orariMattinoValue: string[];
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    minutiMattino: Array<{ key: number; label: string }>;
    minutiMattinoValue: string[];
    selectedIndexMinuti: number;
    setSelectedIndexMinuti: (index: number) => void;
    handlePrenota: () => void;
  }
  
  export interface EmailFormHandle {
    handleClearChildState: () => void;
  }
  