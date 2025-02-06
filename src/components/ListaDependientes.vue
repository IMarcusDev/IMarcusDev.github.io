<template>
    <div class="content">
        <div class="lista-content">
            <div class="header">
                <h2>Lista de Dependientes</h2>
            </div>
            <div class="stats">
                <p>Total de Dependientes: {{ dependientes.length }}</p>
                <!-- Agregar mas estadisticas en el futuro -->
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dependiente in dependientes" :key="dependiente.cedula_dep">
                        <td>{{ dependiente.cedula_dep }}</td>
                        <td>{{ dependiente.nombre_dep }}</td>
                        <td>{{ dependiente.apellido_dep }}</td>
                        <td>{{ dependiente.fecha_nac_dep }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios';

export default {
    name: 'ListaDependientes',
    data() {
        return {
            dependientes: []
        };
    },
    created() {
        this.fetchDependientes();
    },
    methods: {
        async fetchDependientes() {
            try {
                const response = await axios.get('/dependientes');
                this.dependientes = response.data;
            } catch (error) {
                console.error('Error fetching dependientes:', error);
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

.table tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
