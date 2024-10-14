import { useState, useEffect } from 'react';
import './reportPage.css';

const ReportsPage = () => {
  const [denuncias, setDenuncias] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [publicacoesOcultadas, setPublicacoesOcultadas] = useState([]);
  const [solicitacoesBanimento, setSolicitacoesBanimento] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioParaBanimento, setUsuarioParaBanimento] = useState(null);
  const [justificativa, setJustificativa] = useState('');

  // Função para buscar denúncias da API
  const fetchDenuncias = async () => {
    try {
      const response = await fetch('SUA_API_ENDPOINT'); // Substitua com o endpoint da sua API
      if (!response.ok) {
        throw new Error('Erro ao buscar denúncias');
      }
      const data = await response.json();
      setDenuncias(data); // Supondo que a API retorna um array de denúncias
    } catch (error) {
      console.error('Erro ao buscar denúncias:', error);
    }
  };

  useEffect(() => {
    fetchDenuncias(); // Chama a API ao montar o componente
  }, []);

  const filtrarDenuncias = () => {
    if (filtro) {
      return denuncias.filter((denuncia) => denuncia.tipoViolacao === filtro);
    }
    return denuncias;
  };

  const isPublicacaoOcultada = (idUsuario) => {
    return publicacoesOcultadas.includes(idUsuario);
  };

  const ocultarPublicacao = (idUsuario) => {
    setPublicacoesOcultadas((prevOcultadas) => [...prevOcultadas, idUsuario]);
  };

  const abrirModalBanimento = (idUsuario) => {
    setUsuarioParaBanimento(idUsuario);
    setIsModalOpen(true);
  };

  const fecharModalBanimento = () => {
    setIsModalOpen(false);
    setUsuarioParaBanimento(null);
    setJustificativa('');
  };

  const solicitarBanimento = () => {
    if (justificativa.trim() === '') {
      alert('A justificativa é obrigatória.');
      return;
    }
    setSolicitacoesBanimento((prevSolicitacoes) => [
      ...prevSolicitacoes,
      { idUsuario: usuarioParaBanimento, status: 'Solicitação de Banimento Enviada' },
    ]);
    fecharModalBanimento();
  };

  const isBanimentoSolicitado = (idUsuario) =>
    solicitacoesBanimento.some((solicitacao) => solicitacao.idUsuario === idUsuario);

  const getStatusBanimento = (idUsuario) =>
    solicitacoesBanimento.find((solicitacao) => solicitacao.idUsuario === idUsuario)?.status;

  return (
    <div className="admin-page">
      <div className="sidebar">
        <img src="https://via.placeholder.com/100" alt="Foto de Perfil" />
        <p>Nome: Revisor</p>
        <p>Email: revisor@exemplo.com</p>
        <p>Último login: 19/09/2024</p>
        <p>Status: Ativo</p>
      </div>

      <div className="denuncias-area">
        <div className="filtros">
          <label htmlFor="tipoViolacao">Filtrar por Tipo de Violação: </label>
          <select
            id="tipoViolacao"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="conteúdo ofensivo">Conteúdo Ofensivo</option>
            <option value="desinformação">Desinformação</option>
            <option value="plágio">Plágio</option>
          </select>
        </div>

        <table className="denuncias-tabela">
          <thead>
            <tr>
              <th>ID do Usuário</th>
              <th>Usuário Denunciado</th>
              <th>Tipo de Violação</th>
              <th>Descrição</th>
              <th>Publicação</th>
              <th>Ações</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtrarDenuncias().map((denuncia, index) => (
              <tr key={index}>
                <td>{denuncia.idUsuario}</td>
                <td>{denuncia.usuarioDenunciado}</td>
                <td>{denuncia.tipoViolacao}</td>
                <td>{denuncia.descricao}</td>
                <td>
                  <a
                    href={denuncia.linkPublicacao}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Publicação
                  </a>
                </td>
                <td>
                  {isPublicacaoOcultada(denuncia.idUsuario) ? (
                    <span>Ocultada</span>
                  ) : (
                    <button
                      onClick={() => ocultarPublicacao(denuncia.idUsuario)}
                      className="btn-ocultar"
                    >
                      Ocultar
                    </button>
                  )}
                </td>
                <td>
                  {isBanimentoSolicitado(denuncia.idUsuario) ? (
                    <span>{getStatusBanimento(denuncia.idUsuario)}</span>
                  ) : (
                    <button
                      onClick={() => abrirModalBanimento(denuncia.idUsuario)}
                      className="btn-banimento"
                    >
                      Solicitar Banimento
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Solicitar Banimento</h3>
              <p>
                Justifique o banimento do usuário <strong>{usuarioParaBanimento}</strong>:
              </p>
              <textarea
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                placeholder="Digite a justificativa aqui"
                rows="4"
              />
              <div className="modal-actions">
                <button onClick={solicitarBanimento} className="btn-confirmar">
                  Confirmar
                </button>
                <button onClick={fecharModalBanimento} className="btn-cancelar">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;