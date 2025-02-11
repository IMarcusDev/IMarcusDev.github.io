<template>
    <div class="content">
        <div class="form-content">
            <div class="form-info">
                <div class="logo"></div>
                <div class="titulo"><h2>Agregar Doctor</h2></div>
            </div>
            <form @submit.prevent="submitForm" class="formDoctor">
                <div class="form-group">
                    <label for="cedula_doc">Cédula:</label>
                    <input type="text" ref="cedula" v-model="cedula_doc" placeholder="Ingrese la cédula" required />
                </div>
                <div class="form-group">
                    <label for="nombre_doc">Nombre:</label>
                    <input type="text" ref="nombre" v-model="nombre_doc" placeholder="Ingrese el nombre" required />
                </div>
                <div class="form-group">
                    <label for="apellido_doc">Apellido:</label>
                    <input type="text" ref="apellido" v-model="apellido_doc" placeholder="Ingrese el apellido" required />
                </div>
                <div class="form-group">
                    <label for="email_doc">Email:</label>
                    <input type="text" ref="email" v-model="email_doc" placeholder="Ingrese el email" required />
                </div>
                <div class="form-group">
                    <label for="username_doc">username:</label>
                    <input type="text" ref="username" v-model="username_doc" placeholder="Ingrese el nombre de usuario" required />
                </div>
                <div class="form-group">
                    <label for="password_doc">Password:</label>
                    <input type="text" ref="password" v-model="password_doc" placeholder="Ingrese la contraseña" required />
                </div>
                <button type="submit" class="btn-submit">Agregar doctor</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios';
import { useUserStore } from '../store/userStore';

export default {
    name: 'registrarDoctor',
    data() {
        return {
            cedula_doc: '',
            nombre_doc: '',
            apellido_doc: '',
            email_doc: '',
            id_pac: ''
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

                const response = await axios.post('/registrarDoctor', {
                    Names,
                    SurNames,
                    cedula,
                    email,
                    username,
                    password
                });
                if (response.status === 201) {
                    alert('El doctor fue registrado exitosamente');
                    this.resetForm();
                } else {
                    alert('Error al registrar al doctor');
                }
                
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar al doctor');
            }
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