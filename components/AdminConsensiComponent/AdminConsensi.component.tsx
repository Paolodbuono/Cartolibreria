import React, { useMemo, useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, ActivityIndicator as Spinner, Dimensions } from 'react-native';
import axios from 'axios';

import TextComponent from '../Commons/Text.component';
import { styles } from './AdminConsensi.styles';
import { CONSENSI_LIST_ENDPOINT, CONSENSI_DELETE_ENDPOINT } from '@/utils/consensoWhatsApp';
import { gs } from '@/style/globalStyles';

interface ConsensoRecord {
    nome: string;
    telefono: string;
    stato: string;
    data_ora: string;
    provenienza: string;
}

type StatoFilter = 'tutti' | 'si' | 'no' | 'revocato';

const isPhone = Dimensions.get('window').width < 768;

const FILTERS: { key: StatoFilter; label: string }[] = [
    { key: 'tutti', label: 'Tutti' },
    { key: 'si', label: 'SI' },
    { key: 'no', label: 'NO' },
    { key: 'revocato', label: 'Revocato' },
];

const formatDate = (raw: string) => {
    const normalized = raw.replace('T', ' ').slice(0, 19);
    const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);
    if (!match) return raw;
    const [, y, m, d, hh, mm] = match;
    return `${d}/${m}/${y} ${hh}:${mm}`;
};

const statoBadgeStyle = (stato: string) => {
    if (stato === 'si') return styles.badgeSi;
    if (stato === 'no') return styles.badgeNo;
    return styles.badgeRevocato;
};

const statoLabel = (stato: string) => {
    if (stato === 'si') return 'SI';
    if (stato === 'no') return 'NO';
    return 'REVOCATO';
};

