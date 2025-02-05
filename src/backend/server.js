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

//logica

//aqui defino como hago yo /api/pongo el nombre yo , req es la solicitud que le hago al front para que me pase los parametros

app.post("/api/register", async (req, res) => {
  try {
      const { firstName, secondName, firstSurName, secondSurName, cedula, age, email, username, password } = req.body;

      if (!firstName || !firstSurName || !age || !email || !username || !password|| !cedula) {
          return res.status(400).json({ message: "Debe llenar todos los campos" });
      }

      const existeUSER = await Queries.getUserName(username);

      if (Array.isArray(existeUSER) && existeUSER.length > 0) {
        return res.status(409).json({ message: "El nombre de usuario ya está en uso" });
      }

      const existeEMAILUSERS = await Queries.getPacienteEmail(email);


      if (Array.isArray(existeEMAILUSERS) && existeEMAILUSERS.length > 0) {
        return res.status(409).json({ message: "El email de usuario ya está en uso" });
      }

      const cedulaUSERS = await Queries.getPacienteCedula(cedula);


      if (Array.isArray(cedulaUSERS) && cedulaUSERS.length > 0) {
        return res.status(409).json({ message: "El email de usuario ya está en uso" });
      }      

      const id_users = await Queries.addUser(username, password);

      await Queries.addPacienteInfo(firstName, secondName, firstSurName, secondSurName,cedula, age, email, id_users);
      
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

      const users = await Queries.getUserName(username);
      console.log(users);

      if (users.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = users[0];

      if (user.password_user !== password) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      res.status(200).json({ message: "Ha iniciado sesion correctamente", userType: user.id_rol === 2 ? 'medico' : 'paciente' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post("/api/agendarPaciente", async (req, res) => {
  try {
    const { nombrePac, apellidoPac, cedulaPac, tipoCita, startAppoitmentDate, endAppoitmentDate } = req.body;

    if (!nombrePac || !apellidoPac || !cedulaPac || !tipoCita || !startAppoitmentDate || !endAppoitmentDate) {
      return res.status(400).json({ message: "Debe llenar todos los campos" });
    }

    const existFECHAREGISTRO = await Queries.getFechaRegistro(endAppoitmentDate);

    if (Array.isArray(existFECHAREGISTRO) && existFECHAREGISTRO.length > 0) {
      return res.status(409).json({ message: "La fecha de la cita ya está en uso" });
    }

    await Queries.addCita(nombrePac, apellidoPac, cedulaPac, tipoCita, startAppoitmentDate, endAppoitmentDate, null, "pendiente", 1);

    res.status(201).json({ message: "La cita fue registrada exitosamente" });
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


