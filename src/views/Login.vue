<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <div id="backgroundLogin">
        <div ref="container" class="container" :class="{ active: !isLogin }">
            <div class="form-container sign-in" :class="{ hidden: !isLogin }">
                <form @submit.prevent="handleLogin">
                    <h2>Iniciar Sesión</h2>
                    <span>o usa tu cedula y contraseña</span>
                    <input type="text" ref="loginUsername" placeholder="Nombre de usuario" v-model="loginForm.username" @input="validateLoginUsername">
                    <span v-if="errors.loginUsername">{{ errors.loginUsername }}</span>
                    <input type="password" ref="loginPassword" placeholder="Contraseña" v-model="loginForm.password" @input="validateLoginPassword">
                    <span v-if="errors.loginPassword">{{ errors.loginPassword }}</span>
                    <a href="#" @click.prevent="$router.push('/forgot-password')">¿Olvidaste tu contraseña?</a>
                    <button>Iniciar Sesión</button>
                    <router-link to="/">
                        <button>Cancelar</button>
                    </router-link>
                </form>
            </div>
            <div class="form-container sign-up" :class="{ hidden: isLogin }">
                <form @submit.prevent="handleRegister">
                    <h2>Crear una cuenta</h2>
                    <input type="text" ref="Names" placeholder="Nombres" v-model="registerForm.Names" @input="validateNames">
                    <span v-if="errors.Names">{{ errors.Names }}</span>
                    <input type="text" ref="SurNames" placeholder="Apellidos" v-model="registerForm.SurNames" @input="validateSurNames">
                    <span v-if="errors.SurNames">{{ errors.SurNames }}</span>
                    <input type="text" ref="cedula" placeholder="Cédula" v-model="registerForm.cedula" @input="validateCedula">
                    <span v-if="errors.cedula">{{ errors.cedula }}</span>
                    <label for="age" class="labelFechaNac">Fecha de Nacimiento:</label>
                    <input type="date" ref="age" id="age" v-model="registerForm.age" @input="validateAge">
                    <span v-if="errors.age">{{ errors.age }}</span>
                    <input type="email" ref="email" placeholder="Correo Electrónico" v-model="registerForm.email" @input="validateEmail">
                    <span v-if="errors.email">{{ errors.email }}</span>
                    <input type="text" ref="username" placeholder="Nombre de usuario" v-model="registerForm.username" @input="validateUsername">
                    <span v-if="errors.username">{{ errors.username }}</span>
                    <input type="password" ref="password" placeholder="Contraseña" v-model="registerForm.password" @input="validatePassword">
                    <span v-if="errors.password">{{ errors.password }}</span>
                    <input type="password" ref="confirmPassword" placeholder="Confirmar Contraseña" v-model="registerForm.confirmPassword" @input="validateConfirmPassword">
                    <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
                    <button type="submit">Registrarse</button>
                    <router-link to="/">
                        <button>Cancelar</button>
                    </router-link>
                </form>
            </div>
            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-left">
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p>Ingresa tus datos personales para acceder a todas las funciones del sitio</p>
                        <button class="hidden" id="login" @click="toggleForm">Iniciar Sesión</button>
                    </div>
                    <div class="toggle-panel toggle-right">
                        <h1>¡Hola!</h1>
                        <p>Regístrate con tus datos personales para acceder a todas las funciones del sitio</p>
                        <button class="hidden" id="register" @click="toggleForm">Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mobile-toggle">
            <button @click="toggleForm">{{ isLogin ? 'Registrarse' : 'Iniciar Sesión' }}</button>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios';
import { useUserStore } from '../store/userStore';
import { useStateStore } from '../store/stateStore';
import { useLoginStore } from '../store/loginStore';

