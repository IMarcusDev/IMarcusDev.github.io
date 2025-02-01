<template>
    <div class="content">
        <section class="menu-lateral-container">
            <div class="menu-lateral">
                <ul class="menu">
                    <li><router-link to="/MenuPaciente/historial">Historial de citas</router-link></li>
                    <li><router-link to="/MenuPaciente/agendar">Agendar cita</router-link></li>
                </ul>
            </div>
        </section>

        <section class="screen-content" id="screen-content">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'MenuPaciente'
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
        height: 100vh;
        width: 250px;
        background-color: #2c3e50;
        color: #ecf0f1;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }
    .menu-lateral ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .menu-lateral li {
        padding: 15px 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .menu-lateral li:hover {
        background-color: #34495e;
    }
    .menu-lateral li a {
        color: #ecf0f1;
        text-decoration: none;
        display: block;
    }
    .menu-lateral li a:hover {
        color: #bdc3c7;
    }

    .screen-content{
        width: 80%;
        display: flex;
    }
</style>
