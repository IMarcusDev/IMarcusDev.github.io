<template>
    <header>
        <section class="pageInfo">
            <div class="logo">
                <img src="@/assets/Logo.png">
            </div>
            <div class="pageTitle"><h1>VitaDent</h1></div>
            <div>
                <div class="login-container">
                    <div class="login">
                        <router-link to="/Login">
                            <button type="button" id="btnLogin" @click="optionClicked">Iniciar Sesion</button>
                        </router-link>
                    </div>
                    <div class="register">
                        <router-link to="/Login">
                            <button type="button" id="btnRegister" @click="optionClicked">Registrarse</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="navMenu">
            <div class="menu-container">
                <nav>
                    <h2>Tu sonrisa es nuestra prioridad, porque sabemos que al renovarla, transformas tu vida.</h2>
                </nav>
            </div>
            <div class="directCita">
                <router-link to="/Login">
                    <button type="button" id="btnQuickAgend">
                        Agendar cita
                    </button>
                </router-link>
            </div>
        </section>
    </header>    

    <div class="content">
        <!-- Sección de características -->
        <section class="features-section">
            <h1>Nuestras Características</h1>
            <div class="features">
                <div class="feature">
                    <font-awesome-icon icon="tooth" />
                    <h2>Profesionales Calificados</h2>
                    <p>Contamos con un equipo de dentistas altamente calificados y con experiencia.</p>
                </div>
                <div class="feature">
                    <font-awesome-icon icon="heart" />
                    <h2>Atención Personalizada</h2>
                    <p>Ofrecemos atención personalizada para cada uno de nuestros pacientes.</p>
                </div>
                <div class="feature">
                    <font-awesome-icon icon="clock" />
                    <h2>Horarios Flexibles</h2>
                    <p>Disponemos de horarios flexibles para adaptarnos a tus necesidades.</p>
                </div>
            </div>
        </section>

        <!-- Slider de imágenes -->
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

        <!-- Servicios destacados -->
        <section class="servicios-container">
            <h1>Algunos de nuestros servicios más solicitados</h1>
            <section class="servicios">
                <div class="servicio-card">
                    <h2>Limpieza Dental</h2>
                    <p>Mantén tus dientes limpios y saludables con nuestras limpiezas dentales profesionales.</p>
                </div>
                <div class="servicio-card">
                    <h2>Ortodoncia</h2>
                    <p>Corrige la alineación de tus dientes con nuestros tratamientos de ortodoncia.</p>
                </div>
                <div class="servicio-card">
                    <h2>Blanqueamiento Dental</h2>
                    <p>Obtén una sonrisa más blanca y brillante con nuestros tratamientos de blanqueamiento dental.</p>
                </div>
                <div class="servicio-card">
                    <h2>Extracciones</h2>
                    <p>Realizamos extracciones dentales de manera segura y sin dolor.</p>
                </div>
            </section>
        </section>

        <!-- Promociones -->
        <section class="promociones-container">
            <h1>Promociones</h1>
            <section class="promociones">
                <div class="prom-card">
                    <img src="@/assets/imgSlider/prom1.webp" alt="Promoción Ortodoncia">
                    <div class="prom-info">
                        <h2>Descuento en Ortodoncia</h2>
                        <p>Aprovecha un 20% de descuento en tratamientos de ortodoncia.</p>
                    </div>
                </div>
                <div class="prom-card">
                    <img src="@/assets/imgSlider/prom2.webp" alt="Promoción Blanqueamiento">
                    <div class="prom-info">
                        <h2>Blanqueamiento Dental</h2>
                        <p>Obtén un blanqueamiento dental a mitad de precio.</p>
                    </div>
                </div>
                <div class="prom-card">
                    <img src="@/assets/imgSlider/prom3.webp" alt="Promoción Endodoncia">
                    <div class="prom-info">
                        <h2>Descuento en Endodoncia</h2>
                        <p>Recibe un 15% de descuento en tratamientos de endodoncia.</p>
                    </div>
                </div>
            </section>
            
            <div class="btnAgendar">
                <router-link to="/Login">
                    <button type="button" id="btnAgendarPromociones" class="btnAgendarProm">
                        Agenda Ahora
                        <ArrowLongRightIcon class="arrowIcon" />
                    </button>
                </router-link>
            </div>
        </section>

        <!-- Testimonios -->
        <section class="testimonios-container">
            <h1>Testimonios de nuestros pacientes</h1>
            <div class="testimonios-carrusel">
                <div class="testimonio" v-for="(testimonio, index) in testimonios" :key="index">
                    <p>"{{ testimonio.texto }}"</p>
                    <p><strong>- {{ testimonio.nombre }}</strong></p>
                </div>
            </div>
        </section>

        <!-- Mapa -->
        <section class="map-container">
            <h1>Encuéntranos</h1>
            <section class="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7580915507997!2d-78.44251930000003!3d-0.3148209999999978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5bd12538eb13b%3A0x907c61f1abbe45ab!2sUNIVERSITY%20OF%20THE%20ARMED%20FORCES%20ESPE!5e0!3m2!1sen!2sec!4v1733323393170!5m2!1sen!2sec" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </section>

        <!-- Sección de preguntas frecuentes y contacto -->
        <section class="faq-contact-container">
            <!-- Sección de preguntas frecuentes -->
            <section class="faq-section">
                <h1>Preguntas Frecuentes</h1>
                <div class="faq">
                    <div class="faq-item">
                        <h2>¿Cómo puedo agendar una cita?</h2>
                        <p>Puedes agendar una cita a través de nuestro sitio web o llamándonos al +593 998765412.</p>
                    </div>
                    <div class="faq-item">
                        <h2>¿Aceptan seguros dentales?</h2>
                        <p>Sí, aceptamos una amplia variedad de seguros dentales. Contáctanos para más información.</p>
                    </div>
                    <div class="faq-item">
                        <h2>¿Qué debo hacer en caso de una emergencia dental?</h2>
                        <p>En caso de una emergencia dental, llámanos de inmediato para recibir atención prioritaria.</p>
                    </div>
                </div>
            </section>

            <!-- Formulario de contacto -->
            <section class="contacto-container">
                <h1>Contáctanos</h1>
                <form @submit.prevent="enviarFormulario">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" v-model="formulario.nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="formulario.email" required>
                    </div>
                    <div class="form-group">
                        <label for="mensaje">Mensaje</label>
                        <textarea id="mensaje" v-model="formulario.mensaje" required></textarea>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </section>
        </section>
    </div>
    
    <footer>
        <section class="infoFooter">
            <section class="logoFooter">
                <h2>VitaDent</h2>
                <p> <i class="fa-solid fa-map-pin"></i> Moreno Bellido #200 y Av. Amazonas </p>
                <p> <i class="fa-solid fa-phone"></i> +593 998765412</p>
                <p> <i clas="fa-solid fa-envelope"></i><a href="mailto:dentalmax@gmai.com">vitadent@gmail.com</a></p>
            </section>
            <section class="infoDerecha"> 
                &copy; VitaDent
            </section>
        </section>
    </footer>