export default {
    name: 'Login',
    data() {
        return {
            registerForm: {
                Names: '',
                SurNames: '',
                cedula: '',
                age: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            },
            loginForm: {
                username: '',
                password: ''
            },
            errors: {},
            isLogin: true
        };
    },
    mounted() {
        const container = this.$refs.container;
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
            this.isLogin = false;
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
            this.isLogin = true;
        });

        const option = this.currenOption;
        this.isLogin = option !== 'registrarse';
    },
    computed: {
        currenOption(){
            const loginOpion = useLoginStore();
            return loginOpion.selectedBtn;
        }
    },
    methods: {
        toggleForm() {
            this.isLogin = !this.isLogin;
            const container = this.$refs.container;
            if (this.isLogin) {
                container.classList.remove("active");
            } else {
                container.classList.add("active");
            }
        },
        validateNames() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.Names = !regex.test(this.registerForm.Names) ? 'El nombre no puede contener números' : '';
        },
        validateSurNames() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.SurNames = !regex.test(this.registerForm.SurNames) ? 'El apellido no puede contener números' : '';
        },
        validateCedula() {
            const cedula = this.registerForm.cedula;
            if (cedula.length !== 10) {
                this.errors.cedula = 'La cédula debe tener 10 dígitos';
                return;
            }
            const digits = cedula.split('').map(Number);
            const provinceCode = parseInt(cedula.substring(0, 2), 10);
            if (provinceCode < 1 || provinceCode > 24) {
                this.errors.cedula = 'Código de provincia no válido';
                return;
            }
            const lastDigit = digits.pop();
            const sum = digits.reduce((acc, digit, index) => {
                if (index % 2 === 0) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                return acc + digit;
            }, 0);
            const validator = (10 - (sum % 10)) % 10;
            this.errors.cedula = validator === lastDigit ? '' : 'Cédula no válida';
        },
        validateAge() {
            this.errors.age = !this.registerForm.age ? 'La fecha de nacimiento es obligatoria' : '';
        },
        validateEmail() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.errors.email = !regex.test(this.registerForm.email) ? 'Correo electrónico no válido' : '';
        },
        validateUsername() {
            const regex = /^[a-zA-Z0-9_]*$/;
            this.errors.username = !regex.test(this.registerForm.username) ? 'El nombre de usuario solo puede contener letras, números y guiones bajos' : '';
        },
        validatePassword() {
            this.errors.password = this.registerForm.password.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : '';
        },
        validateConfirmPassword() {
            this.errors.confirmPassword = this.registerForm.password !== this.registerForm.confirmPassword ? 'Las contraseñas no coinciden' : '';
        },
        validateLoginUsername() {
            const regex = /^[a-zA-Z0-9_]*$/;
            this.errors.loginUsername = !regex.test(this.loginForm.username) ? 'El nombre de usuario solo puede contener letras, números y guiones bajos' : '';
        },
        validateLoginPassword() {
            this.errors.loginPassword = !this.loginForm.password ? 'La contraseña es obligatoria' : '';
        },
        async handleLogin() {
            this.validateLoginUsername();
            this.validateLoginPassword();

            if (this.errors.loginUsername || this.errors.loginPassword) {
                return;
            }

            const { username, password } = this.loginForm;

            if (!username || !password) {
                alert('Por favor, complete todos los campos');
                return;
            }

            try {
                const response = await axios.post('/login', { username, password });
                const userType = response.data.userType;

                const userTypeStore = useStateStore();
                userTypeStore.login(userType);

                const userStore = useUserStore();
                userStore.login(username);

                if (userType === 'medico' || userType === 'secretario') {
                    this.$router.push('/MenuMedico');
                } else if (userType === 'paciente') {
                    this.$router.push('/MenuPaciente');
                } else if (userType === 'administrador'){
                    this.$router.push('/MenuAdmin');
                } else {
                    alert('Usuario no registrado');
                }
            } catch (error) {
                console.error('Error durante el login:', error);
                if (error.response && error.response.status === 404) {
                    alert('Usuario no encontrado');
                } else if (error.response && error.response.status === 401) {
                    alert('Contraseña incorrecta');
                } else {
                    alert('Error al iniciar sesión');
                }
            }
        },
        async handleRegister() {
            this.validateNames();
            this.validateSurNames();
            this.validateCedula();
            this.validateAge();
            this.validateEmail();
            this.validateUsername();
            this.validatePassword();
            this.validateConfirmPassword();

            if (this.errors.Names || this.errors.SurNames || this.errors.cedula || this.errors.age || this.errors.email || this.errors.username || this.errors.password || this.errors.confirmPassword) {
                return;
            }

            const { Names, SurNames, cedula, age, email, username, password } = this.registerForm;

            if (!Names || !SurNames || !cedula || !age || !email || !username || !password) {
                alert('Por favor, complete todos los campos');
                return;
            }

            try {
                const response = await axios.post('/register', {
                    Names,
                    SurNames,
                    cedula,
                    fecha_nac: age,
                    email,
                    username,
                    password
                });

                if (response.status === 201) {
                    alert('Usuario registrado exitosamente');
                    this.$router.push('/login');
                    this.registerForm = {
                        Names: '',
                        SurNames: '',
                        cedula: '',
                        age: '',
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: ''
                    };
                    const container = this.$refs.container;
                    container.classList.remove("active");
                } else {
                    alert('Error al registrar usuario');
                }
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar usuario');
            }
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

body {
    background-color: #c9d6ff;
    background: linear-gradient(to right, #e2e2e2, #c9d6ff);
    height: 100vh;
    margin: 0;
}

#backgroundLogin {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.container {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 90%;
    max-width: 768px;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span {
    font-size: 12px;
    color: black;
}

.container a {
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button {
    background-color: #007BFF;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button.hidden {
    background-color: transparent;
    border-color: #fff;
}

.container form {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    width: 100%;
}

.container form h2 {
    color: black;
}

.container input {
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
}

input::placeholder {
    color: #333;
    opacity: 1;
}

.form-container {
    width: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in {
    display: flex;
    width: 50%;
}

.container.active .sign-in {
    visibility: hidden;
}

.sign-up {
    display: flex;
    width: 50%;
}

.toggle-container {
    display: none;
}

.mobile-toggle {
    display: none;
}

.form-container.hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.5s, opacity 0.5s linear;
}

.form-container:not(.hidden) {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s linear;
}

@media (min-width: 768px) {
    .container {
        flex-direction: row;
        height: 730px;
    }

    .form-container {
        width: 50%;
    }

    .toggle-container {
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: all 0.6s ease-in-out;
        border-radius: 150px 0 0 100px;
        z-index: 1000;
    }

    .container.active .toggle-container {
        transform: translateX(-100%);
        border-radius: 0 150px 100px 0;
    }

    .toggle {
        background-color: #007BFF;
        height: 100%;
        background: linear-gradient(to right, #357ABD, #007BFF);
        color: #fff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: all 0.6s ease-in-out;
    }

    .container.active .toggle {
        transform: translateX(50%);
    }

    .toggle-panel {
        position: absolute;
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 30px;
        text-align: center;
        top: 0;
        transform: translateX(0);
        transition: all 0.6s ease-in-out;
    }

    .toggle-left {
        transform: translateX(-200%);
    }

    .container.active .toggle-left {
        transform: translateX(0);
    }

    .toggle-right {
        right: 0;
        transform: translateX(0);
    }

    .container.active .toggle-right {
        transform: translateX(200%);
    }
}

@media (max-width: 767px) {
    .container {
        flex-direction: column;
        height: auto;
    }

    .form-container {
        width: 100%;
        display: none;
    }

    .form-container.sign-in {
        display: flex;
    }

    .form-container.sign-up {
        display: flex;
    }

    .form-container.hidden {
        display: none;
    }

    .toggle-container {
        display: none;
    }

    .mobile-toggle {
        display: block;
        margin-top: 20px;
    }

    .mobile-toggle button {
        background-color: #007BFF;
        color: #fff;
        font-size: 14px;
        padding: 10px 20px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        cursor: pointer;
    }
}
</style>