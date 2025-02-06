<template>
    <div class="historial">
        <h2>Historial de Citas</h2>
        <div class="content">
            <div class="busqueda">
                <input type="text" v-model="busquedaCedula" placeholder="Buscar por número de cédula" />
                <input type="date" v-model="busquedaFecha"/>
                <button @click="buscarCitas">Buscar</button>
            </div>
            <div v-if="citas.length > 0" class="tabla-citas">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de Cita</th>
                            <th>Número de Cédula</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in citas" :key="cita.id">
                            <td>{{ cita.fecha }}</td>
                            <td>{{ cita.tipoCita }}</td>
                            <td>{{ cita.cedula }}</td>
                            <td>{{ cita.estado }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="no-citas">
                <p>No se encontraron citas.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import axios from '../api/axios';

export default {
    name: 'Historial',
    data() {
        return {
            busquedaCedula: '',
            busquedaFecha: '',
            citas: [],
            cita: {
                fecha: '',
                tipoCita: '',
                cedula: '',
                estado: ''
            }
        };
    },
    computed: {
        currentUser() {
            const userStore = useUserStore();
            return userStore.currentUser;
        }
    },
    methods: {
        async buscarCitas() {
            const user = this.currentUser;

            try {
                const response = await axios.post('/historialCitas', {
                    user
                });

                this.citas = response.data.data.map(cita => ({
                    fecha: cita.fecha_realizar_cita.slice(0,-14),
                    tipoCita: cita.asunto_cita,
                    cedula: cita.cedula_paciente_cita,
                    estado: cita.estado_cita
                }));

                if (response.status !== 200) {
                    alert('Error al cargar las citas');
                }
            } catch (error) {
                console.error('Error al buscar citas:', error);
                this.citas = [];
            }
        }
    },
    async created() {
        await this.buscarCitas();
    }
};
</script>

<style scoped>
.historial {
    width: 80%;
    margin: 20px auto;
    font-family: Arial, sans-serif;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.content {
    width: 90%;
    background-color: #a6bddc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;

}

.busqueda {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
}

.busqueda input[type="text"],
.busqueda input[type="date"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    background-color: white;
}

.busqueda input[type="text"]{
    width: 50%;
}

.busqueda input[type="date"]{
    width: 20%;
}

.busqueda button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
    width: 20%;
}

.busqueda button:hover {
    background-color: #0056b3;
}

.tabla-citas {
    width: 100%;
    border-collapse: collapse;
    margin-left: 30px;
}

.tabla-citas table{
    width: 90%;
    border-color: black
}

.tabla-citas th, .tabla-citas td {
    border: 1px solid black;
    padding: 12px;
    text-align: center;
    font-size: 16px;
    color: black;
}

.tabla-citas th {
    background-color: #007bff;
    color: white;
}

.no-citas {
    text-align: center;
    color: #6c757d;
    font-size: 18px;
    margin-top: 20px;
}
</style>
