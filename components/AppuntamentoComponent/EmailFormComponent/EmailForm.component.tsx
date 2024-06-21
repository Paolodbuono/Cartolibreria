// /src/components/EmailForm.tsx

import React, { forwardRef } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { styles } from './EmailForm.styles';
import { EmailFormHandle, EmailFormProps } from './EmailForm.types';

const EmailForm = forwardRef<EmailFormHandle, EmailFormProps>(({ nome, setNome, cognome, setCognome, email, setEmail, numeroCell, setNumroCell, handlePrenota, handleToggleModalInserInfo, prenotazioneDate }, ref) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserisci i tuoi dati:</Text>
      <Text style={styles.subTitle}>{prenotazioneDate}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.subTitle}>Nome</Text>
        <TextInput style={styles.input} placeholder="Inserisci il tuo nome" value={nome} onChangeText={setNome} />

        <Text style={styles.subTitle}>Cognome</Text>
        <TextInput style={styles.input} placeholder="Inserisci il tuo cognome" value={cognome} onChangeText={setCognome} />

        <Text style={styles.subTitle}>Email</Text>
        <TextInput style={styles.input} placeholder="Inserisci la tua email" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.subTitle}>Numero di telefono</Text>
        <TextInput style={styles.input} placeholder="Inserisci il tuo numero di telefono" value={numeroCell} onChangeText={setNumroCell} keyboardType="phone-pad" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{ ...styles.button, backgroundColor: 'red' }} onPress={handleToggleModalInserInfo}>
          <Text style={styles.buttonText}>Annulla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePrenota}>
          <Text style={styles.buttonText}>Prenota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default EmailForm;
