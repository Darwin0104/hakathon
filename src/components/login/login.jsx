import { useNavigate } from 'react-router-dom'; // Importa el hook

import './login.css'; // Estilos

const Login = () => {
  const navigate = useNavigate();  // Instancia de useNavigate

  const NavigateLogin = () => {
    navigate('/home');  // Redirecciona a /loginForm
  };
  return (
    <div className="login-container">
      <h2>
        Inicia sesión y <br />
        continúa viendo tus <br />
        <span>cursos</span>
      </h2>
      <div className="login-buttons">
  
        <button className="login-btn_Ruraq-btn" onClick={NavigateLogin}>
          Inicia sesión con tu cuenta de TalentoTech
        </button>
      </div>
    </div>
  );
};

export default Login;
