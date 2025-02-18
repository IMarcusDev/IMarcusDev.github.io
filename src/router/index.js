import { createRouter, createWebHistory } from 'vue-router';
import MenuPaciente from '@/views/MenuPaciente.vue';
import Login from '@/views/Login.vue';
import Home from '../views/Home.vue';
import Historial from '@/components/Historial.vue';
import AgendarCita from '../components/AgendarCita.vue';
import HistorialMedico from '../components/HistorialMedico.vue';
import MenuMedico from '../views/MenuMedico.vue';
import InsertarDependientes from '../components/InsertarDependientes.vue';
import ListaDependientes from '../components/ListaDependientes.vue';
import AgendarCitaPaciente from '../components/AgendarCitaPaciente.vue';
import MenuAdmin from '../views/MenuAdmin.vue';
import registrarDoctor from '../components/registrarDoctor.vue';
import registrarSecretario from '../components/registrarSecretario.vue';
import registrarPaciente from '../components/registrarPaciente.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

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
                path: 'agendarPaciente',
                name: 'AgendarPaciente',
                component: AgendarCitaPaciente,
            },
            {
                path: 'agregarDependiente',
                name: 'AgregarDependiente',
                component: InsertarDependientes,
            },
            {
                path: 'listaDependientes',
                name: 'ListaDependientes',
                component: ListaDependientes,
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
            },
            {
                path: 'historial',  
                name: 'HistorialPaciente',
                component: Historial,  
            },
            {
                path: 'registrarPaciente',  
                name: 'RegistrarPaciente',
                component: registrarPaciente, 
            }
        ]
    },
    {
        path: '/MenuAdmin',
        name: 'MenuAdmin',  
        component: MenuAdmin,
        children: [
            {
                path: 'historialAdmin',  
                name: 'HistorialAdmin',
                component: HistorialMedico,  
            },
            {
                path: 'agendarMedico',
                name: 'AgendarAdmin',
                component: AgendarCita,
            },
            {
                path: 'registrarMedico',
                name: 'RegistrarMedico',
                component: registrarDoctor
            },
            {
                path: 'registrarSecretario',
                name: 'RegistrarSecretario',
                component: registrarSecretario
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
