import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: "localhost", // Dirección del host de la base de datos
  user: "root", // Usuario de la base de datos
  password: "password", // Contraseña de la base de datos
  database: "mi_base_de_datos", // Nombre de la base de datos
  port: 3306, // Puerto de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
