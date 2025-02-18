<template>
    <div class="content">
        <div class="form-content">
            <div class="form-info">
                <div class="logo"></div>
                <div class="titulo"><h2>Agregar Dependiente</h2></div>
            </div>
            <form @submit.prevent="submitForm" class="formDependientes">
                <div class="form-group">
                    <label for="cedula_dep">Cédula:</label>
                    <input type="text" ref="cedula" v-model="cedula_dep" @input="validateCedula" placeholder="Ingrese la cédula" required />
                    <span v-if="errors.cedula">{{ errors.cedula }}</span>
                </div>
                <div class="form-group">
                    <label for="nombre_dep">Nombre:</label>
                    <input type="text" ref="nombre" v-model="nombre_dep" @input="validateNombre" placeholder="Ingrese el nombre" required />
                    <span v-if="errors.nombre">{{ errors.nombre }}</span>
                </div>
                <div class="form-group">
                    <label for="apellido_dep">Apellido:</label>
                    <input type="text" ref="apellido" v-model="apellido_dep" @input="validateApellido" placeholder="Ingrese el apellido" required />
                    <span v-if="errors.apellido">{{ errors.apellido }}</span>
                </div>
                <div class="form-group">
                    <label for="fecha_nac_dep">Fecha de Nacimiento:</label>
                    <input type="date" ref="fecha_nac" v-model="fecha_nac_dep" @input="validateDateInput" placeholder="Ingrese la fecha de nacimiento" required />
                    <span v-if="errors.fecha_nac">{{ errors.fecha_nac }}</span>
                </div>
                <button type="submit" class="btn-submit">Agregar Dependiente</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios';
import { useUserStore } from '../store/userStore';

export default {
    name: 'InsertarDependientes',
    data() {
        return {
            cedula_dep: '',
            nombre_dep: '',
            apellido_dep: '',
            fecha_nac_dep: '',
            username_dep: '',
            email_dep: '',
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
                const nombre = this.$refs.nombre.value;
                const apellido = this.$refs.apellido.value;
                const fecha_nacimiento = this.$refs.fecha_nac.value;
                const user = this.currentUser;

                if (!user) {
                    alert('Usuario no autenticado');
                    return;
                }

                if (!this.validateDate(fecha_nacimiento)) {
                    alert('Por favor, ingrese una fecha de nacimiento válida.');
                    return;
                }

                // const isDuplicate = await this.checkDuplicate(cedula, this.email_dep, this.username_dep);
                // if (isDuplicate) {
                //     alert('La cédula, el correo electrónico o el nombre de usuario ya están registrados.');
                //     return;
                // }

                const response = await axios.post('/RegistroDependientes', {
                    user,
                    cedula,
                    nombre,
                    apellido,
                    fecha_nacimiento 
                });
                if (response.status === 201) {
                    alert('El dependiente fue registrado exitosamente');
                    this.clearForm();
                } else {
                    alert('Error al registrar el dependiente');
                }
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar el dependiente');
            }
        },
        clearForm() {
            this.cedula_dep = '';
            this.nombre_dep = '';
            this.apellido_dep = '';
            this.fecha_nac_dep = '';
            this.errors = {};
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
        validateDate(date) {
            const re = /^\d{4}-\d{2}-\d{2}$/;
            return re.test(date);
        },
        validateDateInput() {
            if (!this.validateDate(this.fecha_nac_dep)) {
                this.errors.fecha_nac = 'Por favor, ingrese una fecha de nacimiento válida.';
            } else {
                this.errors.fecha_nac = '';
            }
        },
        validateCedula() {
            const cedula = this.cedula_dep;
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
        validateNombre() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.nombre = !regex.test(this.nombre_dep) ? 'El nombre no puede contener números' : '';
        },
        validateApellido() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.apellido = !regex.test(this.apellido_dep) ? 'El apellido no puede contener números' : '';
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

.formDependientes {
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