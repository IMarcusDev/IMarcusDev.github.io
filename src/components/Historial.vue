<template>
    <div class="historial">
        <h2>Historial de Citas</h2>
        <div class="content">
            <div class="busqueda">
                <input type="text" v-model="busquedaCedula" placeholder="Buscar por número de cédula" />
                <input type="date" v-model="busquedaFecha" placeholder="Buscar por fecha" />
                <button @click="buscarCitas">Buscar</button>
            </div>
            <div v-if="citas.length > 0" class="tabla-citas">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de Cita</th>
                            <th>Número de Cédula</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in citas" :key="cita.id">
                            <td>{{ cita.fecha }}</td>
                            <td>{{ cita.tipoCita }}</td>
                            <td>{{ cita.cedula }}</td>
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
export default {
    name: 'Historial',
    data() {
        return {
            busquedaCedula: '',
            busquedaFecha: '',
            citas: []
        };
    },
    methods: {
        buscarCitas() {
            // Aquí se realizaría la búsqueda en la base de datos
            // Datos de prueba
            this.citas = [
                { id: 1, fecha: '2023-10-01', tipoCita: 'Consulta/tratamiento', cedula: '1234567890' },
                { id: 2, fecha: '2023-10-02', tipoCita: 'Control', cedula: '0987654321' }
            ].filter(cita => 
                (this.busquedaCedula ? cita.cedula.includes(this.busquedaCedula) : true) &&
                (this.busquedaFecha ? cita.fecha === this.busquedaFecha : true)
            );
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
    width: 45%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
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
}

.tabla-citas th, .tabla-citas td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    font-size: 16px;
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
