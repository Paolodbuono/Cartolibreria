// /src/components/EmailForm.tsx

import React, { forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
    orariMattino,
    orariMattinoValue,
    selectedIndex,
    setSelectedIndex,
    minutiMattino,
    minutiMattinoValue,
    selectedIndexMinuti,
    setSelectedIndexMinuti,
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
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Cognome"
        value={cognome}
        onChangeText={setCognome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Numero di telefono"
        value={numeroCell}
        onChangeText={setNumroCell}
        keyboardType="phone-pad"
      />
      <Text style={styles.subTitle}>Seleziona l'orario</Text>
      <Picker
        selectedValue={orariMattinoValue[selectedIndex]}
        onValueChange={(itemValue, itemIndex) => setSelectedIndex(itemIndex)}
      >
        {orariMattino.map((orario, index) => (
          <Picker.Item key={index} label={orario.label} value={orario.key} />
        ))}
      </Picker>
      <Text style={styles.subTitle}>Seleziona i minuti</Text>
      <Picker
        selectedValue={minutiMattinoValue[selectedIndexMinuti]}
        onValueChange={(itemValue, itemIndex) => setSelectedIndexMinuti(itemIndex)}
      >
        {minutiMattino.map((minuto, index) => (
          <Picker.Item key={index} label={minuto.label} value={minuto.key} />
        ))}
      </Picker>
      <Button title="Prenota" onPress={handlePrenota} />
    </View>
  );
});

export default EmailForm;
