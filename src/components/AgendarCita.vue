<template>
    <div class="content">
        <div class="agendar-content">
            <section class="calendar-content">
                <Calendar />
            </section>
            <section class="form-content">
                <div class="form-info">
                    <div class="logo"></div>
                    <div class="titulo"><h2>VitaDent</h2></div>
                </div>
                <form class="form" @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="tipoCita">Tipo de Cita</label>
                        <select name="tipoCita" id="tipoCita" ref="tipoCita" v-model="tipoCita">
                            <option value="Consulta/tratamiento">Consulta/Tratamiento</option>
                            <option value="Control">Control</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="nombre">Nombre del paciente</label>
                        <input ref="nombrePac" type="text" name="nombre" id="nombre" placeholder="Nombre del paciente" v-model="nombre">
                    </div>

                    <div class="form-group">
                        <label for="apellido">Apellido del paciente</label>
                        <input ref="apellidoPac" type="text" name="apellido" id="apellido" placeholder="Apellido del paciente" v-model="apellido">
                    </div>
                    
                    <div class="form-group">
                        <label for="cedula">Número de Cédula del paciente</label>
                        <input ref="cedulaPac" type="text" name="cedula" id="cedula" placeholder="Número de cédula" v-model="cedula">
                    </div>
                    
                    <div class="form-group">
                        <label for="asunto">Descripción de la Cita</label>
                        <textarea ref="descripcionPac" placeholder="Descripción de la cita" name="asunto" id="asunto" v-model="asunto"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="valorCita">Valor de la Cita</label>
                        <div class="valorCita" id="valorCita">{{ valorCita }}</div>
                    </div>

                    <div class="form-group">
                        <label for="metodoPago">Método de Pago</label>
                        <select name="metodoPago" id="metodoPago" v-model="metodoPago">
                            <option value="Credito">Tarjeta de Crédito</option>
                            <option value="Debito">Tarjeta de Débito</option>
                        </select>
                    </div>
                    
                    <button type="submit" id="btnAgendarCita">Agendar</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios';
import { useCalendarStore } from '../store/calendarStore';
import Calendar from './calendar.vue';

export default {
    name: 'AgendarCita',
    components: {
        Calendar,
    },
    data() {
        return {
            tipoCita: 'Consulta/tratamiento',
            cedula: '',
            asunto: '',
            valorCita: '',
            metodoPago: 'Credito',
            nombre: '',  
            apellido: ''  
        };
    },
    computed: {
        selectedDate() {
            const calendarStore = useCalendarStore();
            return calendarStore.selectedDate;
        },
        selectedTimeSlot() {
            const calendarStore = useCalendarStore();
            return calendarStore.selectedTimeSlot;
        }
    },
    methods: {
        getAppoitmentDate() {
            const fecha = new Date();
            const fechaSQL = fecha.toISOString().split('T')[0]; // Obtiene YYYY-MM-DD
            return fechaSQL;
        },
        formatDate(date) {
            const d = new Date(date);
            const month = '' + (d.getMonth() + 1).toString().padStart(2, '0');
            const day = '' + d.getDate().toString().padStart(2, '0');
            const year = d.getFullYear();
            return [year, month, day].join('-');
        },
        async submitForm() {
            const tipoCita = this.$refs.tipoCita.value;
            const nombrePac = this.$refs.nombrePac.value;
            const apellidoPac = this.$refs.apellidoPac.value;
            const cedulaPac = this.$refs.cedulaPac.value;
            const startAppoitmentDate = this.getAppoitmentDate();
            const endAppoitmentDate = this.formatDate(this.selectedDate);

            try {
                const response = await axios.post('/agendarPaciente', {
                    nombrePac,
                    apellidoPac,
                    cedulaPac,
                    tipoCita,
                    startAppoitmentDate,
                    endAppoitmentDate
                });

                if (response.status === 201) {
                    alert('La cita fue registrada exitosamente');
                } else {
                    alert('Error al registrar la cita');
                }
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar la cita');
            }
        }
    }
};
</script>

<style scoped>
    .content{
        width: 100%;
        display: flex;
        align-items: center;
    }

    .agendar-content{
        width: 80%;
        margin: auto;
        display: flex;
    }

    .calendar-content{
        width: 70%;
        background-color: #007bff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px 0 0 8px; /* Updated border-radius */
    }

    .form-content{
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 0 8px 8px 0;
        box-shadow: 0 4px 8px rgba(163, 163, 163, 0.4);
    }

    .form-info {
        text-align: center;
        margin-bottom: 20px;
    }

    .form-info .titulo h2{
        color: black;
    }

    .form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: black;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 80%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(163, 163, 163, 0.4);
    }

    .form-group textarea {
        resize: vertical;
        height: 100px;
    }

    .valorCita {
        padding: 10px;
        background-color: #e9ecef;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>