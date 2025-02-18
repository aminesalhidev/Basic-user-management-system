import { Router, Request, Response } from 'express';
import pool from '../configurazione/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import { Validazione } from '../middleware/Validazione';
import dotenv from 'dotenv';
dotenv.config();
const router = Router();


router.get('/users', async (req: Request, res: Response) => {
  try {
    const risultato = await pool.query('SELECT * FROM users');
    res.json(risultato.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Abbiamo un problema nel recupero di tutti gli utenti' });
  }
});


router.post('/users', async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  try {
    const risultato = await pool.query('INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *', [name, email, age]);
    res.status(201).json(risultato.rows[0]);
  } catch (err) {
    console.error('Errore durante l\'aggiunta dell\'utente:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});


router.put('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name, email, age } = req.body;

  try {
    const risultato = await pool.query('UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *', [name, email, age, userId]);

    if (risultato.rows.length === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json(risultato.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Problema nell\'aggiornare l\'utente' });
  }
});


router.delete('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const risultato = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);

    if (risultato.rowCount === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json({ message: 'Utente eliminato con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Problema nell\'eliminare l\'utente' });
  }
});

export default router;
