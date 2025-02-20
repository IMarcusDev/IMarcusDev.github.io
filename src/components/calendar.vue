<template>
    <div class="calendario">
        <div class="encabezado">
            <button @click="mesAnterior" :disabled="mesAnteriorDeshabilitado">←</button>
            <span>{{ nombresMeses[mesActual] }} {{ añoActual }}</span>
            <button @click="mesSiguiente">→</button>
        </div>
        <div class="dias-semana">
            <div v-for="dia in diasSemana" :key="dia">{{ dia }}</div>
        </div>
        <div class="dias">
            <div v-for="blanco in primerDiaDelMes" :key="'blanco-' + blanco" class="dia blanco"></div>
            <div v-for="dia in diasDelMes" :key="dia" class="dia" 
                 :class="{ deshabilitado: esDiaPasado(dia) }" 
                 @mouseover="hoverDia(dia)" 
                 @mouseleave="leaveDia(dia)" 
                 @click="seleccionarDia(dia)" 
                 :disabled="esDiaPasado(dia)">
                {{ dia }}
                <button v-if="diaHover === dia && !esDiaPasado(dia)" @click="seleccionarDia(dia)">Escoger</button>
            </div>
        </div>
        <div v-if="diaSeleccionado" class="detalles-dia">
            <h3>Detalles del {{ diaSeleccionado }} {{ nombresMeses[mesActual] }} {{ añoActual }}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Horario</th>
                        <th>Turnos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>9 AM - 1 PM</td>
                        <td>
                            <span v-for="hora in turnosMañana" :key="hora" 
                                  :class="{ seleccionado: turnoSeleccionado === hora, deshabilitado: bookedSlots.includes(hora) }" 
                                  @click="seleccionarTurno(hora)" 
                                  :disabled="bookedSlots.includes(hora)">
                                {{ hora }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>2 PM - 6 PM</td>
                        <td>
                            <span v-for="hora in turnosTarde" :key="hora" 
                                  :class="{ seleccionado: turnoSeleccionado === hora, deshabilitado: bookedSlots.includes(hora) }" 
                                  @click="seleccionarTurno(hora)" 
                                  :disabled="bookedSlots.includes(hora)">
                                {{ hora }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { useCalendarStore } from '../store/calendarStore';
import axios from 'axios';

export default {
    name: 'Calendario',
    data() {
        return {
            añoActual: new Date().getFullYear(),
            mesActual: new Date().getMonth(),
            diaActual: new Date().getDate(),
            diasSemana: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            nombresMeses: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            diaHover: null,
            diaSeleccionado: null,
            turnoSeleccionado: null,
            turnosMañana: ['09:30', '10:30', '11:30', '12:30'],
            turnosTarde: ['14:30', '15:30', '16:30', '17:30'],
            bookedSlots: []
        };
    },
    computed: {
        diasDelMes() {
            const fecha = new Date(this.añoActual, this.mesActual + 1, 0);
            const dias = [];
            for (let i = 1; i <= fecha.getDate(); i++) {
                dias.push(i);
            }
            return dias;
        },
        primerDiaDelMes() {
            const fecha = new Date(this.añoActual, this.mesActual, 1);
            return fecha.getDay();
        },
        mesAnteriorDeshabilitado() {
            const fechaActual = new Date();
            return this.añoActual < fechaActual.getFullYear() || 
                   (this.añoActual === fechaActual.getFullYear() && this.mesActual <= fechaActual.getMonth());
        }
    },
    methods: {
        mesAnterior() {
            if (!this.mesAnteriorDeshabilitado) {
                if (this.mesActual === 0) {
                    this.mesActual = 11;
                    this.añoActual--;
                } else {
                    this.mesActual--;
                }
            }
        },
        mesSiguiente() {
            if (this.mesActual === 11) {
                this.mesActual = 0;
                this.añoActual++;
            } else {
                this.mesActual++;
            }
        },
        hoverDia(dia) {
            this.diaHover = dia;
        },
        leaveDia(dia) {
            this.diaHover = null;
        },
        async seleccionarDia(dia) {
            if (!this.esDiaPasado(dia)) {
                this.diaSeleccionado = dia;
                this.turnoSeleccionado = null; // Reset selected slot when a new day is selected
                const calendarStore = useCalendarStore();
                calendarStore.setSelectedDate(`${this.añoActual}-${this.mesActual + 1}-${dia}`);
                await this.fetchBookedSlots(`${this.añoActual}-${this.mesActual + 1}-${dia}`);
            }
        },
        async seleccionarTurno(turno) {
            if (!this.bookedSlots.includes(turno)) {
                this.turnoSeleccionado = turno;
                const calendarStore = useCalendarStore();
                calendarStore.setSelectedTimeSlot(turno);
                calendarStore.setSelectedTime(turno);
            }
        },
        esDiaPasado(dia) {
            const fechaActual = new Date();
            const fechaSeleccionada = new Date(this.añoActual, this.mesActual, dia);
            return fechaSeleccionada < fechaActual.setHours(0, 0, 0, 0);
        },
        async fetchBookedSlots(date) {
            try {
                const response = await axios.get(`/bookedSlots/${date}`);
                console.log("Booked slots:", response);
                if (Array.isArray(response.data)) {
                    this.bookedSlots = response.data.map(slot => slot.hora_cita.slice(0, 5)); // Convert HH:MM:SS to HH:MM
                } else {
                    console.error("Unexpected response format:", response.data);
                    this.bookedSlots = [];
                }
            } catch (error) {
                console.error("Error al obtener los horarios reservados: ", error);
                this.bookedSlots = [];
            }
        }
    }
};
</script>

<style scoped>
    .calendario {
        width: 80%;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
    }
    .encabezado {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #007bff;
        color: white;
        padding: 10px;
        border-radius: 8px 8px 0 0;
    }
    .encabezado button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
    }
    .encabezado button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    .encabezado span {
        font-size: 18px;
        font-weight: bold;
    }
    .dias-semana, .dias {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background-color: #f8f9fa;
    }
    .dias-semana div {
        padding: 10px 0;
        font-weight: bold;
        color: #6c757d;
    }
    .dia {
        border: 1px solid #ddd;
        padding: 15px;
        background-color: white;
        cursor: pointer;
        transition: background-color 0.3s;
        color: black;
        position: relative;
    }
    .dia:hover {
        background-color: #f1f1f1;
    }
    .dia button {
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
    .dia:hover button {
        display: block;
    }
    .dia.deshabilitado {
        background-color: #e9ecef;
        cursor: not-allowed;
    }
    .blanco {
        border: none;
        background-color: #f8f9fa;
    }
    .detalles-dia {
        margin-top: 20px;
        animation: slideIn 0.5s forwards;
    }
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .detalles-dia table {
        width: 100%;
        border-collapse: collapse;
    }
    .detalles-dia th, .detalles-dia td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    .detalles-dia th {
        background-color: #007bff;
        color: white;
    }

    .detalles-dia h3{
        color: black;
    }

    .detalles-dia td{
        color: black;
    }

    .detalles-dia td span {
        display: inline-block;
        margin: 5px;
        padding: 5px 10px;
        background-color: #f8f9fa;
        color: black;
        border-radius: 4px;
        cursor: pointer;
    }
    .detalles-dia td span.seleccionado {
        background-color: gray;
        color: white;
    }
    .detalles-dia td span:hover {
        background-color: #e2e6ea;
    }
    .detalles-dia td span.deshabilitado {
        background-color: #e9ecef;
        cursor: not-allowed;
    }
</style>