</template>

<script>
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid';
import { useUserStore } from '../store/userStore';
import { useLoginStore } from '../store/loginStore';

export default {
    name: 'Home',
    components: {
        ArrowLongRightIcon,
    },
    data() {
        return {
            sliderImgs: [
                { title: "Bienvenido a Nuestro Consultorio", src: "../assets/imgSlider/sliderImg1.webp" },
                { title: "Cuidamos Tu Sonrisa", src: "../assets/imgSlider/sliderImg2.webp" },
                { title: "Profesionales a Tu Servicio", src: "../assets/imgSlider/sliderImg3.jpg" }
            ],
            itemIndex: 0,
            isPaused: false,
            autoSlideInterval: null,
            resumeTimeout: null,
            testimonios: [
                { nombre: "Juan Pérez", texto: "Excelente servicio y atención. Muy profesionales.", foto: "/imgTestimonios/juan.jpg" },
                { nombre: "María López", texto: "Me sentí muy cómoda durante mi tratamiento. ¡Recomendado!", foto: "/imgTestimonios/maria.jpg" },
                { nombre: "Carlos García", texto: "El mejor consultorio dental al que he ido. Muy satisfecho con los resultados.", foto: "/imgTestimonios/carlos.jpg" },
                { nombre: "Ana Martínez", texto: "Un trato excepcional y resultados increíbles. Muy agradecida.", foto: "/imgTestimonios/ana.jpg" }
            ],
            formulario: {
                nombre: '',
                email: '',
                mensaje: ''
            }
        };
    },
    mounted() {
        this.startAutoSlide();
        sessionStorage.clear();
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
        optionClicked(event) {
            const loginOptionStore = useLoginStore();
            if (event.target.id === 'btnLogin') {
                loginOptionStore.setSelectedBtn('iniciarSesion');
            } else if (event.target.id === 'btnRegister') {
                loginOptionStore.setSelectedBtn('registrarse');
            }
        },
        enviarFormulario() {
            // Lógica para enviar el formulario
            alert(`Mensaje enviado por ${this.formulario.nombre}`);
            this.formulario.nombre = '';
            this.formulario.email = '';
            this.formulario.mensaje = '';
        }
    }
};
</script>

