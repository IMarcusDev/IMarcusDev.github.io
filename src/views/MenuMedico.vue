<template>
    <div class="content">
        <section class="menu-lateral-container">
            <div class="menu-lateral">
                <div class="logo">
                    <h2>VitaDent</h2>
                </div>
                <ul class="menu">
                    <li v-if="currentState.currentUserType === 'secretario'">
                        <router-link to="/MenuMedico/historial">Historial de citas</router-link>
                    </li>
                    <li v-if="currentState.currentUserType === 'medico'">
                        <router-link to="/MenuMedico/historialMedico">Historial de citas</router-link>
                    </li>
                    <li><router-link to="/MenuMedico/agendarMedico">Agendar cita</router-link></li>
                </ul>
                <router-link to="/">
                    <button class="btnCerrarSesion" @click="logout">Cerrar Sesión <ArrowRightStartOnRectangleIcon class="arrowIcon" /></button>
                </router-link>
            </div>
        </section>
        <section class="screen-content" id="screen-content">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import { ArrowLongLeftIcon, StarIcon } from '@heroicons/vue/24/solid';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid';
import { useUserStore } from '../store/userStore';
import { useStateStore } from '../store/stateStore';

export default {
    name: 'MenuMedico',
    components: {
        ArrowLongLeftIcon,
        ArrowRightStartOnRectangleIcon,
    },
    computed: {
        currentUser() {
            const userStore = useUserStore();
            return userStore;
        },
        currentState(){
            const stateStore = useStateStore();
            return stateStore;
        }
    },
    methods: {
        logout () {
            let logoutUser = this.currentUser;
            logoutUser.logout();
            let logoutState = this.currentState;
            logoutState.logout();
        }
    }
};
</script>

<style scoped>
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
    height: 95vh;
    width: 250px;
    background-color: #007bff;
    color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    justify-content: space-between;
    border-radius: 8px 0 0 8px;
}

.logo {
    margin-bottom: 20px;
}

.logo h2 {
    color: #ffffff;
    font-size: 40px;
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
    font-size: 20px;
}

.menu-lateral li a {
    display: block;
    padding: 15px 20px;
    color: #ffffff;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
    text-align: center;
    border-radius: 4px;
}

.menu-lateral li a:hover {
    background-color: #0056b3;
    color: #d1ecf1;
}

.menu-lateral li a.router-link-active {
    background-color: #1abc9c;
    color: #ffffff;
}

.btnCerrarSesion {
    background-color: #e74c3c;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
}

.btnCerrarSesion:hover {
    background-color: #c0392b;
}

.arrowIcon {
    width: 20px;
    margin-left: 10px;
}

.screen-content {
    width: 80%;
    display: flex;
    padding: 20px;
    background-color: #ecf0f1;
    border-radius: 0 8px 8px 0;
}
</style>
