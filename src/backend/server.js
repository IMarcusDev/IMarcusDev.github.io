import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Para hacer un query a la db, utilice Queries.functionToUse()
import * as Queries from "./db/queries.js"
import { error } from "console";

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
      const { Names, SurNames, cedula, fecha_nac, email, username, password } = req.body;

      if (!Names || !SurNames || !fecha_nac || !email || !username || !password || !cedula) {
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
        return res.status(409).json({ message: "La cédula de usuario ya está en uso" });
      }      

      const id_users = await Queries.addUser(username, password);

      await Queries.addPacienteInfo(Names, SurNames, cedula, fecha_nac, email, id_users);
      
      res.status(201).json({ message: "El usuario se registró correctamente" });
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

    const paciente = await Queries.getPacienteCedula(cedulaPac);
    if (paciente.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const id_pac = paciente[0].id_pac;

    await Queries.addCita(nombrePac, apellidoPac, cedulaPac, tipoCita, startAppoitmentDate, endAppoitmentDate, null, "pendiente", 1, id_pac);

    res.status(201).json({ message: "La cita fue registrada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/api/historialCitas", async (req, res) => {
  try{

    const {id_users} = req.body;

    if(!id_users) {
      return res.status(500).json({message: "El id del usuario no encontrado"});
    }

    const infoCitas = await Queries.getCitaForIdOfPac(id_users);

    return res.status(200).json({
      success: true,
      message: infoCitas.length > 0 ? "Citas obtenidas exitosamente." : "No hay citas registradas.",
      data: infoCitas
    });

  }catch(error){
    res.status(500).json({ message: "Error al obtener las citas del pacientes"+error});
  }
});


app.post("/api/RegistroDependientes", async (req, res) => {
  try {
    const { user, cedula, nombre, apellido, fecha_nacimiento } = req.body;

    if (!user || !cedula || !nombre || !apellido || !fecha_nacimiento) {
      return res.status(400).json({ message: "Debe llenar todos los campos" });
    }

    const id_user = await Queries.getIdOfUser(user);

    if (!id_user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const id_pac = await Queries.getIdOfPac(id_user);

    if (!id_pac) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    await Queries.addDependent(cedula, nombre, apellido, fecha_nacimiento, id_pac);

    res.status(201).json({ message: "El dependiente fue registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar dependiente: " + error.message });
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


