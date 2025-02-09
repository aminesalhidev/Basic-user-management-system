// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListaUtenti from './components/ListaUtenti';
import AggiungiUtente from './components/AggiungiUtente';
import Navbar from './components/Navbar';
//import Login from './pagine/login';
//import Registrazione from './pagine/registrazione';
import './App.css';


const App: React.FC = () => {

  return (
    <Router>
      <div>
      < Navbar/>
        <Routes>

          {/*implementazione del token 70% 
        <Route path="/registrazione" element={<Registrazione />} />
        <Route path="/accedi" element={<Login />} />
        */}


          <Route path="/" element={<Home />} />
          <Route path="/lista-utenti" element={<ListaUtenti />} />     
          <Route path="/aggiungi-utente" element={<AggiungiUtente />} />          
        </Routes>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <div className='div-home'>
      <h1>Benvenuto nella Gestione Utenti {}</h1>
      <p>
        Usa il menu di navigazione per accedere alle diverse sezioni dell'applicazione.
      </p>
    
      <Link to="/aggiungi-utente" className="button">+ utente</Link>

    </div>
  );
}  

export default App;
