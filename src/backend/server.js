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

      let state = '';

      switch(user.id_rol){
        case 1:
          state = 'administrador';
          break;
        case 2:
          state = 'medico';
          break;
        case 3:
          state = 'paciente';
          break;
        case 4:
          state = 'secretario';
          break;
      }
      

      res.status(200).json({ message: "Ha iniciado sesion correctamente", userType: state });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post("/api/agendarPaciente", async (req, res) => {
  try {
    const { nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita } = req.body;

    console.log(nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita);

    if (!nombre_paciente_cita || !apellido_paciente_cita || !cedula_paciente_cita || !asunto_cita || !fecha_registro_cita || !fecha_realizar_cita) {
      return res.status(400).json({ message: "Debe llenar todos los campos" });
    }

    const existFECHAREGISTRO = await Queries.getFechaRegistro(fecha_realizar_cita);

    if (Array.isArray(existFECHAREGISTRO) && existFECHAREGISTRO.length > 0) {
      return res.status(409).json({ message: "La fecha de la cita ya está en uso" });
    }

    const paciente = await Queries.getPacienteCedula(cedula_paciente_cita);

    if (paciente.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const id_pac = paciente[0].id_pac;

    await Queries.addCita(nombre_paciente_cita, apellido_paciente_cita, cedula_paciente_cita, asunto_cita, fecha_registro_cita, fecha_realizar_cita, null, "pendiente", 1, id_pac);



    res.status(201).json({ message: "La cita fue registrada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/api/historialCitas", async (req, res) => {
  try{

    const {user} = req.body;

    const id_user = await Queries.getIdOfUser(user);

    if (!id_user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const id_pac = await Queries.getIdOfPac(id_user);

    const infoCitas = await Queries.getCitaForIdOfPac(id_pac);

    return res.status(200).json({
      success: true,
      message: infoCitas.length > 0 ? "Citas obtenidas exitosamente." : "No hay citas registradas.",
      data: infoCitas
    });

  }catch(error){
    res.status(500).json({ message: "Error al obtener las citas del pacientes"+error});
  }
});

app.post("/api/historialCitasTodos", async (req, res) => {
  try {
    const infoCitas = await Queries.getAllCitas();

    return res.status(200).json({
      success: true,
      message: infoCitas.length > 0 ? "Citas obtenidas exitosamente." : "No hay citas registradas.",
      data: infoCitas
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas del pacientes: " + error.message });
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

app.post("/api/ListaDependientes", async (req, res) => {
  try{

    const {user} = req.body;

    const id_user = await Queries.getIdOfUser(user);

    if (!id_user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const id_pac = await Queries.getIdOfPac(id_user);

    const infoDependientes = await Queries.getDependantForIdOfPac(id_pac);

    return res.status(200).json({
      success: true,
      message: infoDependientes.length > 0 ? "Dependientes obtenidas exitosamente." : "No hay dependientes registrados.",
      data: infoDependientes
    });

  }catch(error){
    res.status(500).json({ message: "Error al obtener las citas del pacientes"+error});
  }
});

app.post("/api/DatosUser", async (req, res) => {
  try{
    const {user} = req.body;

    const id_user = await Queries.getIdOfUser(user);

    if (!id_user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const id_pac = await Queries.getIdOfPac(id_user);

    const paciente = await Queries.getDataOfPac(id_pac);

    res.json(paciente[0]);

  }catch(error){
    res.status(500).json({ message: "Error al obtener las citas del pacientes"+error});
  }
});

app.post('/api/actualizarEstadoCita', async (req, res) => {
  try{
    const { id_cita, nuevoEstado_cita, comentario_cita} = req.body;

    await Queries.updateCita(id_cita, nuevoEstado_cita, comentario_cita);
    
    res.status(201).json({ message: "El dependiente fue registrado exitosamente" });
  }catch(error){
    res.status(500).json({ message: "Error al actualizar la cita del paciente"+error});
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


