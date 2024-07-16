import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; //libreria para imprimir en pdf
import '../../assets/css/buscar.css';
import { FaArrowLeft, FaTasks, FaProjectDiagram, FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa'; //libreria de iconos

const BuscarProyectos: React.FC = () => {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProyectos(projects);
  }, []);

  const handleImprimir = (proyecto: any) => {
    const doc = new jsPDF();
    doc.text(`Titulo: ${proyecto.titulo}`, 10, 10);
    doc.text(`Miembros: ${proyecto.miembros.join(', ')}`, 10, 20);
    doc.text(`Objetivo: ${proyecto.objetivo}`, 10, 30);
    doc.text(`Duración: ${proyecto.duracion}`, 10, 40);
    doc.save(`${proyecto.titulo}.pdf`);
  };

  const proyectosFiltrados = proyectos.filter((proyecto) => proyecto.titulo.includes(filtro));

  return (
    <div className="proyectos-container">
      <button className="arrow-button" onClick={() => navigate('/login')}>
        <FaArrowLeft />
      </button>
      <input
        type="text"
        placeholder="Buscar por título"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="input"
      />
      <ul className="ul">
        {proyectosFiltrados.map((proyecto) => (
          <li key={proyecto.titulo} className="li">
            <div>{proyecto.titulo}</div>
            <button onClick={() => handleImprimir(proyecto)} className="button">Imprimir</button>
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

export default BuscarProyectos;
