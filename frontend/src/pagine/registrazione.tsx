// frontend/src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const FunzioneRegistrati = async () => {

    try {
      const risposta = await axios.post('http://localhost:3000/api/auth/registrazione', { email, password });
      alert('Registrazione avvenuta con successo!');
      console.log('...')
      console.log(risposta);

      window.location.href = '/accedi'; // Reindirizza alla pagina di login
    } catch (err) {
      setError('Errore nella registrazione');
    }
  };

  return (
    <div> <br /><br /><br />
      <h2>Registrazione</h2>
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
      <button onClick={FunzioneRegistrati}>Registerazione</button>
      <p>Già registrato? <a href="/accedi">Accedi qui</a></p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
