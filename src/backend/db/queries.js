import pool from '../config/db.js'

async function getUserName(username) {
    try {
        const [rows] = await pool.execute('SELECT * FROM USERS WHERE username_user = ?;', [username]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getPacienteEmail(emailpaciente) {
    try {
        const [rows] = await pool.execute('SELECT * FROM PACIENTES WHERE email_pac = ?;', [emailpaciente]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getFechaRegistro(fechaRegistro) {
    try {
        const [rows] = await pool.execute('SELECT * FROM CITA WHERE fecha_registro_cita = ?;', [fechaRegistro]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getPacienteCedula(cedula) {
    try {
        const [rows] = await pool.execute('SELECT * FROM PACIENTES WHERE cedula_pac = ?;', [cedula]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getInfo(table, id_user) {
    try {
        const [rows] = await pool.query(`SELECT * FROM ${table.toUpperCase()} WHERE id_user = ?;`, [id_user]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getCitasDoc(id_doc) {
    try {
        const [rows] = await pool.query('SELECT * FROM CITA WHERE id_doc = ?;', [id_doc]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getCitasPac(id_pac) {
    try {
        const [rows] = await pool.query('SELECT * FROM CITA WHERE id_pac = ?;', [id_pac]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getCitaId(id_cita) {
    try {
        const [rows] = await pool.query('SELECT * FROM CITA WHERE id_cita = ?;', [id_cita]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getCitaDayRangeRegistro(date_from, date_to) {
    // Formato esperado para fechas: YYYY-MM-DD
    try {
        const [rows] = await pool.query('SELECT * FROM CITA WHERE fecha_registro_cita >= ? AND fecha_registro_cita <= ?;', [date_from, date_to]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getCitaDayRangeRealizado(date_from, date_to) {
    // Formato esperado para fechas: YYYY-MM-DD
    try {
        const [rows] = await pool.query('SELECT * FROM CITA WHERE fecha_realizar_cita >= ? AND fecha_realizar_cita <= ?;', [date_from, date_to]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getRoles() {
    try {
        const [rows] = await pool.query('SELECT * FROM ROLES WHERE 1;');

        console.log(rows);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

// Only add Pacientes, no Doctors
// Doctors created by admin in MySQL, not in functions
async function addUser(username, password) {
    try {
        // Paciente: id_rol = 3
        const [result] = await pool.query('INSERT INTO USERS (username_user, password_user, id_rol) VALUES (?, ?, 3);', [username, password]);

        return result.insertId;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
}

async function addPacienteInfo(first_name, second_name, last_name, very_last_name, cedula, age, email, id_user) {
    //
    try {
        // Paciente: id_rol = 3
        const [result] = await pool.query(
            'INSERT INTO PACIENTES (primer_nombre_pac, segundo_nombre_pac, primer_apellido_pac, segundo_apellido_pac, cedula_pac, edad_pac, email_pac, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [first_name, second_name, last_name, very_last_name, cedula, age, email, id_user]);

        return result;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function addCita(nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita, comentario_pac_cita, comentario_doc_cita, estado_cita, id_doc, id_pac) {
    try {
        const [result] = await pool.query(
            'INSERT INTO CITA (nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita, comentario_pac_cita, comentario_doc_cita, estado_cita, id_doc, id_pac) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita, comentario_pac_cita, comentario_doc_cita, estado_cita, id_doc, id_pac]
        );

        return result;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
}

export {
    getRoles,
    getUserName,
    getInfo,
    getCitasDoc,
    getCitasPac,
    getCitaId,
    getCitaDayRangeRegistro,
    getCitaDayRangeRealizado,
    addUser,
    addCita,
    addPacienteInfo,
    getPacienteEmail,
    getPacienteCedula,
    getFechaRegistro
}