<style scoped>
header {
    background-color: #4a90e2;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo img {
    width: 150px;
    border-radius: 50%;
    margin-left: 30px;
}

.pageInfo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login-container {
    display: flex;
    margin-right: 40px;
    justify-content: space-between;
    gap: 10px;
}

.login button, .register button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login button:hover, .register button:hover {
    background-color: #0056b3;
}

.menu-container {
    width: 80%;
    margin-left: 40px;
}

.navMenu {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

nav {
    background: #357ABD;
    padding: 1rem;
    color: white;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    border: 2px solid #2a5d9e;
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
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    display: block;
}

.directCita {
    width: 20%;
}

.directCita button {
    background-color: #007BFF;
    color: white;
    width: 70%;
    height: 70%;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.directCita button:hover {
    background-color: #0056b3;
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
    background: transparent;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 80px;
    z-index: 10;
    border-radius: 40%;
    transition: background 0.3s, transform 0.3s;
    outline: none; /* Add this line to remove the border */
}

.arrow:focus {
    outline: none; /* Add this line to remove the border */
}

.arrow:hover {
    transform: translateY(-50%) scale(1.1);
    border: none;
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
    transition: background 0.3s, transform 0.3s;
    display: inline-block;
    margin: 0;
    padding: 0;
}

.dot.active, .dot:hover {
    background: rgba(0, 123, 255, 1);
    transform: scale(1.2);
}

.servicios {
    display: flex;
    margin: auto;
    justify-content: center;
    gap: 10px;
}

.servicio-card {
    width: 20%;
    height: auto;
    border-radius: 10px;
    border: 3px solid #357ABD;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #e6f2ff;
    padding: 20px;
    text-align: center;
}

.promociones-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
}

.promociones {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.btnAgendar {
    width: 64%;
    left: 26.5%;
    margin: auto;
}

.btnAgendar button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    float: right;
    margin-top: 10px;
}

.btnAgendar button:hover {
    background-color: #0056b3;
}

.arrowIcon {
    width: 30px;
    margin-left: 10px;
}

.direccionInfo-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin: auto;
    width: 90%;
    gap: 30px;
    margin-bottom: 20px;
    margin-top: 20px;
}

section.map {
    width: 80%;
    min-width: 300px;
    box-sizing: border-box;
    height: auto;
    margin: auto;
}

