import express from "express";
import cors from "cors";
import pool from "./config/db.js"; // Importar la configuración de la base de datos
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para verificar conexión con la base de datos
app.get("/api/status", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ message: "Conexión a la base de datos exitosa", result: rows[0].result });
  } catch (error) {
    res.status(500).json({ message: "Error al conectar con la base de datos", error: error.message });
  }
});

// Servir el frontend en producción
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
