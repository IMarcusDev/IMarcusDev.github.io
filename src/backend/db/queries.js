import pool from '../config/db.js'

//Juan

async function setUSER(username,password) {
    try{
        if (!username || !password) {
            throw new Error('El nombre de usuario y la contraseña son obligatorios');
        }

        const [existeUSER] = await pool.execute('SELECT * FROM USERS WHERE username_user = ?', [username]);

        if (existeUSER.length > 0) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const [rows] = await pool.execute('INSERT INTO USERS (username_user, password_user, id_rol) VALUES (?, ?, ?)',[username, password, 1]);
        //console.log(rows.insertId);
        return rows.insertId
    } catch (error) {
        throw new Error('Error al ingreso de información: ' + error);
    }
    
}

async function setPACIENTES(primer_nombre_pac,segundo_nombre_pac,primer_apellido_pac,segundo_apellido_pac,edad_pac,email_pac,username,password) {
    try{
        const id_users = await setUSER(username,password);

        if (!primer_nombre_pac || !segundo_nombre_pac || !primer_apellido_pac || !segundo_apellido_pac || !edad_pac || !email_pac) {
            throw new Error('Son obligatorios todos los datos');
        }

        const [existeEMAIL] = await pool.execute('SELECT * FROM PACIENTES WHERE email_pac = ?', [email_pac]);

        if (existeEMAIL.length > 0) {
            throw new Error('El email ya está en uso');
        }

        const rows = await pool.execute('INSERT INTO PACIENTES (primer_nombre_pac,segundo_nombre_pac,primer_apellido_pac,segundo_apellido_pac,edad_pac,email_pac,id_user) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [primer_nombre_pac,segundo_nombre_pac,primer_apellido_pac,segundo_apellido_pac,edad_pac,email_pac,id_users]); 
        console.log(rows);
    } catch (error) {
        throw new Error('Error al ingreso de información: ' + error);
    }
    
}



async function setUserName(username,password) {
    try{
        const rows = await pool.execute('INSERT INTO USERS (username_user, password_user,id_rol) VALUES (?, ?, ?)', [username, password,1]); 
        console.log(rows);
    } catch (error) {
        throw new Error('Error al obtener información: ' + error);
    }
    
}

//Mateo --------
async function getUserName(username) {
    try {
        const [rows] = await pool.query('SELECT * FROM USERS WHERE username_user = ?;', [username]);  // [1, username, password123]
        console.log(rows);
        return rows[0];
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

export {
    getRoles,
    getUserName,
    getInfo,
    getCitasDoc,
    getCitasPac,
    getCitaId,
    getCitaDayRangeRegistro,
    getCitaDayRangeRealizado
}


setPACIENTES("Marcos","David","Escobar","Vela",20,"marcos2213@gmail.com",'David22', '12346');
