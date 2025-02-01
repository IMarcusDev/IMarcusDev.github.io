import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';  // Importa tu componente Home
import AgendarCitaPaciente from '@/views/AgendarCitaPaciente.vue';
import Login from '@/views/Login.vue';

const routes = [
    {
        path: '/',       // Ruta principal
        name: 'Home',
        component: Home,  // Componente a mostrar
    },
    {
        path: '/agendar',
        name: 'AgendarCitaPaciente',
        component: AgendarCitaPaciente,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
  // Aquí agregar más rutas para otras vistas
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;