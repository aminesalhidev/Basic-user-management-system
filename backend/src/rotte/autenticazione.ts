import { Router, Request, Response } from 'express';
import pool from '../configurazione/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Validazione } from '../middleware/Validazione';
import { Autenticazione } from '../middleware/Autenticazione'; //in fase di implementazione.
import dotenv from 'dotenv';



//dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Rotta per la registrazione
router.post('/api/registrazione', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const risultato = await pool.query('SELECT * FROM utenti WHERE email = $1', [email]);
    if (risultato.rows.length > 0) {
      return res.status(400).json({ errore: 'Email già registrata' });
    }

    const passwordCriptata = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO utenti (email, password_hash) VALUES ($1, $2)', [email, passwordCriptata]);

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Errore durante la registrazione:', err);
    res.status(500).json({ errore: 'Errore interno del server' });
  }
});

// Rotta per il login
router.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const risultato = await pool.query('SELECT * FROM utenti WHERE email = $1', [email]);

    if (risultato.rows.length === 0) {
      return res.status(401).json({ errore: 'Credenziali non valide' });
    }

    const utente = risultato.rows[0];
    const passwordMatch = await bcrypt.compare(password, utente.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ errore: 'Credenziali non valide' });
    }

    const token = jwt.sign({ id: utente.id, email: utente.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Errore durante il login:', err);
    res.status(500).json({ errore: 'Errore interno del server' });
  }
});


export default Autenticazione;
