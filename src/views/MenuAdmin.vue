<template>
    <div class="content">
        <section class="menu-lateral-container">
            <div class="menu-lateral">
                <div class="logo">
                    <h2>VitaDent</h2>
                </div>
                <ul class="menu">
                    <li><router-link to="/MenuAdmin/agendarMedico">Agendar cita</router-link></li>
                    <li><router-link to="/MenuAdmin/historialAdmin">Historial de citas</router-link></li>
                    <li><router-link to="/MenuAdmin/registrarMedico">Registrar Medico</router-link></li>
                    <li><router-link to="/MenuAdmin/registrarSecretario">Registrar Secretario</router-link></li>
                    <li><router-link to="/MenuAdmin/listaDoctoresSecretarios">Lista de Doctores y Secretarios</router-link></li>
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
    name: 'MenuAdmin',
    components: {
        ArrowLongLeftIcon,
        ArrowRightStartOnRectangleIcon
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
    mounted() {
        const userStore = useUserStore();
        const stateStore = useStateStore();
        userStore.currentUser = sessionStorage.getItem('currentUser');
        stateStore.currentUserType = sessionStorage.getItem('currentUserType');
    },
    methods: {
        logout () {
            sessionStorage.clear();
            let logoutUser = this.currentUser;
            logoutUser.logout();
            let logoutState = this.currentState;
            logoutState.logout();
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.content {
    display: flex;
    width: 100%;
    height: calc(100vh - 20px);
    font-family: 'Arial', sans-serif;
}

.menu-lateral-container {
    display: flex;
    align-items: center;
    width: 20%;
    height: 100%;
}

.menu-lateral {
    height: 100%;
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
    overflow: hidden;
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

@media (max-width: 768px) {
    .content {
        flex-direction: column;
    }

    .menu-lateral-container {
        width: 100%;
    }

    .menu-lateral {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
    }

    .menu-lateral ul {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .menu-lateral li {
        width: auto;
        margin: 5px;
    }

    .screen-content {
        width: 100%;
        padding: 10px;
    }
}

@media (max-width: 480px) {
    .menu-lateral {
        flex-direction: column;
        align-items: center;
    }

    .menu-lateral ul {
        flex-direction: column;
        align-items: center;
    }

    .menu-lateral li {
        width: 100%;
        text-align: center;
    }

    .btnCerrarSesion {
        width: 100%;
        text-align: center;
    }
}
</style>
