import React, { useState } from 'react';
import axios from 'axios';

const AggiungiUtente: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const convalida = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name.trim() || !email || age <= 0) {
      setError('Tutti i campi sono obbligatori e l\'età deve essere maggiore di 0.');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('L\'email non è valida.');
      return;
    }
  
    setLoading(true);
  
    try {
      await axios.post('http://localhost:3000/api/users', { name: name.trim(), email, age });
      setSuccess('Utente aggiunto con successo!');
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Errore durante l\'aggiunta dell\'utente:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.error : 'Errore durante l\'aggiunta dell\'utente.');
      } else {
        console.error('Errore sconosciuto:', error);
        setError('Errore sconosciuto durante l\'aggiunta dell\'utente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className='lista'>
      <h1>Aggiungi Utente</h1>
      <form className='group' onSubmit={convalida}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
           <label>Età:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Aggiungendo...' : 'Aggiungi Utente'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AggiungiUtente;
