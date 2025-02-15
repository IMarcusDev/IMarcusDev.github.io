<template>
    <div class="form-container">
        <form @submit.prevent="handleRegister">
            <h2>Registrar Paciente</h2>
            <input type="text" ref="Names" placeholder="Nombres" v-model="registerForm.Names" @input="validateNames">
            <span v-if="errors.Names">{{ errors.Names }}</span>
            <input type="text" ref="SurNames" placeholder="Apellidos" v-model="registerForm.SurNames" @input="validateSurNames">
            <span v-if="errors.SurNames">{{ errors.SurNames }}</span>
            <input type="text" ref="cedula" placeholder="Cedula" v-model="registerForm.cedula" @input="validateCedula">
            <span v-if="errors.cedula">{{ errors.cedula }}</span>
            <input type="date" ref="age" v-model="registerForm.age" @input="validateAge">
            <span v-if="errors.age">{{ errors.age }}</span>
            <input type="email" ref="email" placeholder="Correo Electrónico" v-model="registerForm.email" @input="validateEmail">
            <span v-if="errors.email">{{ errors.email }}</span>
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<script>
import axios from '../api/axios';

export default {
    name: 'registrarPaciente',
    data() {
        return {
            registerForm: {
                Names: '',
                SurNames: '',
                cedula: '',
                age: '',
                email: ''
            },
            errors: {}
        };
    },
    methods: {
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
            const validator = 10 - (sum % 10);
            this.errors.cedula = validator === lastDigit ? '' : 'Cédula no válida';
        },
        validateAge() {
            this.errors.age = !this.registerForm.age ? 'La fecha de nacimiento es obligatoria' : '';
        },
        validateEmail() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.errors.email = !regex.test(this.registerForm.email) ? 'Correo electrónico no válido' : '';
        },
        async handleRegister() {
            this.validateNames();
            this.validateSurNames();
            this.validateCedula();
            this.validateAge();
            this.validateEmail();

            if (this.errors.Names || this.errors.SurNames || this.errors.cedula || this.errors.age || this.errors.email) {
                return;
            }

            const { Names, SurNames, cedula, age, email } = this.registerForm;

            if (!Names || !SurNames || !cedula || !age || !email) {
                alert('Por favor, complete todos los campos');
                return;
            }

            try {
                const response = await axios.post('/registerFromDoc', {
                    Names,
                    SurNames,
                    cedula,
                    fecha_nac: age,
                    email
                });

                if (response.status === 201) {
                    alert('Paciente registrado exitosamente');
                    this.$emit('registered', { Names, SurNames, cedula });
                } else {
                    alert('Error al registrar paciente');
                }
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar paciente');
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

.form-container {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    padding: 20px;
    max-width: 500px;
    margin: auto;
}

.form-container h2 {
    color: black;
    text-align: center;
    margin-bottom: 20px;
}

.form-container input {
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
}

.form-container button {
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
    width: 100%;
}
</style>
