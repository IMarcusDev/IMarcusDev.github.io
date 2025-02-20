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

                    <div class="form-group btnRegistrar">
                        <button type="button" @click="showRegisterDialog = true">Registrar y usar datos</button>
                    </div>

                    <div v-if="showRegisterDialog" class="modal">
                        <div class="modal-content">
                            <registrarPaciente @registered="handleRegisteredPatient" />
                            <button @click="showRegisterDialog = false">Cerrar</button>
                        </div>
                    </div>
                    
                    <div class="divider">
                        <span>o</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="cedula">Número de Cédula del paciente</label>
                        <input ref="cedulaPac" type="text" name="cedula" id="cedula" placeholder="Número de cédula" v-model="cedula" @input="validateCedula">
                        <span v-if="errors.cedula">{{ errors.cedula }}</span>
                    </div>

                    <div class="form-group" v-if="isSecretario">
                        <label for="medico">Seleccione al medico</label>
                        <select name="medico" id="medico" ref="medico" v-model="medico">
                            <option v-for="doctor in doctores" :key="doctor.id_doc" :value="doctor.id_doc">
                                {{ doctor.nombres_doc + ' ' + doctor.apellidos_doc}}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="asunto">Descripción de la Cita</label>
                        <textarea ref="descripcionPac" placeholder="Descripción de la cita" name="asunto" id="asunto" v-model="asunto" @input="validateAsunto"></textarea>
                        <span v-if="errors.asunto">{{ errors.asunto }}</span>
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
import { useStateStore } from '../store/stateStore';
import Calendar from './calendar.vue';
import registrarPaciente from './registrarPaciente.vue';

export default {
    name: 'AgendarCita',
    components: {
        Calendar,
        registrarPaciente,
    },
    data() {
        return {
            tipoCita: 'Consulta/tratamiento',
            cedula: '',
            asunto: '',
            valorCita: '40 USD',
            metodoPago: 'Credito',
            nombre: '',  
            apellido: '',
            medico: '',
            doctores: [],
            errors: {},
            showRegisterDialog: false,
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
        isSecretario() {
            const stateStore = useStateStore();
            return stateStore.currentUserType === 'secretario';
        },
        isDoctor() {
            const stateStore = useStateStore();
            return stateStore.currentUserType === 'medico';
        },
        isAdmin(){
            const stateStore = useStateStore();
            return stateStore.currentUserType === 'administrador';
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
        validateNombre() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.nombre = !regex.test(this.nombre) ? 'El nombre no puede contener números' : '';
        },
        validateApellido() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.apellido = !regex.test(this.apellido) ? 'El apellido no puede contener números' : '';
        },
        validateCedula() {
            const cedula = this.cedula;
            if (cedula.length !== 10) {
                this.errors.cedula = 'La cédula debe tener 10 dígitos';
                return;
            }
            const digits = cedula.split('').map(Number);
            const provinceCode = parseInt(cedula.substring(0, 2), 10);
            if (provinceCode < 1 || provinceCode > 24) {
                this.errors.cedula = 'Código de provincia no válido';
                return;
            }
            const lastDigit = digits.pop();
            const sum = digits.reduce((acc, digit, index) => {
                if (index % 2 === 0) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                return acc + digit;
            }, 0);
            const validator = (10 - (sum % 10)) % 10;
            this.errors.cedula = validator === lastDigit ? '' : 'Cédula no válida';
        },
        validateAsunto() {
            this.errors.asunto = !this.asunto ? 'La descripción de la cita es obligatoria' : '';
        },
        async submitForm() {
            this.validateNombre();
            this.validateApellido();
            this.validateCedula();
            this.validateAsunto();

            if (this.errors.nombre || this.errors.apellido || this.errors.cedula || this.errors.asunto) {
                return;
            }

            const asunto_cita = this.$refs.tipoCita.value;
            const fecha_registro_cita = this.getAppoitmentDate();
            const fecha_realizar_cita = this.formatDate(this.selectedDate);
            const hora_cita = this.formatTime(this.selectedTime);
            const valor_cita = this.tipoCita === 'Consulta/tratamiento' ? 40 : 20;
            const comentario_pac_cita = this.$refs.descripcionPac.value;
            let nombre_paciente_cita = this.nombre;
            let apellido_paciente_cita = this.apellido;
            const cedula_paciente_cita = this.cedula;
            let id_pac = undefined;

            if(cedula_paciente_cita !== '' & nombre_paciente_cita === '' & apellido_paciente_cita === ''){
                const getPacInfo = await axios.post('/getPacInfo', { cedula_paciente_cita });
                nombre_paciente_cita = getPacInfo.data.data.nombres_pac;
                apellido_paciente_cita = getPacInfo.data.data.apellidos_pac;
            }

            const user = this.currentUser;
            let id_doc = this.medico;

            if (this.isDoctor) {
                const getIdMedico = await axios.post('/getIdMedico', { user });
                id_doc = getIdMedico.data.id_doc;
            }

            if (this.isAdmin){
                id_doc = 1;
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
                    this.nombre = '';
                    this.apellido = '';
                    this.medico = '';
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
        async llenarCamposDoctores(){
            try{
                const response = await axios.post('/ListaDoctores');

                this.doctores = response.data.data.map(doctor => ({
                    id_doc: doctor.id_doc,
                    nombres_doc: doctor.nombres_doc,
                    apellidos_doc: doctor.apellidos_doc
                }));

                if (response.status !== 200) {
                    alert('Error al cargar los doctores');
                }
            }catch(error){
                console.error('Error fetching doctores:', error);
                this.doctores = [];
            }
        },
        handleRegisteredPatient(patientData) {
            this.nombre = patientData.Names;
            this.apellido = patientData.SurNames;
            this.cedula = patientData.cedula;
            this.showRegisterDialog = false;
        },
        async datosUser(){
            try {
                const user = this.currentUser;
                console.log(user);

                const response = await axios.post('/DatosUser', {
                    user
                });

                this.DatosPaciente = response.data.map(pac => ({
                    id_pac: pac.id_pac,
                    nombres_pac: pac.nombres_pac,
                    apellidos_pac: pac.apellidos_pac,
                    cedula_pac: pac.cedula_pac,
                    fecha_nac_pac: pac.fecha_nac_pac.slice(0, 10),
                    email_pac: pac.email_pac
                }));
                return this.DatosPaciente;
                
            } catch (error) {
                console.error('Error fetching datos del paciente:', error);
                this.DatosPaciente = [];
            }
        }
    },
    created() {
        if (this.isSecretario) {
            this.llenarCamposDoctores();
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
        justify-content: center;
    }

    .btnRegistrar{
        width: 50%;
        margin: auto;
    }

    .form-group {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        margin: auto;
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
        width: 500px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .modal-content button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .modal-content button:hover {
        background-color: #0056b3;
    }

    .divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 20px 0;
    }

    .divider::before,
    .divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #ccc;
    }

    .divider:not(:empty)::before {
        margin-right: .25em;
    }

    .divider:not(:empty)::after {
        margin-left: .25em;
    }

    .divider span {
        padding: 0 10px;
        color: #666;
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