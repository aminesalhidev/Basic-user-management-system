// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/lista-utenti">Lista Utenti</Link>
        </li>
        <li>
          <Link to="/aggiungi-utente">Aggiungi Utente</Link>
        </li>
        <li>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
