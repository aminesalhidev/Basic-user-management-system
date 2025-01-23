import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const Autenticazione = (req: Request, res: Response, next: NextFunction) => {
    const intestazioneAutenticazione = req.headers.authorization;

    if (!intestazioneAutenticazione) {
        return res.status(401).json({ errore: 'Token mancante' });
    }

    const token = intestazioneAutenticazione.split(' ')[1];

    if (!token) {
        return res.status(401).json({ errore: 'Token mancante' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (errore, utente) => {
        if (errore) {
            return res.status(403).json({ errore: 'Token non valido' });
        }

        // Aggiungi l'utente alla richiesta
       // req.user = utente; 
        next(); 
    });
};

export default Autenticazione;
