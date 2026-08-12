export const CONSENT_VERSION = '1.0';

export const CONSENT_TEXT = "Acconsento a ricevere tramite WhatsApp da Cartolibreria Bonagura S.r.l. comunicazioni informative e commerciali relative a prodotti, servizi, disponibilità, compravendita di libri nuovi e usati, promozioni e iniziative dell'attività.";

export const PRIVACY_POLICY_URL = './privacy-policy.html';

const DEFAULT_API = 'https://www.libreriabonagura.it';
const envApi = process.env.EXPO_PUBLIC_API_URL as string | undefined;
const API_BASE = (envApi && envApi.trim() !== '' ? envApi : DEFAULT_API).replace(/\/+$/, '');

export const CONSENT_ENDPOINT = `${API_BASE}/micro/consenso_wa.asp`;

export const REVOCA_ENDPOINT = `${API_BASE}/micro/consenso_wa_revoca.asp`;

export const CONSENSI_LIST_ENDPOINT = `${API_BASE}/micro/consensi_wa_list.asp`;

export const CONSENSI_DELETE_ENDPOINT = `${API_BASE}/micro/consenso_wa_delete.asp`;
