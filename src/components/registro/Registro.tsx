import React, { useState } from 'react';
import '../../assets/css/registro.css';
import '../../assets/css/alertas.css'; 
import { useNavigate } from 'react-router-dom';

interface User {
  nombre: string;
  apellido: string;
  cedula: string;
  correo: string;
  contraseña: string;
  facultad: string;
}

const RegistroUsuario: React.FC = () => {
  const [user, setUser] = useState<User>({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    contraseña: '',
    facultad: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const validate = (): boolean => {
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,15}$/;
    const cedulaPattern = /^\d{10}$/;

    if (!namePattern.test(user.nombre)) {
      setAlertMessage('El nombre debe tener entre 3 y 15 caracteres y solo puede contener letras, tildes y espacios.');
      setAlertType('error');
      return false;
    }
    if (!namePattern.test(user.apellido)) {
      setAlertMessage('El apellido debe tener entre 3 y 15 caracteres y solo puede contener letras, tildes y espacios.');
      setAlertType('error');
      return false;
    }
    if (!cedulaPattern.test(user.cedula)) {
      setAlertMessage('La cédula debe tener 10 caracteres numéricos.');
      setAlertType('error');
      return false;
    }
    if (user.contraseña.length < 3 || user.contraseña.length > 10) {
      setAlertMessage('La contraseña debe tener entre 3 y 10 caracteres.');
      setAlertType('error');
      return false;
    }
    if (user.contraseña !== confirmPassword) {
      setAlertMessage('Las contraseñas no coinciden.');
      setAlertType('error');
      return false;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some((u: User) => u.cedula === user.cedula)) {
      setAlertMessage('La cédula ya está registrada.');
      setAlertType('error');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      localStorage.setItem('users', JSON.stringify([...existingUsers, user]));
      setAlertMessage('Usuario registrado con éxito');
      setAlertType('success');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className="form-container">
      {alertMessage && (
        <div className={`alert-container ${alertType === 'success' ? 'alert-success' : ''}`}>
          {alertMessage}
        </div>
      )}
      <h1 className="form-title">Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={user.nombre}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={user.apellido}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={user.cedula}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={user.correo}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={user.contraseña}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="form-input"
        />
        <select
          name="facultad"
          value={user.facultad}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Seleccione Facultad</option>
          <option value="Ingeniería">Ingeniería</option>
          <option value="Medicina">Medicina</option>
          <option value="Derecho">Derecho</option>
          <option value="Ciencias">Ciencias</option>
        </select>
        <button type="submit" className="form-button">Registrar</button>
        <button type="button" className="form-button" onClick={() => navigate('/login')}>Iniciar sesión como usuario</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
