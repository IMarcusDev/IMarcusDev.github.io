import { createApp } from 'vue';
import { createPinia } from 'pinia';  // Importa Pinia
import router from './router';  // Importa el router configurado
import './style.css';
import App from './App.vue';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);  // Usa Vue Router en la aplicación

app.mount('#app');