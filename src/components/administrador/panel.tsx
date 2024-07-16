import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/panel.css';
import '../../assets/css/alertas.css'; // Importa el archivo CSS para las alertas
import { FaArrowLeft } from 'react-icons/fa';

interface Tarea {
  titulo: string;
  contenido: string;
  estado: 'realizada' | 'no realizada';
  cedula: string;
}

const AdminPanel: React.FC = () => {
  const [tarea, setTarea] = useState<Tarea>({
    titulo: '',
    contenido: '',
    estado: 'no realizada',
    cedula: ''
  });
  const [notificacion, setNotificacion] = useState('');
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setUsuarios(users);
  }, []);

  const handleTareaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleNotificacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificacion(e.target.value);
  };

  const validateTarea = (): boolean => {
    if (tarea.titulo.length < 5 || tarea.titulo.length > 15) {
      setAlertMessage('El título de la tarea debe tener entre 5 y 15 caracteres.');
      setAlertType('error');
      return false;
    }
    if (tarea.contenido.length < 10 || tarea.contenido.length > 30) {
      setAlertMessage('El contenido de la tarea debe tener entre 10 y 30 caracteres.');
      setAlertType('error');
      return false;
    }
    return true;
  };

  const handleTareaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTarea()) {
      const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      localStorage.setItem('tasks', JSON.stringify([...existingTasks, tarea]));
      setAlertMessage('Tarea asignada con éxito');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    }
  };

  const handleNotificacionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify([...existingNotifications, { cedula: tarea.cedula, mensaje: notificacion }]));
    setAlertMessage('Notificación enviada con éxito');
    setAlertType('success');
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 3000);
  };

  return (
    <div className="admin-panel-container">
      {alertMessage && (
        <div className={`alert-container ${alertType === 'success' ? 'alert-success' : ''}`}>
          {alertMessage}
        </div>
      )}
      <button className="arrow-button" onClick={() => navigate('/login')}>
        <FaArrowLeft />
      </button>
      <h1 className="form-title">Panel de Administración</h1>
      <form className="form" onSubmit={handleTareaSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={tarea.titulo}
          onChange={handleTareaChange}
          className="input"
        />
        <input
          type="text"
          name="contenido"
          placeholder="Contenido"
          value={tarea.contenido}
          onChange={handleTareaChange}
          className="input"
        />
        <select
          name="cedula"
          value={tarea.cedula}
          onChange={handleTareaChange}
          className="select"
        >
          <option value="">Seleccione usuario</option>
          {usuarios.map((user) => (
            <option key={user.cedula} value={user.cedula}>{`${user.nombre} ${user.apellido} (${user.cedula})`}</option>
          ))}
        </select>
        <button type="submit" className="button">Asignar Tarea</button>
      </form>

      <form className="form" onSubmit={handleNotificacionSubmit}>
        <input
          type="text"
          name="mensaje"
          placeholder="Notificación"
          value={notificacion}
          onChange={handleNotificacionChange}
          className="input"
        />
        <select
          name="cedula"
          value={tarea.cedula}
          onChange={handleTareaChange}
          className="select"
        >
          <option value="">Seleccione usuario</option>
          {usuarios.map((user) => (
            <option key={user.cedula} value={user.cedula}>{`${user.nombre} ${user.apellido} (${user.cedula})`}</option>
          ))}
        </select>
        <button type="submit" className="button">Enviar Notificación</button>
      </form>
    </div>
  );
};

export default AdminPanel;
