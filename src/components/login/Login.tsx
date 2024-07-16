import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import { FaArrowLeft } from 'react-icons/fa';

const Login: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.cedula === cedula && u.contraseña === contraseña);
    if (user) {
      localStorage.setItem('session', JSON.stringify(user));
      navigate('/perfil');
    } else {
      alert('Cédula o contraseña incorrecta');
    }
  };

  return (
    <div className="login-container">
      <button className="arrow-button" onClick={() => navigate('/')}>
        <FaArrowLeft/>
      </button>
      <form className="form" onSubmit={handleLogin}>
        <h1 className="title">Usuario</h1>
        <input
          type="text"
          className="input"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />  
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button type="submit" className="button">Login</button>
        <button type="button" className="button nav-button" onClick={() => navigate('/login-admin')}>Iniciar sesión como administrador</button>
        <button type="button" className="button nav-button" onClick={() => navigate('/registro')}>Registro de usuarios</button>
      </form>
    </div>
  );
};

export default Login;
