// /src/components/EmailForm.tsx

import React, { forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

import { styles } from './EmailForm.styles';
import { EmailFormHandle, EmailFormProps } from './EmailForm.types';

const EmailForm = forwardRef<EmailFormHandle, EmailFormProps>((props, ref) => {
  const { 
    nome,
    setNome,
    cognome,
    setCognome,
    email,
    setEmail,
    numeroCell,
    setNumroCell,
    handlePrenota,
  } = props;

  const handleClearChildState = () => {
    setNome('');
    setCognome('');
    setEmail('');
    setNumroCell('');
  };

  useImperativeHandle(ref, () => ({
    handleClearChildState,
  }));

  return (
    <View>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Cognome" value={cognome} onChangeText={setCognome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Numero di telefono" value={numeroCell} onChangeText={setNumroCell} keyboardType="phone-pad" />
      <Button title="Prenota" onPress={handlePrenota} />
    </View>
  );
});

export default EmailForm;
