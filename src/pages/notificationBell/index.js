import { useState, useEffect } from 'react';
import './notificationBell.css';

const NotificationBell = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [novasNotificacoes, setNovasNotificacoes] = useState(0);


  const fetchNotificacoes = async () => {
    try {
      const response = await fetch('SUA_API_ENDPOINT'); // endpoint correto
      if (!response.ok) {
        throw new Error('Erro ao buscar notificações');
      }
      const data = await response.json();
      setNotificacoes(data); //API deve retornar um array de notificações
      setNovasNotificacoes(data.length); // Atualiza o número de novas notificações
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  // Chama a API ao montar o componente
  useEffect(() => {
    fetchNotificacoes();
  }, []);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    setNovasNotificacoes(0); // Marca como lidas ao clicar
  };

  return (
    <div className="notification-bell-container">
      <div className="bell-icon" onClick={handleBellClick}>
        <i className="fas fa-bell"></i>
        {novasNotificacoes > 0 && (
          <span className="notification-badge">{novasNotificacoes}</span>
        )}
      </div>

      {isOpen && (
        <div className="notifications-modal">
          <h4>Notificações</h4>
          <ul className="notifications-list">
            {notificacoes.length > 0 ? (
              notificacoes.map((notificacao, index) => (
                <li key={index} className="notification-item">
                  <p><strong>Motivo:</strong> {notificacao.motivo}</p>
                  <p><strong>Data:</strong> {notificacao.data}</p>
                </li>
              ))
            ) : (
              <p>Nenhuma notificação no momento.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;