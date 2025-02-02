<template>
    <div class="content">
        <section class="menu-lateral-container">
            <div class="menu-lateral">
                <div class="logo">
                    <h2>DentalMax</h2>
                </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
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
