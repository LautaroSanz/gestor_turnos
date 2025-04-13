-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS turnos_db;
USE turnos_db;

-- Crear la tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(255) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  servicio VARCHAR(255) NOT NULL,
  estado ENUM('pendiente', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente',
  observaciones TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar algunos datos de ejemplo
INSERT INTO turnos (nombre_cliente, fecha, hora, servicio, estado, observaciones) VALUES
('Juan Pérez', '2025-04-15', '09:00:00', 'Consulta médica', 'pendiente', 'Primera visita'),
('María López', '2025-04-15', '09:30:00', 'Consulta médica', 'pendiente', 'Control mensual'),
('Carlos Rodríguez', '2025-04-15', '10:00:00', 'Laboratorio', 'pendiente', 'Ayuno 8 horas');