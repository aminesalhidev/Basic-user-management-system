import express, { NextFunction, Request, Response } from 'express';
import pool from '../configurazione/db';

export const Validazione = async (req: Request, res: Response, next: NextFunction) =>  {
    const { name, email, age } = req.body;
    const Emailesistente = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (Emailesistente.rows.length > 0) {
      return res.status(400).json({ error: 'L\'email è già in uso.(inserisci una nuova email)' });
    }
    
    if(!name.trim() || !email || age <= 0) {
      return res.status(400).json({ error: 'Tutti i campi sono obbligatori e l\'età deve essere maggiore di 0.' });
    }
    
    next();
}

export default Validazione;