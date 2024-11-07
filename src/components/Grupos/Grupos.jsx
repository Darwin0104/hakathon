import { useNavigate } from 'react-router-dom'; // Importa el hook
import { MdHome } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { BsBookmarkHeart } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import  Logo from '../../assets/Logo.png'

const Grupos = () => {
  const navigate = useNavigate(); // Instanciamos el hook para la navegación

  // Función para navegar al inicio
  const navigateInicio = () => {
    navigate('/home');
  };

  const navigateStudents = () => {
      navigate('/campers');
    };
    const navigateCursos = () => {
      navigate('/cursos');
    };
    const navigateUsuarios = () => {
      navigate('/usuarios');
    };
    const navigateHorarios = () => {
      navigate('/horarios');
    };
return (
  <div>
    <sectio className="contenedor">
      <nav className="nav">
          
          <ul>
          <div className="logo">
              <img src={Logo} alt="Logo Talento Oriente" />
              </div>
              <li className="menu-item">
              <button onClick={navigateInicio}>
                      <MdHome />
                      <h3>
                      Inicio
                      </h3>
                  </button>           
              </li>
              
              <li className="menu-item">
              <button onClick={navigateStudents}>
              <PiStudent />
              <h3>Estudiantes</h3>
                  </button> 
                 
              </li>
              <li className="menu-item">
              <button onClick={navigateCursos}>
              <IoMdPeople />
              <h3>
                  Generaciones y Cursos
              </h3>
                  </button> 
                  
              </li>
              <li className="menu-item">
              <button onClick={navigateUsuarios}>
                  <BsBookmarkHeart />
                      <h3>
                          Expertos
                      </h3>
                  </button> 
                  
              </li>

              
              <li className="menu-item">
              <button onClick={navigateHorarios}>
              <CiCalendar />

<h3>
  Horarios
</h3>
                  </button> 

                  
              </li>
          </ul>

      </nav>

      <div className="grande">
          
      </div>
  </sectio>
  </div>
)
}
export default Grupos
