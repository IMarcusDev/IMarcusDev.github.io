<template>
    <div class="container">
        <div id="forgot-password">
            <form @submit.prevent="handleVerify" v-if="!verified">
                <h2>Recuperar Contraseña</h2>
                <input type="text" v-model="form.Names" placeholder="Nombres" @input="validateNames" required>
                <span v-if="errors.Names">{{ errors.Names }}</span>
                <input type="text" v-model="form.SurNames" placeholder="Apellidos" @input="validateSurNames" required>
                <span v-if="errors.SurNames">{{ errors.SurNames }}</span>
                <input type="text" v-model="form.cedula" placeholder="Cédula" @input="validateCedula" required>
                <span v-if="errors.cedula">{{ errors.cedula }}</span>
                <input type="email" v-model="form.email" placeholder="Correo Electrónico" @input="validateEmail" required>
                <span v-if="errors.email">{{ errors.email }}</span>
                <input type="text" v-model="form.username" placeholder="Nombre de Usuario" @input="validateUsername" required>
                <span v-if="errors.username">{{ errors.username }}</span>
                <button type="submit">Verificar</button>
                <button type="button" @click="handleCancel">Cancelar</button>
            </form>
            <form @submit.prevent="handleUpdatePassword" v-if="verified">
                <h2>Nueva Contraseña</h2>
                <input type="password" v-model="form.newPassword" placeholder="Nueva Contraseña" @input="validatePassword" required>
                <span v-if="errors.newPassword">{{ errors.newPassword }}</span>
                <input type="password" v-model="form.confirmPassword" placeholder="Confirmar Contraseña" @input="validateConfirmPassword" required>
                <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios';

export default {
    name: 'ForgotPassword',
    data() {
        return {
            form: {
                Names: '',
                SurNames: '',
                cedula: '',
                email: '',
                username: '',
                newPassword: '',
                confirmPassword: ''
            },
            errors: {},
            verified: false
        };
    },
    methods: {
        validateNames() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.Names = !regex.test(this.form.Names) ? 'El nombre no puede contener números' : '';
        },
        validateSurNames() {
            const regex = /^[a-zA-Z\s]*$/;
            this.errors.SurNames = !regex.test(this.form.SurNames) ? 'El apellido no puede contener números' : '';
        },
        validateCedula() {
            const cedula = this.form.cedula;
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
        validateEmail() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.errors.email = !regex.test(this.form.email) ? 'Correo electrónico no válido' : '';
        },
        validateUsername() {
            const regex = /^[a-zA-Z0-9_]*$/;
            this.errors.username = !regex.test(this.form.username) ? 'El nombre de usuario solo puede contener letras, números y guiones bajos' : '';
        },
        validatePassword() {
            this.errors.newPassword = this.form.newPassword.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : '';
        },
        validateConfirmPassword() {
            this.errors.confirmPassword = this.form.confirmPassword !== this.form.newPassword ? 'Las contraseñas no coinciden' : '';
        },
        async handleVerify() {
            this.validateNames();
            this.validateSurNames();
            this.validateCedula();
            this.validateEmail();
            this.validateUsername();

            if (this.errors.Names || this.errors.SurNames || this.errors.cedula || this.errors.email || this.errors.username) {
                return;
            }

            try {
                const response = await axios.post('/verifyUser', this.form);
                if (response.data.success) {
                    this.verified = true;
                } else {
                    alert('Datos incorrectos');
                }
            } catch (error) {
                alert('Error al verificar los datos');
            }
        },
        async handleUpdatePassword() {
            this.validatePassword();
            this.validateConfirmPassword();

            if (this.errors.newPassword || this.errors.confirmPassword) {
                return;
            }

            try {
                const response = await axios.post('/updatePassword', {
                    username: this.form.username,
                    newPassword: this.form.newPassword
                });
                if (response.data.success) {
                    alert('Contraseña actualizada correctamente');
                    this.$router.push('/login');
                } else {
                    alert('Error al actualizar la contraseña');
                }
            } catch (error) {
                alert('Error al actualizar la contraseña');
            }
        },
        handleCancel() {
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {
  background-color: #c9d6ff;
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
  height: 100vh;
}

.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#forgot-password {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  padding: 40px;
  width: 400px;
  max-width: 100%;
}

#forgot-password h2 {
  color: black;
  margin-bottom: 20px;
}

#forgot-password input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

#forgot-password button {
  background-color: #007BFF;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

#forgot-password button[type="button"] {
  background-color: transparent;
  color: black;
}

#forgot-password button[type="button"]:hover {
  background-color: #f0f0f0;
}
</style>