section.map {
    height: 500px;
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

.testimonios {
    text-align: center;
    padding: 50px 20px;
    background-color: var(--white-color);
    color: var(--text-color);
    margin-bottom: 40px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    margin: auto;
}

.testimonios-carrusel {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 20px 0;
    justify-content: center;
}

.testimonio {
    flex: 0 0 auto;
    min-width: 250px;
    max-width: 300px;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: center;
}

.testimonio-foto {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
}

footer{
    padding: 40px 20px;
    text-align: center;
    background-color: #357ABD;
    color: #f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
}

.infoFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.logoFooter, .infoDerecha {
    flex: 1;
    margin: 20px;
}

.fotoFooter {
    width: 150px;
    margin-bottom: 20px;
    background-color: #f4e7d1;
    padding: 10px;
    border-radius: 10px;
}

footer p {
    font-size: 14px;
    margin: 10px;
    color: #d1d1d1;
}

footer h2 {
    font-size: 24px;
    color: #f4e7d1;
    margin-bottom: 10px;
}

footer a {
    color: #f4e7d1;
    text-decoration: none;
}

footer .redesSociales {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

footer .icono {
    margin: 0 10px;
}

footer .icono img {
    width: 25px;
    height: 25px;
    border-radius: 10px;

}

footer .icono:hover img {
    transform: scale(1.1);
    transition: transform 0.3s ease;
}

.niceComments{
    color: black;
}

nav h2{
    text-align: center;
}

.welcome-section {
    text-align: center;
    padding: 50px 20px;
    background-color: var(--background-color);
    color: var(--text-color);
    margin-bottom: 40px;
}

.features-section {
    text-align: center;
    padding: 50px 20px;
    background-color: var(--white-color);
    color: var(--text-color);
    margin-bottom: 40px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
}

.features {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.feature {
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: center;
}

.feature i {
    font-size: 40px;
    color: var(--primary-color);
    margin-bottom: 10px;
}

.feature h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.feature p {
    font-size: 16px;
    color: var(--text-color);
}

.contacto-container {
    padding: 50px 20px;
    background-color: var(--white-color);
    color: var(--text-color);
    margin-bottom: 40px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    text-align: center;
}

.contacto-container .form-group {
    margin-bottom: 20px;
}

.contacto-container label {
    display: block;
    margin-bottom: 5px;
}

.contacto-container input,
.contacto-container textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
}

.contacto-container button {
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    padding: 10px 20px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s;
}

.contacto-container button:hover {
    background-color: var(--secondary-color);
}

.servicios-container {
    text-align: center;
    padding: 50px 20px;
    background-color: var(--white-color);
    color: var(--text-color);
    margin-bottom: 40px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
}

.servicios {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.servicio-card {
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: center;
}

.promociones-container {
    text-align: center;
    padding: 50px 20px;
    background-color: var(--white-color);
    color: var(--text-color);
    margin-bottom: 40px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
}

.promociones {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.prom-card {
    border-radius: 10px;
    border: 3px solid #357ABD;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    height: 350px;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: center;
}

.prom-card img {
    width: 100%;
}

.prom-info {
    padding: 10px 0;
}

.prom-info h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.prom-info p {
    font-size: 16px;
    color: var(--text-color);
}

.faq-section {
    text-align: center;
    padding: 50px 20px;
    background-color: var(--white-color);
    color: var (--text-color);
    margin-bottom: 40px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
}

.faq {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.faq-item {
    padding: 20px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: left;
}

.faq-item h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.faq-item p {
    font-size: 16px;
    color: var(--text-color);
}

.testimonios-container {
    text-align: center;
    padding: 50px 20px;
    color: var(--text-color);
    border-radius: var(--border-radius);
}

.testimonios-carrusel {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 20px 0;
}

.testimonio {
    flex: 0 0 auto;
    min-width: 250px;
    max-width: 300px;
    padding: 20px;
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: center;
}

.testimonio-foto {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
}

.map-container {
    text-align: center;
    padding: 0 20px;
    color: var(--text-color);
    margin-bottom: 40px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
}

.map {
    width: 80%;
    height: 500px;
    border-radius: var(--border-radius);
    overflow: hidden;
    position: relative;
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: var(--border-radius);
}

.faq-contact-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 50px 20px;
    background-color: var(--white-color);
    color: var(--text-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
}

.faq-section, .contacto-container {
    flex: 1;
    min-width: 300px;
}

.faq-section {
    padding-right: 20px;
}

.contacto-container {
    padding-left: 20px;
}
</style>