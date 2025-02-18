<template>
    <div class="content">
        <div class="lista-content">
            <div class="header">
                <h2>Lista de Doctores y Secretarios</h2>
            </div>
            <div class="stats">
                <p>Total de Doctores: {{ totalDoctores }}</p>
                <p>Total de Secretarios: {{ totalSecretarios }}</p>
            </div>
            <div class="busqueda">
                <input type="text" v-model="busquedaCedula" placeholder="Buscar por número de cédula" />
                <select v-model="busquedaTipo">
                    <option value="">Todos</option>
                    <option value="doctor">Doctor</option>
                    <option value="secretario">Secretario</option>
                </select>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="persona in personasFiltradas" :key="persona.cedula">
                        <td>{{ persona.cedula }}</td>
                        <td>{{ persona.nombre }}</td>
                        <td>{{ persona.apellido }}</td>
                        <td>{{ persona.tipo }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import axios from '../api/axios';

export default {
    name: 'ListaDoctoresSecretarios',
    data() {
        return {
            personas: [],
            busquedaCedula: '',
            busquedaTipo: ''
        };
    },
    computed: {
        totalDoctores() {
            return this.personas.filter(persona => persona.tipo === 'doctor').length;
        },
        totalSecretarios() {
            return this.personas.filter(persona => persona.tipo === 'secretario').length;
        },
        personasFiltradas() {
            return this.personas.filter(persona =>
                (!this.busquedaCedula || persona.cedula.includes(this.busquedaCedula)) &&
                (!this.busquedaTipo || persona.tipo === this.busquedaTipo)
            );
        }
    },
    created() {
        this.fetchPersonas();
    },
    methods: {
        async fetchPersonas() {
            try {
                const response = await axios.post('/ListaDoctoresSecretarios');
                this.personas = response.data.data;
                if (response.status !== 200) {
                    alert('Error al cargar la lista');
                }
            } catch (error) {
                console.error('Error fetching personas:', error);
                this.personas = [];
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

.lista-content {
    width: 80%;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(163, 163, 163, 0.4);
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.header h2 {
    color: black;
}

.stats {
    margin-bottom: 20px;
    font-size: 1.2rem;
    color: black;
}

.busqueda {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
}

.busqueda input[type="text"],
.busqueda select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    background-color: white;
}

.busqueda input[type="text"] {
    width: 50%;
}

.busqueda select {
    width: 20%;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
}

.table th {
    background-color: #007bff;
    color: white;
}

.table tr {
    color: black;
}

.table tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
