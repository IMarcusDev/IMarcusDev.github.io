<template>
    <div class="historial">
        <h2>Historial de Citas</h2>
        <div class="content">
            <div class="busqueda">
                <input type="text" v-model="busquedaCedula" placeholder="Buscar por número de cédula" />
                <input type="date" v-model="busquedaFecha"/>
            </div>
            <div v-if="citas.length > 0" class="tabla-citas">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Tipo de Cita</th>
                            <th>Paciente</th>
                            <th>Número de Cédula</th>
                            <th>Estado</th>
                            <th>Comentario del Doctor</th>
                            <th>Valor</th>
                            <th>Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in citas" :key="cita.id">
                            <td>{{ cita.fecha }}</td>
                            <td>{{ cita.hora }}</td>
                            <td>{{ cita.tipoCita }}</td>
                            <td>{{ cita.nombre_pac }}</td>
                            <td>{{ cita.cedula }}</td>
                            <td>{{ cita.estado }}</td>
                            <td>{{ cita.comentario }}</td>
                            <td>{{ cita.valor }}</td>
                            <td>{{ cita.nombre_doc }}</td>
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
import { useStateStore } from '../store/stateStore';

export default {
    name: 'Historial',
    data() {
        return {
            busquedaCedula: '',
            busquedaFecha: '',
            citas: [],
            citasOriginal: [],
        };
    },
    computed: {
        currentUser() {
            const userStore = useUserStore();
            return userStore.currentUser;
        },
        currentState() {
            const stateStore = useStateStore();
            return stateStore.currentUserType;
        }
    },
    methods: {
        async buscarCitas() {
            try {
                const response = await axios.post('/historialCitas', {
                    user: this.currentUser
                });
                this.procesarCitas(response);
            } catch (error) {
                console.error('Error al buscar citas:', error);
                this.citas = [];
            }
        },
        async buscarCitasTodos() {
            try {
                const response = await axios.post('/historialCitasTodos');
                this.procesarCitas(response);
            } catch (error) {
                console.error('Error al buscar citas:', error);
                this.citas = [];
            }
        },
        procesarCitas(response) {
            if (response.status !== 200) {
                alert('Error al cargar las citas');
                return;
            }
            this.citasOriginal = response.data.data.map(cita => ({
                fecha: cita.fecha_realizar_cita.slice(0, -14),
                hora: cita.hora_cita,
                tipoCita: cita.asunto_cita,
                nombre_pac: cita.nombre_paciente_cita + ' ' + cita.apellido_paciente_cita,
                cedula: cita.cedula_paciente_cita,
                estado: cita.estado_cita,
                comentario: cita.comentario_doc_cita,
                valor: cita.valor_cita,
                nombre_doc: cita.nombres_doc + ' ' + cita.apellidos_doc
            }));
            this.citas = [...this.citasOriginal];
        },
        filtrarCitas() {
            if (!this.busquedaCedula && !this.busquedaFecha) {
                this.citas = [...this.citasOriginal];
                return;
            }
            this.citas = this.citasOriginal.filter(cita =>
                (!this.busquedaCedula || cita.cedula.includes(this.busquedaCedula)) &&
                (!this.busquedaFecha || cita.fecha === this.busquedaFecha)
            );
        }
    },
    watch: {
        busquedaCedula() {
            this.filtrarCitas();
        },
        busquedaFecha() {
            this.filtrarCitas();
        }
    },
    async created() {
        if (this.currentState === 'secretario') {
            await this.buscarCitasTodos();
        } else if (this.currentState === 'paciente') {
            await this.buscarCitas();
        }
    },
    mounted() {
        if (this.currentState === 'secretario') {
            this.buscarCitasTodos();
        } else if (this.currentState === 'paciente') {
            this.buscarCitas();
        }
    }
};
</script>

<style scoped>
.historial {
    width: 90%;
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

.tabla-citas {
    width: 100%;
    border-collapse: collapse;
}

.tabla-citas table{
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
