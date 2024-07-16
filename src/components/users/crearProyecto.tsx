import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/crear.css';
import '../../assets/css/alertas.css'; // Importa el archivo CSS para las alertas
import { FaArrowLeft, FaTasks, FaProjectDiagram, FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';

interface Proyecto {
  titulo: string;
  miembros: string[];
  objetivo: string;
  duracion: string;
}

const NuevoProyecto: React.FC = () => {
  const [proyecto, setProyecto] = useState<Proyecto>({
    titulo: '',
    miembros: [],
    objetivo: '',
    duracion: ''
  });
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [miembro, setMiembro] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setUsuarios(users);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  const handleAddMiembro = () => {
    if (miembro && !proyecto.miembros.includes(miembro)) {
      setProyecto({ ...proyecto, miembros: [...proyecto.miembros, miembro] });
      setMiembro('');
    }
  };

  const validate = (): boolean => {
    if (proyecto.titulo.length < 5 || proyecto.titulo.length > 15) {
      setAlertMessage('El título debe tener entre 5 y 15 caracteres.');
      setAlertType('error');
      return false;
    }
    if (proyecto.objetivo.length < 10 || proyecto.objetivo.length > 30) {
      setAlertMessage('El objetivo debe tener entre 10 y 30 caracteres.');
      setAlertType('error');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      localStorage.setItem('projects', JSON.stringify([...existingProjects, proyecto]));
      setAlertMessage('Proyecto creado con éxito');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    }
  };

  return (
    <div className="proyecto-container">
      {alertMessage && (
        <div className={`alert-container ${alertType === 'success' ? 'alert-success' : ''}`}>
          {alertMessage}
        </div>
      )}
      <button className="arrow-button" onClick={() => navigate('/login')}>
        <FaArrowLeft />
      </button>
      <h1 className="form-title">Crear Proyecto</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={proyecto.titulo}
          onChange={handleChange}
          className="input"
        />
        <select
          name="miembros"
          value={miembro}
          onChange={(e) => setMiembro(e.target.value)}
          className="select"
        >
          <option value="">Seleccione miembro</option>
          {usuarios.map((user) => (
            <option key={user.cedula} value={user.cedula}>{`${user.nombre} ${user.apellido} (${user.cedula})`}</option>
          ))}
        </select>
        <button type="button" onClick={handleAddMiembro} className="button">Añadir miembro</button>
        <ul>
          {proyecto.miembros.map((miembro) => (
            <li key={miembro} className="li">{miembro}</li>
          ))}
        </ul>
        <input
          type="text"
          name="objetivo"
          placeholder="Objetivo"
          value={proyecto.objetivo}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="duracion"
          placeholder="Duración"
          value={proyecto.duracion}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">Crear Proyecto</button>
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

export default NuevoProyecto;
