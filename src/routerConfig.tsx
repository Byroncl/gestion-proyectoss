import React from "react";
import { AdminLogin, AdminPanel, BuscarProyectos, CrearProyecto, Home, Login, Perfil, RegistroUsuario, VerNotificaciones, VerTareasAsignadas } from "./pages";

export const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/login-admin',
        element: <AdminLogin/>
    },
    {
        path: '/perfil',
        element: <Perfil/>
    },
    {
        path: '/admin-panel',
        element: <AdminPanel/>
    },
    {
        path:  '/registro',
        element: <RegistroUsuario/>
    },
    {
        path: '/ver-tareas',
        element: <VerTareasAsignadas/>, 
    },
    {
        path: '/crear-proyecto',
        element: <CrearProyecto/>,
    },
    {
        path: '/buscar-proyectos',
        element: <BuscarProyectos/>
    },
    {
        path: '/ver-notificacion',
        element: <VerNotificaciones/>
    },
]