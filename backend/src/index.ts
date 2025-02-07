import express from 'express';
import { VerificaConnesione } from './middleware/VerificaConnessione';
import cors from 'cors';

import router from './rotte/router';
//import Autenticazione from './rotte/autenticazione';

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurazione CORS
app.use(cors({ 
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));


//app.use('/api/auth',Autenticazione);
app.use('/api', router); 


const startServer = async () => {
  try {
      await VerificaConnesione();
      app.listen(port, () => {
          console.log(`Server in ascolto sulla porta ${port}`);
      });
  } catch (err) {
      console.error('Impossibile avviare il server:', err);
      process.exit(1);
  }
};

startServer();
