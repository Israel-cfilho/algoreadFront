import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa corretamente createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext/AuthContext'; // Certifique-se de que o caminho esteja correto

// Cria a instância de root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Usa root.render em vez de ReactDOM.render
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// Se quiser medir performance na sua aplicação, utilize reportWebVitals
reportWebVitals();
