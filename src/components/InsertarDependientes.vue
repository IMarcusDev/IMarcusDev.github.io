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
                    <input type="text" ref="cedula" v-model="cedula_dep" placeholder="Ingrese la cédula" required />
                </div>
                <div class="form-group">
                    <label for="nombre_dep">Nombre:</label>
                    <input type="text" ref="nombre" v-model="nombre_dep" placeholder="Ingrese el nombre" required />
                </div>
                <div class="form-group">
                    <label for="apellido_dep">Apellido:</label>
                    <input type="text" ref="apellido" v-model="apellido_dep" placeholder="Ingrese el apellido" required />
                </div>
                <div class="form-group">
                    <label for="fecha_nac_dep">Fecha de Nacimiento:</label>
                    <input type="date" ref="fecha_nac" v-model="fecha_nac_dep" placeholder="Ingrese la fecha de nacimiento" required />
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
                const nombre = this.$refs.nombre.value;
                const apellido = this.$refs.apellido.value;
                const fecha_nacimiento = this.$refs.fecha_nac.value;
                const user = this.currentUser;

                if (!user) {
                    alert('Usuario no autenticado');
                    return;
                }

                const response = await axios.post('/RegistroDependientes', {
                    user,
                    cedula,
                    nombre,
                    apellido,
                    fecha_nacimiento 
                });
                if (response.status === 201) {
                    alert('El dependiente fue registrado exitosamente');
                } else {
                    alert('Error al registrar el dependiente');
                }
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar el dependiente');
            }
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