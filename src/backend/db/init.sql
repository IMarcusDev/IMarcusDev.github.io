-- SuperUsuario admin
CREATE USER 'admin'@'%' IDENTIFIED BY 'admin';  -- user 'admin', password 'admin'

GRANT ALL PRIVILEGES ON consultorio_db.* TO 'admin'@'%';
FLUSH PRIVILEGES;


-- Para crear estas tablas, se necesita el superusuario superior (admin)

-- Create default tables
USE consultorio_db;

-- Roles (No se sabe, pero pueden aparecer enfermeros)
CREATE TABLE ROLES (
    id_rol INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_rol VARCHAR(25) UNIQUE NOT NULL
);

-- Usuarios
CREATE TABLE USERS (
    id_user INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username_user VARCHAR(25) NOT NULL UNIQUE,
    password_user VARCHAR(25) NOT NULL,
    id_rol INTEGER NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES ROLES(id_rol) ON DELETE CASCADE
);

-- Pacientes
CREATE TABLE PACIENTES (
    id_pac INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    primer_nombre_pac VARCHAR(15) NOT NULL,
    segundo_nombre_pac VARCHAR(15),
    primer_apellido_pac VARCHAR(15) NOT NULL,
    segundo_apellido_pac VARCHAR(15),
    edad_pac INTEGER NOT NULL,
    email_pac VARCHAR(50) NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES USERS(id_user) ON DELETE CASCADE
);

-- Doctores
CREATE TABLE DOCTORES (
    id_doc INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    primer_nombre_doc VARCHAR(15) NOT NULL,
    segundo_nombre_doc VARCHAR(15),
    primer_apellido_doc VARCHAR(15) NOT NULL,
    segundo_apellido_doc VARCHAR(15),
    email_doc VARCHAR(50) NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES USERS(id_user) ON DELETE CASCADE
);

-- Citas
CREATE TABLE CITA (
    id_cita INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    asunto_cita VARCHAR(50) NOT NULL,
    fecha_registro_cita DATE NOT NULL,
    fecha_realizar_cita DATE NOT NULL,
    comentario_pac_cita VARCHAR(100),
    comentario_doc_cita VARCHAR(100),
    estado_cita VARCHAR(20) NOT NULL,
    id_doc INTEGER NOT NULL,
    id_pac INTEGER NOT NULL,
    FOREIGN KEY (id_doc) REFERENCES DOCTORES(id_doc),
    FOREIGN KEY (id_pac) REFERENCES PACIENTES(id_pac)
);

-- Default Values
INSERT INTO ROLES (nombre_rol)
VALUES 
('Administrador'),
('Doctor'),
('Paciente');

INSERT INTO USERS (username_user, password_user, id_rol) VALUES
('admin', 'admin123', 1);
