import pool from '../configurazione/db';

//funziona connessione dabase Postgress
export const VerificaConnesione = async () => {
    try {
        await pool.query('SELECT * FROM users'); 
         console.log('Connessione al database Postgres riuscita');

    } catch (err){
        console.log('Errore di Connessione di database', err);

    }
}


export default VerificaConnesione;