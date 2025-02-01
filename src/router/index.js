import { createRouter, createWebHistory } from 'vue-router';
import MenuPaciente from '@/views/MenuPaciente.vue';
import Login from '@/views/Login.vue';
import Home from '../views/Home.vue';
import Historial from '@/components/Historial.vue';
import AgendarCita from '../components/AgendarCita.vue';

const routes = [
    {
        path: '/',
        name: 'Home',  
        component: Home
    },
    {
        path: '/MenuPaciente',
        name: 'MenuPaciente',  
        component: MenuPaciente,
        children: [
            {
                path: 'historial',  
                name: 'Historial',
                component: Historial,  
            },
            {
                path: 'agendar',
                name: 'Agendar',
                component: AgendarCita,
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
