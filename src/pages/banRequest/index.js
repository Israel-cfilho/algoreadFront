import { useState } from 'react';
import './banRequest.css';

const BanRequest = ({ idUsuario, onSolicitarBanimento }) => {
  const [showForm, setShowForm] = useState(false);
  const [justificativa, setJustificativa] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (justificativa.trim() === '') {
      setErro('A justificativa é obrigatória.');
      return;
    }
    onSolicitarBanimento(idUsuario, justificativa);
    setShowForm(false);
    setJustificativa('');
    setErro('');
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        Solicitar Banimento
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-banimento">
          <textarea
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
            placeholder="Justifique a solicitação de banimento"
            rows="3"
            required
          />
          {erro && <p className="erro">{erro}</p>}
          <button type="submit">Enviar Solicitação</button>
        </form>
      )}
    </div>
  );
};

export default BanRequest;