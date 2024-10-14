import { FaLock } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import "./cadastro.css";

function Cadastro() { 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Hook de navegação

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};

    // Validação do campo email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email) {
      newErrors.email = "Email é obrigatório.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido.";
    }

    // Validação da senha
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Senha deve possuir pelo menos uma letra maiúscula, um símbolo e um número.";
    }

  
    
     // Validação da confirmação de senha
     if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await fetch('http://25.17.225.123:5152/createaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Conta criada com sucesso!");
        setFormData({ email: "", password: "" });
        setErrors({});
        setServerError("");
        navigate('/home')
      } else {
        const data = await response.json();
        setServerError(data.message || "Erro ao criar a conta.");
      }
    } catch (error) {
      setServerError("Erro ao se conectar com o servidor. Tente novamente mais tarde.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    navigate('/'); // Redireciona para a página inicial (ou outra página)
  };

  return (
    <div className="container ">
      <span className="button-close" onClick={handleClose}>
                x 
            </span>
      <h1>Junte-se ao AlgoRead</h1>
      <form onSubmit={handleSubmit}>
        {serverError && <p className="error-message">{serverError}</p>}

        <div className="form-group ">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Insira seu e-mail"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "error" : ""}`}
           
          />

          {errors.email && <p className="error-message">{errors.email}</p>}
          <BsEnvelope className="icon"/>
        </div>

        <div className="form-group ">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Crie uma senha"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? "error" : ""}`}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <FaLock className="icon"/>
        </div>

        <div className="form-group ">
          <label htmlFor="confirmPassword">Confirmar Senha</label>  
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-input ${errors.confirmPassword ? "error" : ""}`}
            
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          <FaLock className="icon"/>
        </div>

        <button type="submit">Cadastrar</button>

        <div className="login-redirect">
                <span>Já tem uma conta? <Link to="/">Entrar</Link></span>
                   
                </div>



      </form>
    </div>
  );
}

export default Cadastro;