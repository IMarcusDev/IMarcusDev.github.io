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
//--
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

async function getCitaForIdOfPac(id_pac){
    try{
        const[rows] = await pool.query('SELECT * FROM CITA WHERE id_pac= ?;', [id_pac])
        return rows;
    } catch(error){
        throw new Error('Error al obtener información: ' + error);
    }

}

async function getDependantForIdOfPac(id_pac){
    try{
        const[rows] = await pool.query('SELECT * FROM DEPENDIENTES WHERE id_pac= ?;', [id_pac])
        return rows;
    } catch(error){
        throw new Error('Error al obtener información: ' + error);
    }

}

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

async function addPacienteInfo(Names, SurNames, cedula, fecha_nac, email, id_user) {
    try {
        const [result] = await pool.query(
            'INSERT INTO PACIENTES (nombres_pac, apellidos_pac, cedula_pac, fecha_nac_pac, email_pac, id_user) VALUES (?, ?, ?, ?, ?, ?)', 
            [Names, SurNames, cedula, fecha_nac, email, id_user]
        );
        return result;
    } catch (error) {
        throw new Error('Error al registrar paciente: ' + error);
    }
};

async function addCita(nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita, comentario_doc_cita, estado_cita, id_doc, id_pac) {
    try {
        console.log("Entro add cita");
        
        const [result] = await pool.query(
            'INSERT INTO CITA (nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita, comentario_doc_cita, estado_cita, id_doc, id_pac) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita, comentario_doc_cita, estado_cita, id_doc, id_pac]
        );

        return result;
    } catch (error) {
        throw new Error('Error al registrar la cita: ' + error);
    }
};

async function addDependent(cedula, nombre, apellido, fechaNac, id_pac) {
    try {
        const [result] = await pool.query(
            'INSERT INTO DEPENDIENTES (cedula_dep, nombre_dep, apellido_dep, fecha_nac_dep, id_pac) VALUES (?, ?, ?, ?, ?);', 
            [cedula, nombre, apellido, fechaNac, id_pac]
        );
        return result;
    } catch (error) {
        throw new Error('Error al registrar dependiente: ' + error);
    }
};

async function getDependentsByPac(id_pac) {
    try {
        const [result] = await pool.query(
            'SELECT * FROM DEPENDIENTES WHERE id_pac = ?', 
            [id_pac]
        );
        return result;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getDependentsByCedula(cedula) {
    try {
        const [result] = await pool.query(
            'SELECT * FROM DEPENDIENTES WHERE cedula_dep = ?', 
            [cedula]
        );
        return result;
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
};

async function getIdOfUser(username) {
    try {
        const [rows] = await pool.query('SELECT id_user FROM USERS WHERE username_user = ?;', [username]);
        return rows.length > 0 ? rows[0].id_user : null;
    } catch (error) {
        throw new Error('Error al obtener el ID del usuario: ' + error);
    }
}

async function getIdOfPac(id_user) {
    try {
        const [rows] = await pool.query('SELECT id_pac FROM PACIENTES WHERE id_user = ?;', [id_user]);
        return rows.length > 0 ? rows[0].id_pac : null;
    } catch (error) {
        throw new Error('Error al obtener el ID del paciente: ' + error);
    }
}

async function getDataOfPac (id_pac){
    try{
        const row = await pool.query('SELECT * FROM PACIENTES WHERE id_pac = ?;', [id_pac]);
        return row;
    }catch (error){
        throw new Error('Error al obtener los datos del paciente: ' + error);
    }
}

export {
    getDataOfPac,
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
    addDependent,
    addPacienteInfo,
    getPacienteEmail,
    getPacienteCedula,
    getFechaRegistro,
    getDependentsByPac,
    getDependentsByCedula,
    getCitaForIdOfPac,
    getIdOfUser,
    getIdOfPac,
    getDependantForIdOfPac
}

