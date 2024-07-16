import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/tareas.css';
import { FaArrowLeft, FaTasks, FaProjectDiagram, FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';

const VerTareasAsignadas: React.FC = () => {
  const [tareas, setTareas] = useState<any[]>([]);
  const [respuesta, setRespuesta] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = JSON.parse(localStorage.getItem('session') || '{}');
    setUsuario(sessionUser);

    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const userTasks = allTasks.filter((task: any) => task.cedula === sessionUser.cedula);
    setTareas(userTasks);
  }, []);

  const handleEstadoChange = (tarea: any, estado: 'realizada' | 'no realizada') => {
    const updatedTareas = tareas.map((t) => (t.titulo === tarea.titulo ? { ...t, estado } : t));
    setTareas(updatedTareas);

    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedAllTasks = allTasks.map((t: any) => (t.titulo === tarea.titulo ? { ...t, estado } : t));
    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
  };

  const handleEnviarRespuesta = (tarea: any) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedAllTasks = allTasks.map((t: any) => (t.titulo === tarea.titulo ? { ...t, respuesta } : t));
    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
    alert('Respuesta enviada');
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div className="tareas-container">
      <button className="arrow-button" onClick={() => navigate('/login')}>
        <FaArrowLeft />
      </button>
      <h1 className="h1">Tareas Asignadas</h1>
      <ul className="ul">
        {tareas.map((tarea) => (
          <li key={tarea.titulo} className="li">
            <div>{`Título: ${tarea.titulo}`}</div>
            <div>{`Contenido: ${tarea.contenido}`}</div>
            <div>{`Estado: ${tarea.estado}`}</div>
            {/* <div>{`Calificación: ${tarea.calificacion ?? 'No calificada'}`}</div> */}
            <button
              onClick={() => handleEstadoChange(tarea, tarea.estado === 'realizada' ? 'no realizada' : 'realizada')}
              className="button"
            >
              {tarea.estado === 'realizada' ? 'Marcar como no realizada' : 'Marcar como realizada'}
            </button>
            {/* <input type="text" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} /> */}
            {/* <button onClick={() => handleEnviarRespuesta(tarea)} className="button">Enviar Respuesta</button> */}
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

export default VerTareasAsignadas;
