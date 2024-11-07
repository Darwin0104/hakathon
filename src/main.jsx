import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import Home from './components/Home/Inicio.jsx';
import Campers from './components/Campers/Campers.jsx';
import Usuarios from './components/Usuarios/Usuarios.jsx';
import Grupos from './components/Grupos/Grupos.jsx';
import Horarios from './components/horarios/horarios.jsx';
import Salones from './components/Salones/Salones.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>

        {/* Rutas Públicas */}
        
        {/* Página de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Página de registro de usuarios */}
        <Route path="/register" element={<Register />} />

          {/* Inicio (Página de bienvenida después del inicio de sesión) */}
          <Route path="/home" element={<Home />} />

          {/* Rutas para secciones principales */}
          <Route path="/campers" element={<Campers />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/salones" element={<Salones />} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);
