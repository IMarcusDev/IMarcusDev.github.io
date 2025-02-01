<template>
    <header>
        <section class="pageInfo">
            <div class="logo">
                <img src="../../public/vite.svg">
            </div>
            <div class="pageTitle"><h1>DentalMax</h1></div>
            <div class="login-container">
                <div class="login">
                    <button type="button" id="btnLogin">Iniciar Sesion</button>
                </div>
                <div class="register">
                    <button type="button" id="btnRegister">Registrarse</button>
                </div>
            </div>
        </section>
        <section class="navMenu">
            <div class="menu-container">
                <nav>
                    <ul class="menu">
                        <li><router-link to="/">Inicio</router-link></li>
                        <li><router-link to="/about">Acerca de</router-link></li>
                        <li><router-link to="/contact">Contactar</router-link></li>
                    </ul>
                </nav>
            </div>
            <div class="directCita">
                <button type="button" id="btnQuickAgend">
                    Agendar cita
                </button>
            </div>
        </section>
    </header>    


        <div class="content">
            <section class="sliderHome">
                <div class="slider">
                    <div class="slider-container">
                        <!-- Imagen actual del slider -->
                        <div
                            class="slider-item"
                            :style="{ backgroundImage: 'url(' + sliderImgs[itemIndex].src + ')' }"
                        >
                            <div class="item-title__container">
                                <h2 class="item-title__title">{{ sliderImgs[itemIndex].title }}</h2>
                            </div>
                        </div>
                    
                        <!-- Controles -->
                        <button class="arrow prev-item" @click="prevSlide">‹</button>
                        <button class="arrow next-item" @click="nextSlide">›</button>
                    
                        <!-- Paginación -->
                        <ul class="pagination">
                            <li v-for="(img, index) in sliderImgs" :key="index">
                                <button
                                    class="dot"
                                    :class="{ active: index === itemIndex }"
                                    @click="goToSlide(index)"
                                ></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="servicios-container">
                <h1>Algunos de nuestros servicios mas solicitados</h1>
                <section class="servicios">
                    <div class="servLimpieza">

                    </div>
                    <div class="servOrtodoncia">

                    </div>
                    <div class="servBlanquiamiento">

                    </div>
                    <div class="servExtracciones">

                    </div>
                </section>

            </section>
            <section class="promociones-container">
                <h1>Promociones</h1>
                <section class="promociones">
                    <div class="promOrtodoncia">

                    </div>
                    <div class="promBlanqueamiento">

                    </div>
                    <div class="promEndodoncia">
                        
                    </div>
                </section>
                <div class="btnAgendar">
                    <button type="button" id="btnAgendarPromociones" class="btnAgendarProm">
                        Agenda Ahora
                        <ArrowLongRightIcon class="arrowIcon" />
                    </button>
                </div>
                
            </section>
            <section class="direccionInfo-container">
                <section class="niceComments">
                    <h1>Reseñas</h1>
                </section>
                <section class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7580915507997!2d-78.44251930000003!3d-0.3148209999999978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5bd12538eb13b%3A0x907c61f1abbe45ab!2sUNIVERSITY%20OF%20THE%20ARMED%20FORCES%20ESPE!5e0!3m2!1sen!2sec!4v1733323393170!5m2!1sen!2sec" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </section>
            </section>
        </div>
        
        
        <footer>
            <p>&copy; 2025 Mi Consultorio Dental. Todos los derechos reservados.</p>
        </footer>
</template>

