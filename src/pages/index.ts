import React from 'react';
import Home from '../components/home/Home'

export { Home }

export const Login = React.lazy(() => import('../components/login/Login'));
export const Perfil = React.lazy(() => import('../components/users/perfil'));
export const AdminLogin = React.lazy(() => import('../components/login/LoginAdministrador'));
export const AdminPanel = React.lazy(() => import('../components/administrador/panel'));
export const RegistroUsuario = React.lazy(() => import('../components/registro/Registro'));
export const VerTareasAsignadas = React.lazy(() => import('../components/users/verTareas'));
export const VerNotificaciones = React.lazy(() => import('../components/users/verNotificacion'));
export const CrearProyecto = React.lazy(() => import('../components/users/crearProyecto'));
export const BuscarProyectos = React.lazy(() => import('../components/users/buscarProyecto'));

