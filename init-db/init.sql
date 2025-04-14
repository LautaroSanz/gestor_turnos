-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS turnos_db;
USE turnos_db;

-- Crear la tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(255) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  medico VARCHAR(255) NOT NULL,
  consultorio VARCHAR(255) NOT NULL,
  estado ENUM('libre','pendiente', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente',
  observaciones TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

