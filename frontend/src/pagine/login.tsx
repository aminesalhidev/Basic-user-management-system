import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 
  const navigate = useNavigate(); // Hook per la navigazione

  const FunzioneAccedi = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      const { token } = response.data;
      if (!token) {
        console.error('Token non ricevuto dal server');
      } else {
        alert('Accesso avvenuto con successo!');
        navigate('/');
      }
    } catch (err: any) {
      console.error('Errore durante il login:', err);
      setError(err.response?.data?.message || 'Credenziali non valide');
    }
  };

  return (
    <div> <br /><br /><br />
      <h2>Accedi </h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className='buttoneAccedi' onClick={FunzioneAccedi}>Accedi</button>
      <p>Non hai un account? <a href="/registrazione">Registrati qui</a></p>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
