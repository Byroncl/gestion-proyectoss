import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/loginAdmin.css';
import { FaArrowLeft } from 'react-icons/fa';

const AdminLogin: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === 'santana' && contraseña === '123') {
      navigate('/admin-panel');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <button className="arrow-button" onClick={() => navigate('/')}>
        <FaArrowLeft />
      </button>
      <form className="form" onSubmit={handleLogin}>
        <h1 className="title">Admin</h1>
        <input
          type="text"
          className="input"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button type="submit" className="button">Iniciar Sesión</button>
        <button type="button" className="button nav-button" onClick={() => navigate('/login')}>Iniciar sesión como usuario</button>
        <button type="button" className="button nav-button" onClick={() => navigate('/registro')}>Registro</button>
      </form>
    </div>
  );
};

export default AdminLogin;
