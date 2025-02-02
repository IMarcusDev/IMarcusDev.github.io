<template>
    <div class="content">
        <section class="menu-lateral-container">
            <div class="menu-lateral">
                <div class="logo">
                    <h2>DentalMax</h2>
                </div>
                <ul class="menu">
                    <li><router-link to="/MenuMedico/historialMedico">Historial de citas</router-link></li>
                    <li><router-link to="/MenuMedico/agendarMedico">Agendar cita</router-link></li>
                </ul>

                <router-link to="/" class="position">
                    <button class="btnPrincipalPage"><ArrowLongLeftIcon class="arrowIcon" />Volver a la pagina principal</button>
                </router-link>
                <button class="btnCerrarSesion">Cerrar Sesion <ArrowRightStartOnRectangleIcon class="arrowIcon" /></button>
            </div>
        </section>

        <section class="screen-content" id="screen-content">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid';


export default {
    name: 'MenuMedico',
    components: {
        ArrowLongLeftIcon,
    },
    methods: {
        logout() {
            localStorage.removeItem('userType');
        }
    }
};
</script>

<style scoped>

.position{
    position: relative;
    bottom: 70%;
}

.btnPrincipalPage{
    position: relative;
    display: flex;
    color: black;
    background-color: #1abc9c;

}

.btnCerrarSesion{
    background-color: pink;
    display: flex;
    align-items: center;
}

.arrowIcon {
    width: 30px;
    margin-left: 10px;
}

.content {
    display: flex;
    width: 100%;
    font-family: 'Arial', sans-serif;
}

.menu-lateral-container {
    display: flex;
    align-items: center;
    width: 20%;
}

.menu-lateral {
    height: 100vh;
    width: 250px;
    background-color: #2c3e50;
    color: #ecf0f1;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: space-between;
}

.logo {
    margin-bottom: 20px;
}

.logo h2 {
    color: #ecf0f1;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
}

.menu-lateral ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.menu-lateral li {
    width: 100%;
}

.menu-lateral li a {
    display: block;
    padding: 15px 20px;
    color: #ecf0f1;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
    text-align: center;
}

.menu-lateral li a:hover {
    background-color: #34495e;
    color: #bdc3c7;
}

.menu-lateral li a.router-link-active {
    background-color: #1abc9c;
    color: #ecf0f1;
}

.screen-content {
    width: 80%;
    display: flex;
    padding: 20px;
    background-color: #ecf0f1;
}
</style>
