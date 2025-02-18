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
                            <th>Comentario de la cita</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in citas" :key="cita.id">
                            <td>{{ cita.fecha }}</td>
                            <td>{{ cita.hora }}</td>
                            <td>{{ cita.tipoCita }}</td>
                            <td>{{ cita.nombre_pac }}</td>
                            <td>{{ cita.cedula }}</td>
                            <td @mouseover="hoverEstado(cita)" @mouseleave="leaveEstado">{{ cita.estado }}
                                <button v-if="citaHover === cita && cita.estado === 'pendiente'" @click="abrirModal(cita)">Cambiar estado</button>
                            </td>
                            <td>{{ cita.comentario }}</td>
                            <td>{{ cita.comentario_pac }}</td>
                            <td>{{ cita.valor }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="no-citas">
                <p>No se encontraron citas.</p>
            </div>
        </div>
        <div v-if="mostrarModal" class="modal">
            <div class="modal-content">
                <h3>Cambiar estado de la cita</h3>
                <select v-model="nuevoEstado">
                    <option value="completado">Completada</option>
                    <option value="no asistio">No asistió</option>
                </select>
                <h3>Comentario del doctor</h3>
                <textarea v-model="comentarioDoc" placeholder="Ingrese un comentario referente a la cita"></textarea>
                
                <button @click="guardarEstado">Guardar</button>
                <button @click="cerrarModal">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import axios from '../api/axios';
import { useStateStore } from '../store/stateStore';

export default {
    name: 'HistorialMedico',
    data() {
        return {
            busquedaCedula: '',
            busquedaFecha: '',
            citas: [],
            citasOriginal: [],
            mostrarModal: false,
            citaSeleccionada: null,
            nuevoEstado: '',
            comentarioDoc: '',
            citaHover: null,
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
            const user = this.currentUser; 
            
            try {
                const response = await axios.post('/historialCitas', {
                    user
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
                id: cita.id_cita,
                fecha: cita.fecha_realizar_cita.slice(0, -14),
                hora: cita.hora_cita,
                tipoCita: cita.asunto_cita,
                nombre_pac: cita.nombre_paciente_cita + ' ' + cita.apellido_paciente_cita,
                cedula: cita.cedula_paciente_cita,
                estado: cita.estado_cita,
                comentario: cita.comentario_doc_cita,
                comentario_pac: cita.comentario_pac_cita,
                valor: cita.valor_cita
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
        },
        abrirModal(cita) {
            this.citaSeleccionada = cita;
            this.nuevoEstado = cita.estado;
            this.mostrarModal = true;
        },
        cerrarModal() {
            this.mostrarModal = false;
            this.citaSeleccionada = null;
            this.nuevoEstado = '';
            this.comentarioDoc = '';
        },
        async guardarEstado() {
            if (this.citaSeleccionada) {
                try {
                    const response = await axios.post('/actualizarEstadoCita', {
                        id_cita: this.citaSeleccionada.id,
                        nuevoEstado_cita: this.nuevoEstado,
                        comentario_cita: this.comentarioDoc
                    });

                    if (response.status === 201) {
                        alert('Cita actualizada con exito');
                        this.citaSeleccionada.estado = this.nuevoEstado;
                        this.citaSeleccionada.comentario = this.comentarioDoc;
                        this.cerrarModal();
                    } else {
                        alert('Error al actualizar el estado de la cita');
                    }
                } catch (error) {
                    console.error('Error al actualizar el estado de la cita:', error);
                }
            }
        },
        hoverEstado(cita) {
            this.citaHover = cita;
        },
        leaveEstado() {
            this.citaHover = null;
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
        const state = this.currentState;
        if (state === 'administrador') {
            await this.buscarCitasTodos();
        } else if (state === 'medico') {
            await this.buscarCitas();
        }
    },
    mounted() {
        const state = this.currentState;
        if (state === 'administrador') {
            this.buscarCitasTodos();
        } else if (state === 'medico') {
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
    position: relative;
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.modal-content h3 {
    margin-bottom: 20px;
    color: black;
}

.modal-content select {
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.modal-content button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
    margin: 5px;
}

.modal-content button:hover {
    background-color: #0056b3;
}

.btnEstado{
    background-color: #0056b3;
    color: white;
}

.tabla-citas td button {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.tabla-citas td:hover button {
    display: block;
}
</style>
