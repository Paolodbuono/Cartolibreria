import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator as Spinner, Linking, ScrollView, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import TextComponent from '../Commons/Text.component';
import { styles } from './ConsensoWhatsApp.styles';
import { CONSENT_ENDPOINT, CONSENT_TEXT, CONSENT_VERSION, PRIVACY_POLICY_URL } from '@/utils/consensoWhatsApp';
import { gs } from '@/style/globalStyles';

type Status = 'form' | 'loading' | 'success';
type ConsentResult = 'si' | 'no';

const ConsensoWhatsAppComponent: React.FC = () => {
    const params = useLocalSearchParams();
    const [phone, setPhone] = useState<string>('');
    const [consensoWhatsApp, setConsensoWhatsApp] = useState<boolean>(false);
    const [presaVisionePrivacy, setPresaVisionePrivacy] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<Status>('form');
    const [consentResult, setConsentResult] = useState<ConsentResult>('si');
    const [confirmDeclineVisible, setConfirmDeclineVisible] = useState<boolean>(false);

    useEffect(() => {
        const value = params.phone;
        if (value) {
            const raw = Array.isArray(value) ? value[0] : value;
            setPhone(raw.replace(/[^\d]/g, ''));
        }
    }, [params.phone]);

    const provenienza = () => {
        const src = params.src;
        const value = src ? (Array.isArray(src) ? src[0] : src) : undefined;
        return value === 'sms' ? 'campagna sms' : 'pagina web';
    };

    const validate = (): boolean => {
        setError('');
        const normalized = phone.replace(/[^\d]/g, '');
        if (normalized.length < 10 || normalized.length > 13) {
            setError('Inserisci un numero di cellulare valido.');
            return false;
        }
        if (!presaVisionePrivacy) {
            setError('Devi prendere visione dell\'informativa privacy.');
            return false;
        }
        return true;
    };

    const submit = async (stato: ConsentResult) => {
        setConsentResult(stato);
        setStatus('loading');
        try {
            const body = new URLSearchParams();
            body.append('telefono', phone.replace(/[^\d]/g, ''));
            body.append('versione', CONSENT_VERSION);
            body.append('provenienza', provenienza());
            body.append('stato', stato);
            const res = await axios.post(CONSENT_ENDPOINT, body);
            if (res.data?.Status === 'ok') {
                setStatus('success');
            } else {
                setStatus('form');
                setError(res.data?.Error || 'Si è verificato un errore durante la registrazione del consenso.');
            }
        } catch (e) {
            setStatus('form');
            setError('Errore di connessione al server. Riprova più tardi.');
        }
    };

    const handleSubmit = () => {
        if (!validate()) return;
        if (!consensoWhatsApp) {
            setConfirmDeclineVisible(true);
            return;
        }
        submit('si');
    };

    const handleConfirmDecline = () => {
        setConfirmDeclineVisible(false);
        submit('no');
    };

    const handleCancelDecline = () => {
        setConfirmDeclineVisible(false);
        setConsensoWhatsApp(true);
    };

    return (
        <ScrollView
            style={styles.page}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
            {status === 'loading' && <View style={gs.spinner} children={<Spinner size="large" />} />}
            {status === 'success' ? (
                <View style={[styles.card, styles.confirmMarginTop]}>
                    {consentResult === 'si' ? (
                        <>
                            <TextComponent style={styles.confirmTitleOk}>Grazie!</TextComponent>
                            <TextComponent style={styles.confirmText}>
                                La tua autorizzazione a ricevere le comunicazioni di Cartolibreria Bonagura tramite WhatsApp è stata registrata.
                            </TextComponent>
                            <TextComponent style={styles.confirmText}>
                                Potrai revocarla in qualsiasi momento rispondendo STOP ai nostri messaggi.
                            </TextComponent>
                        </>
                    ) : (
                        <>
                            <TextComponent style={styles.confirmTitleOk}>Nessun problema!</TextComponent>
                            <TextComponent style={styles.confirmText}>
                                Abbiamo registrato che non autorizzi le comunicazioni WhatsApp. Tutto è stato salvato correttamente.
                            </TextComponent>
                            <TextComponent style={styles.confirmText}>
                                Puoi modificare questa scelta in qualsiasi momento.
                            </TextComponent>
                        </>
                    )}
                </View>
            ) : (
                <View style={styles.card}>
                    <TextComponent style={styles.title}>Autorizza le comunicazioni WhatsApp</TextComponent>
                    <TextComponent style={styles.subtitle}>
                        Inserisci il numero di cellulare su cui vuoi ricevere le comunicazioni WhatsApp da Cartolibreria Bonagura.
                    </TextComponent>

                    <TextComponent style={styles.label}>Numero di cellulare *</TextComponent>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Es. 3331234567"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <View style={styles.consentBox}>
                        <TextComponent style={styles.consentText}>{CONSENT_TEXT}</TextComponent>
                    </View>

                    <View style={styles.section}>
                        <Checkbox
                            style={styles.checkbox}
                            value={consensoWhatsApp}
                            onValueChange={setConsensoWhatsApp}
                            color={consensoWhatsApp ? '#25D366' : undefined}
                            accessibilityLabel="Autorizzo le comunicazioni WhatsApp"
                        />
                        <View style={{ flex: 1 }}>
                            <TextComponent style={styles.checkLabel}>
                                Autorizzo l'invio delle comunicazioni WhatsApp sopra indicate
                            </TextComponent>
                            <TextComponent style={styles.checkCaption}>
                                Se non selezioni questa opzione non ti invieremo comunicazioni WhatsApp.
                            </TextComponent>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Checkbox
                            style={styles.checkbox}
                            value={presaVisionePrivacy}
                            onValueChange={setPresaVisionePrivacy}
                            color={presaVisionePrivacy ? '#25D366' : undefined}
                            accessibilityLabel="Ho preso visione dell'informativa privacy"
                        />
                        <TextComponent style={styles.checkLabel}>
                            Ho preso visione dell'{" "}
                            <TextComponent style={styles.privacyLink} onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
                                informativa privacy
                            </TextComponent>
                        </TextComponent>
                    </View>

                    {error !== '' && <TextComponent style={styles.errorText}>{error}</TextComponent>}

                    <TouchableOpacity onPress={handleSubmit} style={styles.sendBtn}>
                        <MaterialCommunityIcons name="hand-pointing-right" size={22} color="#ffffff" style={styles.sendBtnIcon} />
                        <TextComponent style={styles.sendBtnLabel}>AUTORIZZA LE COMUNICAZIONI WHATSAPP</TextComponent>
                    </TouchableOpacity>
                </View>
            )}

            <Modal
                visible={confirmDeclineVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setConfirmDeclineVisible(false)}
            >
                <View style={styles.confirmOverlay}>
                    <View style={styles.confirmModal}>
                        <TextComponent style={styles.confirmTitle}>Conferma</TextComponent>
                        <TextComponent style={styles.confirmBody}>
                            Non hai selezionato l'autorizzazione a ricevere le comunicazioni WhatsApp da Cartolibreria Bonagura. Sei sicuro di non volerle ricevere?
                        </TextComponent>
                        <View style={styles.confirmBtnRow}>
                            <TouchableOpacity style={[styles.confirmBtn, styles.confirmBtnSecondary]} onPress={handleCancelDecline}>
                                <TextComponent style={styles.confirmBtnLabel}>No, voglio autorizzare</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.confirmBtn, styles.confirmBtnPrimary]} onPress={handleConfirmDecline}>
                                <TextComponent style={styles.confirmBtnLabelPrimary}>Sì, sono sicuro</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default ConsensoWhatsAppComponent;
