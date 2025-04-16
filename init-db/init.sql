-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS turnos_db;
USE turnos_db;

-- Crear la tabla de especialidades
CREATE TABLE IF NOT EXISTS especialidades (
  id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
  nombre_especialidad VARCHAR(255) NOT NULL UNIQUE,
  descripcion TEXT,
  activo BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear la tabla de doctores
CREATE TABLE IF NOT EXISTS doctores (
  id_doctor INT AUTO_INCREMENT PRIMARY KEY,
  nombre_doctor VARCHAR(255) NOT NULL,
  apellido_doctor VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefono VARCHAR(50),
  id_especialidad INT NOT NULL,
  imagen VARCHAR(255),
  activo BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad) ON DELETE RESTRICT
);

-- Crear la tabla de turnos (con la nueva estructura)
CREATE TABLE IF NOT EXISTS turnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(255) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  id_doctor INT NOT NULL,
  consultorio VARCHAR(255) NOT NULL,
  estado ENUM('libre','pendiente', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente',
  observaciones TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_doctor) REFERENCES doctores(id_doctor) ON DELETE RESTRICT
);

-- Insertar datos de muestra en especialidades
INSERT INTO especialidades (nombre_especialidad, descripcion) VALUES
('Cardiología', 'Especialidad médica dedicada a las enfermedades del corazón y del sistema circulatorio'),
('Pediatría', 'Especialidad médica dedicada a la salud de los niños'),
('Dermatología', 'Especialidad médica dedicada a las enfermedades de la piel'),
('Ginecología', 'Especialidad médica dedicada a la salud del sistema reproductor femenino'),
('Traumatología', 'Especialidad médica dedicada a las lesiones del aparato locomotor'),
('Oftalmología', 'Especialidad médica dedicada a las enfermedades de los ojos');

-- Insertar datos de muestra en doctores
INSERT INTO doctores (nombre_doctor, apellido_doctor, email, telefono, id_especialidad, imagen) VALUES
('Juan', 'Pérez', 'juan.perez@clinica.com', '555-1234', 1, 'https://randomuser.me/api/portraits/men/1.jpg'),
('María', 'González', 'maria.gonzalez@clinica.com', '555-2345', 2, 'https://randomuser.me/api/portraits/women/2.jpg'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@clinica.com', '555-3456', 3, 'https://randomuser.me/api/portraits/men/3.jpg'),
('Laura', 'Martínez', 'laura.martinez@clinica.com', '555-4567', 4, 'https://randomuser.me/api/portraits/women/4.jpg'),
('Roberto', 'Sánchez', 'roberto.sanchez@clinica.com', '555-5678', 5, 'https://randomuser.me/api/portraits/men/5.jpg'),
('Ana', 'López', 'ana.lopez@clinica.com', '555-6789', 6, 'https://randomuser.me/api/portraits/women/6.jpg');

-- Insertar datos de muestra en turnos (con los nuevos id_doctor en lugar de nombres)
INSERT INTO turnos (nombre_cliente, fecha, hora, id_doctor, consultorio, estado, observaciones) VALUES
('Alberto Gómez', '2025-04-20', '09:00:00', 1, 'Consultorio 101', 'pendiente', 'Control anual'),
('Carmen Torres', '2025-04-20', '10:00:00', 1, 'Consultorio 101', 'pendiente', 'Consulta por dolor en el pecho'),
('Miguel Ramírez', '2025-04-20', '11:00:00', 2, 'Consultorio 102', 'pendiente', 'Control de rutina pediátrico'),
('Sofía Vargas', '2025-04-20', '12:00:00', 3, 'Consultorio 103', 'pendiente', 'Tratamiento para acné'),
('Daniel Herrera', '2025-04-21', '09:00:00', 4, 'Consultorio 104', 'pendiente', 'Control de embarazo'),
('Patricia Flores', '2025-04-21', '10:00:00', 5, 'Consultorio 105', 'pendiente', 'Rehabilitación de rodilla'),
('Javier Morales', '2025-04-21', '11:00:00', 6, 'Consultorio 106', 'pendiente', 'Revisión de vista'),
('Elena Suárez', '2025-04-21', '12:00:00', 1, 'Consultorio 101', 'pendiente', 'Seguimiento de tratamiento cardiaco'),
('Ricardo Mendoza', '2025-04-22', '09:00:00', 2, 'Consultorio 102', 'pendiente', 'Vacunación'),
('Lucía Navarro', '2025-04-22', '10:00:00', 3, 'Consultorio 103', 'pendiente', 'Tratamiento para dermatitis');

-- Añadir índices para mejorar el rendimiento de las consultas
ALTER TABLE turnos ADD INDEX idx_turnos_fecha (fecha);
ALTER TABLE turnos ADD INDEX idx_turnos_doctor (id_doctor);
ALTER TABLE doctores ADD INDEX idx_doctores_especialidad (id_especialidad);

