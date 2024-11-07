import { useNavigate } from 'react-router-dom'; // Importa el hook para navegación./assets/Logo.png';
import './register.css'

const Register = () => {
  const navigate = useNavigate(); // Instancia el hook para la navegación

  // Funciones de navegación
  const navigateInicio = () => navigate('/home');


  return (
    <div>


      <div className="login-container">
        <h2>Registrarse</h2>
        <form id="registrarse">
          <div className="registro-group">
            <label htmlFor="username">Nombre:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="registro-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className="registro-group">
            <label htmlFor="phone">Teléfono:</label>
            <input type="text" id="phone" name="phone" required />
          </div>
          <div className="registro-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="registro-group">
            <label htmlFor="confirm-password">Confirmar Contraseña:</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <button onClick={navigateInicio}>Registrarse</button>
        </form>
        <p id="message" style={{ color: 'red' }}></p>
      </div>
    </div>
  );
}

export default Register;
