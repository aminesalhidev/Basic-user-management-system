# Sistema di Gestione Utenti

Il progetto consiste nello sviluppo di un sistema base di gestione utenti. L'applicazione permette di visualizzare una lista di utenti e di aggiungerne di nuovi. Il backend gestisce le operazioni CRUD (Create, Read, Update, Delete) sugli utenti utilizzando TypeScript e SQL, mentre il frontend mostra i dati e fornisce un'interfaccia semplice per l'interazione.

## Requisiti del Progetto

### 1. Backend in TypeScript

#### Framework: 
- Node.js con Express.

#### API RESTful da implementare:

- `GET /users`: Recupera la lista di tutti gli utenti.
- `POST /users`: Aggiunge un nuovo utente. (Richiede un payload JSON con i dettagli dell'utente).
- `PUT /users/:id`: Modifica i dettagli di un utente esistente tramite il suo ID.
- `DELETE /users/:id`: Rimuove un utente dal sistema tramite il suo ID.

#### Validazione dei Dati:
- Assicurarsi che tutti i campi obbligatori siano presenti e validi.

#### Gestione degli Errori:
- Restituire messaggi di errore chiari se l'operazione fallisce (ad esempio, se un ID non esiste o i dati inviati non sono validi).

### 2. Database SQL

#### Scelta del Database:
- PostgreSQL.

#### Schema della Tabella `users`:

- `id`: Chiave primaria, auto-incrementale.
- `name`: Nome dell'utente.
- `email`: Indirizzo email (unico per ciascun utente).
- `age`: Età dell'utente.

#### Query SQL:
Implementare le operazioni CRUD per gli utenti.

### 3. Frontend in React e TypeScript

#### Pagina Utenti:
- Creare una pagina che mostri l'elenco degli utenti in una tabella.
- Ogni riga della tabella dovrebbe visualizzare il nome, l'email e l'età di un utente.
- Aggiungere un pulsante per eliminare un utente.

#### Aggiungi Utente:
- Creare un form con campi per nome, email ed età.
- Permettere agli utenti di aggiungere nuovi utenti al sistema tramite il form.
- Validazione dei campi (ad esempio, assicurarsi che l'età sia un numero maggiore di 0, che l'email sia valida, che tutti i campi siano obbligatori).

#### Chiamate API:
- Effettuare chiamate API per recuperare, aggiungere ed eliminare utenti.
- Gestire gli stati di caricamento e gli errori durante le chiamate API.

#### Semplicità dell'Interfaccia:
- L'interfaccia è minimale e non è necessario utilizzare framework avanzati per il design.

### 4. Obiettivi del Test

- **Competenze in TypeScript** (Backend e Frontend): Capacità di lavorare con TypeScript sia nel backend (Node.js) che nel frontend (React).
- **Competenze in SQL**: Abilità di gestire un database SQL e scrivere query semplici per le operazioni CRUD.
- **Integrazione Frontend e Backend**: Capacità di integrare un frontend React con un backend tramite chiamate API RESTful.
- **Semplicità e Chiarezza del Codice**: Scrivere codice pulito e ben organizzato con componenti React chiari e separati.


## Istruzioni per l'Installazione

1. **Clona il repository**:
   ```bash
   git clone https://github.com/tuo-utente/progetto-gestione-utenti.git
   cd progetto-gestione-utenti
