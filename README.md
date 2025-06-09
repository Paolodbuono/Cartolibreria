<div align = "center">
    <img src="assets/images/SplashIcon.png" width="200" height="200" alt="Logo">
</div>


# 📚 Cartolibreria Bonagura - App Mobile per iOS e Android

**Cartolibreria Bonagura** è un'app mobile sviluppata con **React Native** ed **Expo**, pensata per semplificare l'interazione tra clienti e la cartolibreria. Con un'interfaccia intuitiva, l'app consente di prenotare appuntamenti, ordinare libri, consultare le adozioni scolastiche e gestire lo storico ordini in modo semplice e veloce. E' possibile inoltre visualizzare i libri disponibili presso le due sedi della Cartolibreria, una a Pompei e l'altra a Poggiomarino, così da poter scegliere comodamente dove ritirare i propri acquisti. 

---

## ✨ Funzionalità principali

- 📅 **Prenotazione appuntamenti**  
  Seleziona una data e un orario per prenotare la tua visita in negozio, evitando file e attese.

- 📚 **Ordine libri**  
  Acquista e ordina libri comodamente da casa, come se fossi in negozio.

- 🏫 **Adozioni scolastiche**  
  Consulta le liste dei libri scolastici

- 📦 **Storico e stato ordini**  
  Controlla lo stato dei tuoi ordini e rivedi gli acquisti passati.

- 👤 **Login e area riservata**  
  Accedi alla tua area personale per visualizzare dati e gestire preferenze.

- 📢 **Avvisi importanti**  
  Resta aggiornato su comunicazioni e novità del negozio.

- 💡 **Perché sceglierci**  
  Scopri i motivi per cui Cartolibreria Bonagura rende l’esperienza d’acquisto unica.

---

## 🧭 Navigazione

L'app utilizza **`expo-router`** per la gestione delle schermate principali:

| Percorso | Schermata                   |
|----------|-----------------------------|
| `/`      | Home                        |
| `/AppuntamentoView` | Prenota appuntamento     |
| `/MyOrdersView`     | I miei ordini             |
| `/AdozioniView`     | Liste scolastiche         |
| `/MyProfileView`    | Area riservata / Login    |
| `/NoticeView`       | Avvisi importanti         |
| `/WhyChoseUsView`   | Perché sceglierci         |
| `/ComodamenteDaCasaView` | CTA per ordini da casa   |

---

## 🛠️ Stack Tecnologico

- **React Native** + **Expo**
- **TypeScript**
- **Expo Router**
- **Axios** – per connessioni API
- **AsyncStorage** – per salvataggio dati utente

---

## 🎮 Contributors
Paolo Dello Buono,

Jennifer Viola Camicia.

### 📬 Contatti

Per segnalazioni o collaborazioni:

📧 **PaoloDelloBuono@gmail.com**

📧 **JenniferViolaCamicia@gmail.com**

---

## 🚀 Avvio rapido

### Requisiti
- [Node.js](https://nodejs.org) [>=18.x]
- [Expo CLI](https://docs.expo.dev/get-started/installation/) [compatibile con Expo SDK 52]
- Un emulatore Android/iOS o un dispositivo fisico

---
### Installazione

```bash
git clone https://github.com/Paolodbuono/Cartolibreria.git
cd Cartolibreria
npm install
npm start