const AdminConsensiComponent: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [authStatus, setAuthStatus] = useState<'locked' | 'loading' | 'ok'>('locked');
    const [records, setRecords] = useState<ConsensoRecord[]>([]);
    const [search, setSearch] = useState<string>('');
    const [statoFilter, setStatoFilter] = useState<StatoFilter>('tutti');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [confirmDelete, setConfirmDelete] = useState<string>('');

    const load = (pwd: string) => {
        setAuthStatus('loading');
        setError('');
        axios.get(CONSENSI_LIST_ENDPOINT, { params: { password: pwd } })
            .then((res) => {
                if (res.data?.Error) {
                    setError(res.data.Error);
                    setAuthStatus('locked');
                    return;
                }
                setRecords(Array.isArray(res.data) ? res.data : []);
                setAuthStatus('ok');
                setLoading(false);
            })
            .catch(() => {
                setError('Accesso negato o errore nel caricamento dei consensi.');
                setAuthStatus('locked');
            });
    };

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        const queryDigits = search.replace(/[^\d]/g, '');
        return records.filter((r) => {
            const matchStato = statoFilter === 'tutti' || r.stato === statoFilter;
            if (!matchStato) return false;
            if (query === '' && queryDigits === '') return true;
            const inNome = r.nome.toLowerCase().includes(query);
            const inTelefono = queryDigits !== '' && r.telefono.includes(queryDigits);
            return inNome || inTelefono;
        });
    }, [records, search, statoFilter]);

    const handleDelete = (telefono: string) => {
        if (confirmDelete !== telefono) {
            setConfirmDelete(telefono);
            return;
        }
        setConfirmDelete('');
        axios.post(CONSENSI_DELETE_ENDPOINT, { password, telefono })
            .then((res) => {
                if (res.data?.Error) {
                    setError(res.data.Error);
                    return;
                }
                setRecords((prev) => prev.filter((r) => r.telefono !== telefono));
            })
            .catch(() => {
                setError('Errore nella cancellazione.');
            });
    };

    if (authStatus === 'locked') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2', padding: 16 }}>
                <View style={styles.card}>
                    <TextComponent style={styles.title}>Area riservata</TextComponent>
                    <TextComponent style={styles.subtitle}>Inserisci la password per consultare i consensi</TextComponent>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {error !== '' && <TextComponent style={styles.error}>{error}</TextComponent>}
                    <TouchableOpacity style={styles.loginBtn} onPress={() => load(password)}>
                        <TextComponent style={styles.loginBtnLabel}>Accedi</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (authStatus === 'loading' || loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' }}>
                <Spinner size="large" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.page} contentContainerStyle={{ alignItems: 'center', padding: 16 }}>
            <View style={styles.card}>
                <TextComponent style={styles.title}>Elenco consensi WhatsApp</TextComponent>
                <TextComponent style={styles.subtitle}>Consulta chi ha autorizzato o negato le comunicazioni WhatsApp</TextComponent>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Cerca per nome o numero di telefono"
                    value={search}
                    onChangeText={setSearch}
                />

                <View style={styles.filterRow}>
                    {FILTERS.map((f) => (
                        <TouchableOpacity
                            key={f.key}
                            style={[styles.chip, statoFilter === f.key && styles.chipActive]}
                            onPress={() => setStatoFilter(f.key)}
                        >
                            <TextComponent style={statoFilter === f.key ? styles.chipLabelActive : styles.chipLabel}>
                                {f.label}
                            </TextComponent>
                        </TouchableOpacity>
                    ))}
                </View>

                <TextComponent style={styles.countText}>
                    {filtered.length} {filtered.length === 1 ? 'risultato' : 'risultati'}
                </TextComponent>

                {isPhone ? (
                    filtered.length === 0 ? (
                        <TextComponent style={styles.empty}>Nessun consenso trovato</TextComponent>
                    ) : (
                        filtered.map((r, idx) => (
                            <View style={styles.cardItem} key={idx}>
                                <View style={styles.cardRow}>
                                    <TextComponent style={styles.cardLabel}>Nome</TextComponent>
                                    <TextComponent style={styles.cardValue}>{r.nome || '-'}</TextComponent>
                                </View>
                                <View style={styles.cardRow}>
                                    <TextComponent style={styles.cardLabel}>Telefono</TextComponent>
                                    <TextComponent style={styles.cardValue}>{r.telefono}</TextComponent>
                                </View>
                                <View style={styles.cardRow}>
                                    <TextComponent style={styles.cardLabel}>Stato</TextComponent>
                                    <TextComponent style={statoBadgeStyle(r.stato)}>{statoLabel(r.stato)}</TextComponent>
                                </View>
                                <View style={styles.cardRow}>
                                    <TextComponent style={styles.cardLabel}>Data</TextComponent>
                                    <TextComponent style={styles.cardValue}>{formatDate(r.data_ora)}</TextComponent>
                                </View>
                                <View style={styles.cardRow}>
                                    <TextComponent style={styles.cardLabel}>Provenienza</TextComponent>
                                    <TextComponent style={styles.cardValue}>{r.provenienza}</TextComponent>
                                </View>
                                <TouchableOpacity
                                    style={[styles.deleteBtn, confirmDelete === r.telefono && styles.deleteBtnConfirm]}
                                    onPress={() => handleDelete(r.telefono)}
                                >
                                    <TextComponent style={styles.deleteBtnLabel}>
                                        {confirmDelete === r.telefono ? 'Confermi?' : 'Elimina'}
                                    </TextComponent>
                                </TouchableOpacity>
                            </View>
                        ))
                    )
                ) : (
                    <>
                        <View style={styles.tableHeader}>
                            <TextComponent style={[styles.headerCell, styles.colNome]}>Nome</TextComponent>
                            <TextComponent style={[styles.headerCell, styles.colTelefono]}>Telefono</TextComponent>
                            <TextComponent style={[styles.headerCell, styles.colStato]}>Stato</TextComponent>
                            <TextComponent style={[styles.headerCell, styles.colData]}>Data</TextComponent>
                            <TextComponent style={[styles.headerCell, styles.colProvenienza]}>Provenienza</TextComponent>
                            <TextComponent style={[styles.headerCell, styles.colAzioni]}>Azioni</TextComponent>
                        </View>
                        {filtered.length === 0 ? (
                            <TextComponent style={styles.empty}>Nessun consenso trovato</TextComponent>
                        ) : (
                            filtered.map((r, idx) => (
                                <View style={styles.tableRow} key={idx}>
                                    <TextComponent style={[styles.cell, styles.colNome]}>{r.nome || '-'}</TextComponent>
                                    <TextComponent style={[styles.cell, styles.colTelefono]}>{r.telefono}</TextComponent>
                                    <TextComponent style={[styles.cell, styles.colStato, statoBadgeStyle(r.stato)]}>{statoLabel(r.stato)}</TextComponent>
                                    <TextComponent style={[styles.cell, styles.colData]}>{formatDate(r.data_ora)}</TextComponent>
                                    <TextComponent style={[styles.cell, styles.colProvenienza]}>{r.provenienza}</TextComponent>
                                    <View style={styles.colAzioni}>
                                        <TouchableOpacity
                                            style={[styles.deleteBtn, confirmDelete === r.telefono && styles.deleteBtnConfirm]}
                                            onPress={() => handleDelete(r.telefono)}
                                        >
                                            <TextComponent style={styles.deleteBtnLabel}>
                                                {confirmDelete === r.telefono ? 'Confermi?' : 'Elimina'}
                                            </TextComponent>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
};

export default AdminConsensiComponent;
