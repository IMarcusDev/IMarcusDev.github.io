<template>
    <div class="content">
        <div class="form-content">
            <div class="form-info">
                <div class="logo"></div>
                <div class="titulo"><h2>Agregar Secretario</h2></div>
            </div>
            <form @submit.prevent="submitForm" class="formDoctor">
                <div class="form-group">
                    <label for="cedula_doc">Cédula:</label>
                    <input type="text" ref="cedula" v-model="cedula_doc" @input="validateCedula" placeholder="Ingrese la cédula" required />
                    <span v-if="errors.cedula">{{ errors.cedula }}</span>
                </div>
                <div class="form-group">
                    <label for="nombre_doc">Nombre:</label>
                    <input type="text" ref="nombre" v-model="nombre_doc" @input="validateNombre" placeholder="Ingrese el nombre" required />
                    <span v-if="errors.nombre">{{ errors.nombre }}</span>
                </div>
                <div class="form-group">
                    <label for="apellido_doc">Apellido:</label>
                    <input type="text" ref="apellido" v-model="apellido_doc" @input="validateApellido" placeholder="Ingrese el apellido" required />
                    <span v-if="errors.apellido">{{ errors.apellido }}</span>
                </div>
                <div class="form-group">
                    <label for="email_doc">Email:</label>
                    <input type="text" ref="email" v-model="email_doc" @input="validateEmailInput" placeholder="Ingrese el email" required />
                    <span v-if="errors.email">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                    <label for="username_doc">username:</label>
                    <input type="text" ref="username" v-model="username_doc" @input="validateUsername" placeholder="Ingrese el nombre de usuario" required />
                    <span v-if="errors.username">{{ errors.username }}</span>
                </div>
                <div class="form-group">
                    <label for="password_doc">Password:</label>
                    <input type="text" ref="password" v-model="password_doc" @input="validatePasswordInput" placeholder="Ingrese la contraseña" required />
                    <span v-if="errors.password">{{ errors.password }}</span>
                </div>
                <button type="submit" class="btn-submit">Agregar secretario</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios';
import { useUserStore } from '../store/userStore';

export default {
    name: 'registrarSecretario',
    data() {
        return {
            cedula_doc: '',
            nombre_doc: '',
            apellido_doc: '',
            email_doc: '',
            username_doc: '',
            password_doc: '',
            errors: {}
        };
    },
    computed: {
        currentUser() {
            const userStore = useUserStore();
            return userStore.currentUser;
        }
    },
    methods: {
        async submitForm() {
            try {
                const cedula = this.$refs.cedula.value;
                const Names = this.$refs.nombre.value;
                const SurNames = this.$refs.apellido.value;
                const email = this.$refs.email.value;
                const username = this.$refs.username.value;
                const password = this.$refs.password.value;
                
                // const isDuplicate = await this.checkDuplicate(cedula, email, username);
                // if (isDuplicate) {
                //     alert('La cédula, el correo electrónico o el nombre de usuario ya están registrados.');
                //     return;
                // }

                const response = await axios.post('/registrarSecretario', {
                    Names,
                    SurNames,
                    cedula,
                    email,
                    username,
                    password
                });
                if (response.status === 201) {
                    alert('El secretario fue registrado exitosamente');
                    this.resetForm();
                } else {
                    alert('Error al registrar al secretario');
                }
                
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar al secretario');
            }
        },
        async checkDuplicate(cedula, email, username) {
            try {
                const response = await axios.post('/checkDuplicate', { cedula, email, username });
                return response.data.isDuplicate;
            } catch (error) {
                console.log('Error al verificar duplicados:', error);
                return true;
            }
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        validatePassword(password) {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return re.test(password);
        },
        validateEmailInput() {
            if (!this.validateEmail(this.email_doc)) {
                this.errors.email = 'Por favor, ingrese un email válido.';
            } else {
                this.errors.email = '';
            }
        },
        validatePasswordInput() {
            if (!this.validatePassword(this.password_doc)) {
                this.errors.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.';
            } else {
                this.errors.password = '';
            }
        },
        validateCedula() {
            const cedula = this.cedula_doc;
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
            const validator = 10 - (sum % 10);
            this.errors.cedula = validator === lastDigit ? '' : 'Cédula no válida';
        },
        validateNombre() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.nombre = !regex.test(this.nombre_doc) ? 'El nombre no puede contener números' : '';
        },
        validateApellido() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.apellido = !regex.test(this.apellido_doc) ? 'El apellido no puede contener números' : '';
        },
        validateUsername() {
            const regex = /^[a-zA-Z0-9_]*$/;
            this.errors.username = !regex.test(this.username_doc) ? 'El nombre de usuario solo puede contener letras, números y guiones bajos' : '';
        },
        resetForm() {
            this.cedula_doc = '';
            this.nombre_doc = '';
            this.apellido_doc = '';
            this.email_doc = '';
            this.username_doc = '';
            this.password_doc = '';
        }
    }
};
</script>

<style scoped>
.content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.form-content {
    width: 50%;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(163, 163, 163, 0.4);
}

.form-info {
    text-align: center;
    margin-bottom: 20px;
}

.form-info .titulo h2 {
    color: black;
}

.formDoctor {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-group label {
    margin-bottom: 5px;
    font-weight: bold;
    color: black;
}

.form-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(163, 163, 163, 0.4);
}

.btn-submit {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-submit:hover {
    background-color: #0056b3;
}
</style>