<template>
    <div class="content">
        <div class="agendar-content">
            <section class="calendar-content">
                <Calendar ref="calendarComponent" />
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
                        <label for="paciente">Seleccione al paciente</label>
                        <select name="paciente" id="paciente" ref="paciente" v-model="paciente">
                            <option value="Mi persona">Mi persona</option>
                            <option v-for="dependiente in dependientes" :key="dependiente.cedula_dep" :value="dependiente.cedula_dep">
                                {{ dependiente.nombre_dep + ' ' + dependiente.apellido_dep}}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="medico">Seleccione al medico</label>
                        <select name="medico" id="medico" ref="medico" v-model="medico">
                            <option v-for="doctor in doctores" :key="doctor.id_doc" :value="doctor.id_doc">
                                {{ doctor.nombres_doc + ' ' + doctor.apellidos_doc}}
                            </option>
                        </select>
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
import { useUserStore } from '../store/userStore';
import Calendar from './calendar.vue';

export default {
    name: 'AgendarCitaPaciente',
    components: {
        Calendar,
    },
    data() {
        return {
            tipoCita: 'Consulta/tratamiento',
            cedula: '',
            asunto: '',
            valorCita: '40 USD',
            metodoPago: 'Credito',
            medico: '',
            nombre: '',  
            apellido: '',
            dependientes: [],
            doctores: [],
            paciente: 'Mi persona',
            DatosPaciente: {
                nombres_pac: '',
                apellidos_pac: '',
                cedula_pac: '',
                fecha_nac_pac: '',
                email_pac: ''
            },
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
        },
        selectedTime() {
            const calendarStore = useCalendarStore();
            return calendarStore.selectedTime;
        },
        currentUser() {
            const userStore = useUserStore();
            return userStore.currentUser;
        }
    },
    watch: {
        tipoCita(newVal) {
            if (newVal === 'Consulta/tratamiento') {
                this.valorCita = '40 USD';
            } else if (newVal === 'Control') {
                this.valorCita = '20 USD';
            }
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
        formatTime(time) {
            const [hour, minute] = time.split(':');
            return `${hour}:${minute}:00`; // Formato HH:MM:SS
        },
        async submitForm() {
            const asunto_cita = this.$refs.tipoCita.value;
            const fecha_registro_cita = this.getAppoitmentDate();
            const fecha_realizar_cita = this.formatDate(this.selectedDate);
            const hora_cita = this.formatTime(this.selectedTime);
            const valor_cita = this.tipoCita === 'Consulta/tratamiento' ? 40 : 20;
            const comentario_pac_cita = this.$refs.descripcionPac.value;
            let nombre_paciente_cita = '', apellido_paciente_cita = '', cedula_paciente_cita = '';
            const selectedDoctor = this.doctores.find(doc => doc.id_doc === this.medico);
            const id_doc = selectedDoctor.id_doc;
            let id_pac = undefined;

            if (this.paciente === 'Mi persona') {
                const pac = await this.datosUser();
                if (pac.length > 0) {
                    nombre_paciente_cita = pac[0].nombres_pac;
                    apellido_paciente_cita = pac[0].apellidos_pac;
                    cedula_paciente_cita = pac[0].cedula_pac;
                    id_pac = pac[0].id_pac;
                } else {
                    throw new Error('No se encontraron datos del paciente');
                }
            } else {
                const selectedDependiente = this.dependientes.find(dep => dep.cedula_dep === this.paciente);
                const pac = await this.datosUser();
                if (pac.length > 0) {
                    nombre_paciente_cita = selectedDependiente.nombre_dep;
                    apellido_paciente_cita = selectedDependiente.apellido_dep;
                    cedula_paciente_cita = selectedDependiente.cedula_dep;
                    id_pac = pac[0].id_pac;
                } else {
                    throw new Error('No se encontraron datos del paciente');
                }
            }


            try {
                const response = await axios.post('/agendarPaciente', {
                    nombre_paciente_cita,
                    apellido_paciente_cita,
                    cedula_paciente_cita,
                    asunto_cita,
                    fecha_registro_cita,
                    fecha_realizar_cita,
                    hora_cita,
                    valor_cita,
                    comentario_pac_cita,
                    id_pac,
                    id_doc
                });

                if (response.status === 201) {
                    alert('La cita fue registrada exitosamente');
                    this.tipoCita = 'Consulta/tratamiento';
                    this.cedula = '';
                    this.asunto = '';
                    this.valorCita = '40 USD';
                    this.metodoPago = 'Credito';
                    this.medico = '';
                    this.paciente = 'Mi persona';
                    this.$refs.descripcionPac.value = '';

                    const calendarComponent = this.$refs.calendarComponent;
                    if (calendarComponent) {
                        await calendarComponent.fetchBookedSlots(this.selectedDate);
                    }
                } else {
                    alert('Error al registrar la cita');
                }
            } catch (error) {
                console.log('Error durante el registro:', error);
                alert('Error al registrar la cita');
            }
        },
        async llenarCamposDependientes() {
            try {
                const user = this.currentUser;

                const response = await axios.post('/ListaDependientes', {
                    user
                });

                this.dependientes = response.data.data.map(dependiente => ({
                    cedula_dep: dependiente.cedula_dep,
                    nombre_dep: dependiente.nombre_dep,
                    apellido_dep: dependiente.apellido_dep,
                    fecha_nac_dep: dependiente.fecha_nac_dep.slice(0,-14)
                }));

                if (response.status !== 200) {
                    alert('Error al cargar las dependientes');
                }
            } catch (error) {
                console.error('Error fetching dependientes:', error);
                this.dependientes = [];
            }
        },
        async llenarCamposDoctores(){
            try{
                const response = await axios.post('/ListaDoctores');
                console.log(response);
                this.doctores = response.data.data.map(doctor => ({
                    id_doc: doctor.id_doc,
                    nombres_doc: doctor.nombre,
                    apellidos_doc: doctor.apellido
                }));

                if (response.status !== 200) {
                    alert('Error al cargar los doctores');
                }
            }catch(error){
                console.error('Error fetching doctores:', error);
                this.doctores = [];
            }
        },
        async datosUser(){
            try {
                const user = this.currentUser;

                const response = await axios.post('/DatosUser', {
                    user
                });
                if (response.data.length > 0) {
                    this.DatosPaciente = response.data.map(pac => ({
                        id_pac: pac.id_pac,
                        nombres_pac: pac.nombres_pac,
                        apellidos_pac: pac.apellidos_pac,
                        cedula_pac: pac.cedula_pac,
                        fecha_nac_pac: pac.fecha_nac_pac.slice(0, 10),
                        email_pac: pac.email_pac
                    }));
                    return this.DatosPaciente;
                } else {
                    throw new Error('No se encontraron datos del paciente');
                }
            } catch (error) {
                console.error('Error fetching datos del paciente:', error);
                this.DatosPaciente = [];
                throw error;
            }
        }
    },
    created(){
        this.llenarCamposDependientes();
        this.llenarCamposDoctores();
        this.valorCita = this.tipoCita === 'Consulta/tratamiento' ? '40 USD' : '20 USD';
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
        border-radius: 8px 0 0 8px;
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
        color: black;
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

    @media (max-width: 768px) {
        .agendar-content {
            flex-direction: column;
        }

        .calendar-content,
        .form-content {
            width: 100%;
            border-radius: 8px;
        }

        .form-content {
            padding: 10px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        .form-group input,
        .form-group select,
        .form-group textarea {
            font-size: 14px;
            padding: 8px;
        }

        button {
            font-size: 14px;
            padding: 8px 16px;
        }
    }
</style>