import express from "express";
import cors from "cors";
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
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post("/api/register", async (req, res) => {
  try {
      const { firstName, secondName, firstSurName, secondSurName, age, email, username, password } = req.body;

      if (!firstName || !firstSurName || !age || !email || !username || !password) {
          return res.status(400).json({ message: "Debe llenar todos los campos" });
      }

      await Queries.setPACIENTES(firstName, secondName, firstSurName, secondSurName, age, email, username, password);

      res.status(201).json({ message: "El usuario se registro correctamente" });
  } catch (error) {
      if (error.message === 'El nombre de usuario ya está en uso') {
          res.status(409).json({ message: error.message });
      } else {
          res.status(500).json({ message: error.message });
      }
  }
});

app.post("/api/login", async (req, res) => {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ message: "Debe llenar todos los campos" });
      }

      const user = await Queries.getUserName(username);

      if (!user || user.password_user !== password) {
          return res.status(401).json({ message: "Contrasenia o usuario incorrectos" });
      }

      res.status(200).json({ message: "Ha iniciado sesion correctamente", userType: user.id_rol === 2 ? 'medico' : 'paciente' });
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


