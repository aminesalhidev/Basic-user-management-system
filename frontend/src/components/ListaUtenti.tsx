import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

interface Utente {
  id: number;
  name: string;
  email: string;
  age: number;
}

const ListaUtenti: React.FC = () => {
  const [utenti, setUtenti] = useState<Utente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [utenteDaModificare, setUtenteDaModificare] = useState<Utente | null>(null);
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [eta, setEta] = useState<number>(0);

  useEffect(() => {
    const caricaUtenti = async () => {
      try {
        const risposta = await axios.get('http://localhost:3000/api/users');
        setUtenti(risposta.data);
      } catch (error) {
        console.error('Errore di rete:', error);
        setError('Errore durante il caricamento degli utenti');
      } finally {
        setLoading(false);
      }
    };
    caricaUtenti();
  }, []);

  const eliminaUtente = async (id: number) => {
    if (!window.confirm(`Sei sicuro di voler eliminare l'utente con ID ${id}?`)) return;

    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUtenti(prevUtenti => prevUtenti.filter(utente => utente.id !== id));
      setSuccess('Utente eliminato con successo!');
    } catch (error) {
      console.error('Errore di rete:', error);
      setError('Errore durante l\'eliminazione dell\'utente');
    }
  };

  const modificaUtente = async () => {
    if (!utenteDaModificare) return;

    const utenteAggiornato = {
      ...utenteDaModificare,
      name: nome,  
      email: email, 
      age: eta,  
    };
    

    try {
      const response = await axios.put(`http://localhost:3000/api/users/${utenteAggiornato.id}`, utenteAggiornato);
      console.log('Risposta della modifica:', response);

      // Aggiorna lo stato degli utenti dopo la modifica
      setUtenti(prevUtenti =>
        prevUtenti.map(utente => (utente.id === utenteAggiornato.id ? utenteAggiornato : utente))
      );

      setSuccess('Utente modificato con successo!');
    } catch (error) {
      console.error('Errore nella modifica dell\'utente:', error);
      setError('Errore nel modificare l\'utente');
    }

    // Pulizia degli input alla fine dell'operazione
    setNome('');
    setEmail('');
    setEta(0);
    setUtenteDaModificare(null);
  };

  const apriModifica = (utente: Utente) => {
    setUtenteDaModificare(utente);
    setNome(utente.name);
    setEmail(utente.email);
    setEta(utente.age);
  };

  return (
    <div className='lista'>
      <h1>Lista Utenti</h1>
      {loading ? (
        <p>Caricamento in corso...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Età</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {utenti.map((utente) => (
                <tr key={utente.id}>
                  <td>{utente.name}</td>
                  <td>{utente.email}</td>
                  <td>{utente.age}</td>
                  <td>
                    <button className='BtnElimina' onClick={() => eliminaUtente(utente.id)}>Elimina utente</button>
                    <button className='Btnmodifica' onClick={() => apriModifica(utente)}> Modifica utente
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {utenteDaModificare && (
            <div>
              <h2 className='lista-utenti'>Modifica Utente</h2>

              <form onSubmit={(e) => { e.preventDefault(); modificaUtente(); }}>
                <div>
                  <label>Nome:</label>
                  <input type="text" value={nome.trim()} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label>Età:</label>
                  <input type="number" value={eta} onChange={(e) => setEta(Number(e.target.value))} required />
                </div>
                <button type="submit">Salva Modifiche</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListaUtenti;
