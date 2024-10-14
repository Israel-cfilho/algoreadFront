import { useState } from 'react';
import './modificarSenha.css';
import { useNavigate } from 'react-router-dom';


function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const navigate = useNavigate(); // Hook de navegação

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Função de validação
  const validate = () => {
    const newErrors = {};

    // Verifica se a senha atual foi informada
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'A senha atual é obrigatória.';
    }

    // Validação da nova senha
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!formData.newPassword) {
      newErrors.newPassword = 'A nova senha é obrigatória.';
    } else if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword = 'A nova senha deve ter pelo menos 8 caracteres, incluindo letras e números.';
    }

    // Verifica se as senhas novas correspondem
    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'As senhas não correspondem.';
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação do formulário
    if (!validate()) {
      return;
    }

    // Simula uma chamada para o backend para modificar a senha
    try {
      const response = await fetch('http://25.17.225.123:5152/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Senha modificada com sucesso!');
        setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        setErrors({});
      } else {
        setErrors({ general: 'Falha ao modificar a senha. Tente novamente.' });
      }
    } catch (error) {
      setErrors({ general: 'Erro de conexão. Tente novamente mais tarde.' });
    }
  };

  // Função para atualizar os dados do formulário conforme o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    navigate('/'); // Redireciona para a página inicial (ou outra página)
  };

  return (
    <div className="modificar-container">
      <span className="close" onClick={handleClose}>
                x 
            </span>
      <h4>Modificar Senha</h4>
      <form onSubmit={handleSubmit}>
        {errors.general && <p className="error-message">{errors.general}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-modificar">
          <label htmlFor="currentPassword">Senha Atual</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            placeholder="Digite sua senha atual"
            value={formData.currentPassword}
            onChange={handleChange}
            className={errors.currentPassword ? "error" : ""}
          />
          {errors.currentPassword && <p className="error-message">{errors.currentPassword}</p>}
        </div>

        <div className="form-modificar">
          <label htmlFor="newPassword">Nova Senha</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Digite sua nova senha"
            value={formData.newPassword}
            onChange={handleChange}
            className={errors.newPassword ? "error" : ""}
          />
          {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
        </div>

        <div className="form-modificar">
          <label htmlFor="confirmNewPassword">Confirme a Nova Senha</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirme sua nova senha"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className={errors.confirmNewPassword ? "error" : ""}
          />
          {errors.confirmNewPassword && <p className="error-message">{errors.confirmNewPassword}</p>}
        </div>

        <button type="submit">Modificar Senha</button>
      </form>
    </div>
  );
}

export default ChangePassword;