import { useNavigate } from 'react-router-dom'; // Importa el hook
import Ruraq from '../../assets/IconRuraq.svg';
import google from '../../assets/chrome.png';
import discord from '../../assets/discord.png';
import github from '../../assets/github.svg';
import './login.css'; // Estilos

const Login = () => {
  const navigate = useNavigate();  // Instancia de useNavigate

  const NavigateLogin = () => {
    navigate('/loginForm');  // Redirecciona a /loginForm
  };

  const NavigateGoogle = () => {
    window.location.replace('http://localhost:3500/user/google');
  };


  const NavigateGithub = () => {
    window.location.replace('http://localhost:3500/user/github');
  };

  const NavigateDiscord = () => {
    window.location.replace('http://localhost:3500/user/discord');
  };

  return (
    <div className="login-container">
      <h2>
        Inicia sesión y <br />
        continúa viendo tus <br />
        <span>artesanías favoritas</span>
      </h2>
      <div className="login-buttons">
        <button className="login-btn_Google-btn" onClick={NavigateGoogle}>
          <img src={google} alt="Google" /> Inicia sesión con Google
        </button>
        <button className="login-btn_github-btn" onClick={NavigateGithub}>
          <img src={github} alt="Github" /> Inicia sesión con tu Github
        </button>
        <button className="login-btn_Discord-btn" onClick={NavigateDiscord}>
          <img src={discord} alt="Discord" /> Inicia sesión con Discord
        </button>
        <button className="login-btn_Ruraq-btn" onClick={NavigateLogin}>
          <img src={Ruraq} alt="ruraq" /> Inicia sesión con tu cuenta de Ruraq Maki
        </button>
      </div>
    </div>
  );
};

export default Login;
