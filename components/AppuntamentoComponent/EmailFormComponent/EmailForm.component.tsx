// /src/components/EmailForm.tsx

import React, { forwardRef } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { styles } from './EmailForm.styles';
import { EmailFormHandle, EmailFormProps } from './EmailForm.types';
import TextComponent from '@/components/Commons/Text.component';

const EmailForm = forwardRef<EmailFormHandle, EmailFormProps>(({ nome, setNome, cognome, setCognome, email, setEmail, numeroCell, setNumroCell, handlePrenota, handleToggleModalInserInfo, prenotazioneDate }, ref) => {
  return (
    <View style={styles.container}>
      <TextComponent style={styles.title}>Inserisci i tuoi dati:</TextComponent>
      <TextComponent style={styles.subTitle}>{prenotazioneDate}</TextComponent>

      <View style={styles.inputContainer}>
        <TextComponent style={styles.subTitle}>Nome</TextComponent>
        <TextInput style={styles.input} placeholder="Inserisci il tuo nome" value={nome} onChangeText={setNome} />

        <TextComponent style={styles.subTitle}>Cognome</TextComponent>
        <TextInput style={styles.input} placeholder="Inserisci il tuo cognome" value={cognome} onChangeText={setCognome} />

        <TextComponent style={styles.subTitle}>Email</TextComponent>
        <TextInput style={styles.input} placeholder="Inserisci la tua email" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <TextComponent style={styles.subTitle}>Numero di telefono</TextComponent>
        <TextInput style={styles.input} placeholder="Inserisci il tuo numero di telefono" value={numeroCell} onChangeText={setNumroCell} keyboardType="phone-pad" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{ ...styles.button, backgroundColor: 'red' }} onPress={handleToggleModalInserInfo}>
          <TextComponent style={styles.buttonText}>Annulla</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePrenota}>
          <TextComponent style={styles.buttonText}>Prenota</TextComponent>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default EmailForm;