<script>
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'Home',
    components: {
        ArrowLongRightIcon,
    },
    data() {
        return {
            sliderImgs: [
                { title: "Bienvenido a Nuestro Consultorio", src: "/imgSlider/imagen1.jpg" },
                { title: "Cuidamos Tu Sonrisa", src: "/imgSlider/imagen2.jpg" },
                { title: "Profesionales a Tu Servicio", src: "/imgSlider/imagen3.jpg" }
            ],
            itemIndex: 0,
            isPaused: false,
            autoSlideInterval: null,
            resumeTimeout: null
        };
    },
    mounted() {
        this.startAutoSlide();
    },
    methods: {
        startAutoSlide() {
            this.autoSlideInterval = setInterval(() => {
                if (!this.isPaused) this.nextSlide();
            }, 5000);
        },
        stopAutoSlide() {
            this.isPaused = true;
            clearTimeout(this.resumeTimeout);
            this.resumeTimeout = setTimeout(() => {
                this.isPaused = false;
            }, 6000);
        },
        nextSlide() {
            this.stopAutoSlide();
            this.itemIndex = (this.itemIndex + 1) % this.sliderImgs.length;
        },
        prevSlide() {
            this.stopAutoSlide();
            this.itemIndex =
                this.itemIndex === 0 ? this.sliderImgs.length - 1 : this.itemIndex - 1;
        },
        goToSlide(index) {
            this.stopAutoSlide();
            this.itemIndex = index;
        },
    }
};
</script>

<style scoped>
    header {
        background-color: #5379a4;
        color: white;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }

    .logo img{
        width: 100px;
        border-radius: 50%;
        margin-left: 30px;
    }

    .pageInfo{
        width: 100%;
        display:  flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .login-container{
        display: flex;
        margin-right: 40px;
        justify-content: space-between;
        gap: 10px;
    }

    .menu-container{
        width: 80%;
        margin-left: 40px;
    }

    .navMenu{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    nav {
        background: #486f99;
        padding: 1rem;
        color: white;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        border: 2px solid black;
    }

    nav ul {
        list-style: none;
        padding: 0;
    }

    nav ul li {
        display: inline;
        margin-right: 1rem;
    }

    nav ul li a {
        color: white;
        text-decoration: none;
    }

    .menu {
        list-style: none;
        position: relative;
    }

    .menu > li {
        display: inline-block;
        position: relative;
    }

    .menu a {
        color: black;
        text-decoration: none;
        padding: 10px 15px;
        display: block;
    }

    .directCita{
        width: 20%;
    }

    .directCita button{
        position: relative;
        margin: 10px;
        margin-right: 20px;
        width: 80%;
        height: 70%;
    }

    .slider-container {
        position: relative;
        width: 100%;
        height: 500px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .slider-item {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease-in-out;
    }

    .item-title__container {
        background: rgba(255, 255, 255, 0.8);
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .item-title__title {
        color: #007BFF;
        font-size: 28px;
        text-align: center;
        font-weight: bold;
    }

    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 123, 255, 0.8);
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 24px;
        z-index: 10;
        border-radius: 50%;
        transition: background 0.3s;
    }

    .arrow:hover {
        background: rgba(0, 123, 255, 1);
    }

    .prev-item {
        left: 20px;
    }

    .next-item {
        right: 20px;
    }

    .pagination {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
    }

    .pagination li {
        list-style: none;
    }

    .dot {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        cursor: pointer;
        transition: background 0.3s;
    }

    .dot.active, .dot:hover {
        background: rgba(0, 123, 255, 1);
    }

    .servicios{
        display: flex;
        margin: auto;
        justify-content: center;
        gap: 10px;
    }

    .servicios div {
        position: relative;
        width: 20%;
        height: 500px;
        border-radius: 10px;
        border: 3px solid black;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .promociones-container{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: auto;
    }

    .promociones{
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .promociones div {
        position: relative;
        width: 20%;
        height: 200px;
        border-radius: 10px;
        border: 3px solid black;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .btnAgendar{
        width: 64%;
        left: 26.5%;
        margin: auto;
    }

    .btnAgendar button{
        position: relative;
        margin-top: 10px;
        float: right;
        height: auto;
    }

    .arrowIcon{
        width: 50px;
    }

    .btnAgendarProm{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .direccionInfo-container{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin: auto;
        width: 90%;
        gap: 30px;
        margin-bottom: 20px;
    }

    section.map {
    width: 60%;
    min-width: 300px; 
    box-sizing: border-box;
    height: auto;
    }

    section.map {
        height: auto;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }


    iframe {
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 400px;
        border-radius: 10px;
    }

    .niceComments{
        width: 40%;
        border: 3px solid black;
    }


    footer {
        background-color: #486f99;
        color: white;
        text-align: center;
        padding: 10px;
    }
</style>