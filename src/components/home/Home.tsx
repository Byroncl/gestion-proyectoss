import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>Bienvenido a nuestra página de proyectos Universitario</h1>
      </header>
      <nav>
        <ul>
          <li><a onClick={() => navigate('/login')}>Login</a></li>
          <li><a onClick={() => navigate('/registro')}>Registro</a></li>
        </ul>
      </nav>
      <section>
        <h2>PROYECTOS DE INVESTIGACION</h2>
        <p>Bienvenido a nuestra página web. Aquí encontrarás información sobre los distintos proyectos de investigación de la Universidad Laica Eloy Alfaro de Manabi.</p>
      </section>
      <section className="sol">
        <legend><h1>ACERCA DE NOSOTROS:</h1></legend>
        <p>
          ¡Hola equipo de investigación! Este software nos brindará la capacidad de monitorear nuestro progreso en tiempo real. Podremos ver qué tareas se están completando, con el objetivo de intercambiar ideas en la elaboración de dichos proyectos de investigación para la universidad LAICA ELOY ALFARO DE MANABI.
          <br /><br />
          Esta página está dividida en varias secciones. Este formato es una forma perfecta de configurar tu página, porque guía al usuario poco a poco de una forma que no resulta abrumadora.
          <br /><br />
        </p>
      </section>
      <footer>
        <p>PERIODO &copy; 2024 - ULEAM</p>
      </footer>
    </div>
  );
};

export default Home;
