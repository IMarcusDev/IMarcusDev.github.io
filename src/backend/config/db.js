import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: "localhost", // Dirección del host de la base de datos
  user: "admin", // Usuario de la base de datos
  password: "admin", // Contraseña de la base de datos
  database: "consultorio_db", // Nombre de la base de datos
  port: 3307, // Puerto de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
