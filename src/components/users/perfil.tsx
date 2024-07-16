import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/perfil.css';
import '../../assets/css/alertas.css'; // Importa el archivo CSS para las alertas
import { FaArrowLeft, FaTasks, FaProjectDiagram, FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Perfil: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editableUser, setEditableUser] = useState<any>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = JSON.parse(localStorage.getItem('session') || '{}');
    setUser(sessionUser);
    setEditableUser({ ...sessionUser });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,15}$/;

    if (!namePattern.test(editableUser.nombre)) {
      setAlertMessage('El nombre debe tener entre 3 y 15 caracteres y solo puede contener letras, tildes y espacios.');
      setAlertType('error');
      return false;
    }
    if (!namePattern.test(editableUser.apellido)) {
      setAlertMessage('El apellido debe tener entre 3 y 15 caracteres y solo puede contener letras, tildes y espacios.');
      setAlertType('error');
      return false;
    }
    if (editableUser.contraseña.length < 3 || editableUser.contraseña.length > 10) {
      setAlertMessage('La contraseña debe tener entre 3 y 10 caracteres.');
      setAlertType('error');
      return false;
    }

    return true;
  };

  const handleUpdate = () => {
    if (validate()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => (u.cedula === user.cedula ? editableUser : u));
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('session', JSON.stringify(editableUser));
      setUser(editableUser);
      setAlertMessage('Datos actualizados con éxito');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="perfil-container">
      {alertMessage && (
        <div className={`alert-container ${alertType === 'success' ? 'alert-success' : ''}`}>
          {alertMessage}
        </div>
      )}
      <button className="arrow-button" onClick={() => navigate('/login')}>
        <FaArrowLeft />
      </button>
      <h1 className="form-title">Perfil de Usuario</h1>
      <form className="form">
        <input
          type="text"
          name="nombre"
          value={editableUser.nombre}
          onChange={handleChange}
          className="input"
          placeholder="Nombre"
        />
        <input
          type="text"
          name="apellido"
          value={editableUser.apellido}
          onChange={handleChange}
          className="input"
          placeholder="Apellido"
        />
        <input
          type="email"
          name="correo"
          value={editableUser.correo}
          onChange={handleChange}
          className="input"
          placeholder="Correo"
        />
        <input
          type="password"
          name="contraseña"
          value={editableUser.contraseña}
          onChange={handleChange}
          className="input"
          placeholder="Contraseña"
        />
        <select
          name="facultad"
          value={editableUser.facultad}
          onChange={handleChange}
          className="select"
        >
          <option value="Ingeniería">Ingeniería</option>
          <option value="Medicina">Medicina</option>
          <option value="Derecho">Derecho</option>
          <option value="Ciencias">Ciencias</option>
        </select>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('¿Desea actualizar los datos?')) handleUpdate();
          }}
          className="button"
        >
          Actualizar
        </button>
      </form>
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

export default Perfil;
