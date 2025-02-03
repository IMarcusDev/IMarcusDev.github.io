import express from "express";
import cors from "cors";
import pool from "./config/db.js"; // Importar la configuración de la base de datos
import path from "path";
import { fileURLToPath } from "url";

// Para hacer un query a la db, utilice Queries.functionToUse()
import * as Queries from "./db/queries.js"

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Revisar localhost:${PORT}/api/status para ver detalles de conexión
app.get("/api/status", async (req, res) => {
  try {
    const rows = await Queries.getRoles();  // Roles ya tiene valores por defecto

    res.json({ message: "Conexión a la base de datos exitosa" });
  } catch (error) {
    res.status(500).json({ message: "Error al conectar con la base de datos", error: error.message });
  }
});

// Demás funciones aquí
// Crear todas las solicitudes llamando desde /api/dataToFind
// Ej: app.get("/api/citas/doc/:id_doc", ...), req.params.id_doc toma el parámetro id_doc

app.get("/api/user/:username", async (req, res) => {
  try {
      const user = await Queries.getUserName(req.params.username);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
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


