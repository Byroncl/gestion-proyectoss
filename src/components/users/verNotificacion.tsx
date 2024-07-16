import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/notis.css';
import { FaArrowLeft, FaTasks, FaProjectDiagram, FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';

const VerNotificaciones: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = JSON.parse(localStorage.getItem('session') || '{}');
    setUsuario(sessionUser);

    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const userNotifications = allNotifications.filter((noti: any) => noti.cedula === sessionUser.cedula);
    setNotificaciones(userNotifications);
  }, []);

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div className="notificaciones-container">
      <button className="arrow-button" onClick={() => navigate('/login')}>
        <FaArrowLeft />
      </button>
      <h1 className="h1">Notificaciones</h1>
      <ul className="ul">
        {notificaciones.map((noti, index) => (
          <li key={index} className="li">
            <div>{`Mensaje: ${noti.mensaje}`}</div>
          </li>
        ))}
      </ul>
      <div className="navbar">
        <div className="nav-item" onClick={() => navigate('/ver-tareas')}>
          <FaTasks />
        </div>
        <div className="nav-item" onClick={() => navigate('/crear-proyecto')}>
          <FaProjectDiagram />
        </div>
        <div className="nav-item" onClick={() => navigate('/buscar-proyectos')}>
          <FaSearch />
        </div>
        <div className="nav-item" onClick={() => navigate('/ver-notificacion')}>
          <FaBell />
        </div>
        <div className="nav-item" onClick={() => navigate('/perfil')}>
          <FaUser />
        </div>
        <div className="nav-item" onClick={() => navigate('/login')}>
          <FaSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default VerNotificaciones;
