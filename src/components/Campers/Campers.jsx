import { useEffect, useState } from 'react';
import axios from 'axios';
import './Campers.css';

function Campers() {
  const [campers, setCampers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5012/campers');
        setCampers(response.data);
      } catch (error) {
        console.error('Error al obtener los campers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Campers</h1>
      <ul>
        {campers.map((camper) => (
          <li key={camper._id}>
            <h2>{camper.nombre} {camper.apellido}</h2>
            <p>Edad: {camper.edad}</p>
            <p>Cédula: {camper.cedula}</p>
            <p>Teléfono: {camper.telefono}</p>
            <p>Email: {camper.email}</p>
            <p>Nickname: {camper.nickname}</p>
            <p>Disponibilidad: {camper.disponibilidad}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Campers;
