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
                            <th v-if="true">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in citas" :key="cita.id">
                            <td>{{ cita.fecha }}</td>
                            <td>{{ cita.tipoCita }}</td>
                            <td>{{ cita.cedula }}</td>
                            <td>{{ cita.estado }}</td>
                            <td v-if="cita.estado === 'Por asistir'">
                                <button class="btnEstado" @click="abrirModal(cita)">Cambiar estado</button>
                            </td>
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
                <button @click="guardarEstado">Guardar</button>
                <button @click="cerrarModal">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HistorialMedico',
    data() {
        return {
            busquedaCedula: '',
            busquedaFecha: '',
            citas: [],
            mostrarModal: false,
            citaSeleccionada: null,
            nuevoEstado: ''
        };
    },
    methods: {
        buscarCitas() {
            // Aquí se realizaría la búsqueda en la base de datos
            // Datos de prueba
            this.citas = [
                { id: 1, fecha: '2023-10-01', tipoCita: 'Consulta/tratamiento', cedula: '1234567890', estado: 'completado'},
                { id: 2, fecha: '2023-10-02', tipoCita: 'Control', cedula: '0987654321', estado: 'Por asistir' }
            ].filter(cita => 
                (this.busquedaCedula ? cita.cedula.includes(this.busquedaCedula) : true) &&
                (this.busquedaFecha ? cita.fecha === this.busquedaFecha : true)
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
        },
        guardarEstado() {
            if (this.citaSeleccionada) {
                this.citaSeleccionada.estado = this.nuevoEstado;
                this.cerrarModal();
            }
        }
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
}

.modal-content h3 {
    margin-bottom: 20px;
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
</style>
