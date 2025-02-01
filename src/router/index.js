import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';  // Importa tu componente Home

const routes = [
    {
        path: '/',       // Ruta principal
        name: 'Home',
        component: Home,  // Componente a mostrar
    },
  // Aquí agregar más rutas para otras vistas
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;