import { createRouter, createWebHistory } from 'vue-router';
import MenuPaciente from '@/views/MenuPaciente.vue';
import Login from '@/views/Login.vue';
import Home from '../views/Home.vue';
import Historial from '@/components/Historial.vue';
import AgendarCita from '../components/AgendarCita.vue';
import HistorialMedico from '../components/HistorialMedico.vue';
import MenuMedico from '../views/MenuMedico.vue';

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
                path: 'historialPaciente',  
                name: 'HistorialPaciente',
                component: Historial,  
            },
            {
                path: 'agendarPaciente',
                name: 'AgendarPaciente',
                component: AgendarCita,
            }
        ]
    },
    {
        path: '/MenuMedico',
        name: 'MenuMedico',  
        component: MenuMedico,
        children: [
            {
                path: 'historialMedico',  
                name: 'HistorialMedico',
                component: HistorialMedico,  
            },
            {
                path: 'agendarMedico',
                name: 'AgendarMedico',
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
