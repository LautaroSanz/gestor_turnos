const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./Doctor');

const Turno = sequelize.define('Turno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  id_doctor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id_doctor'
    }
  },
  consultorio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('libre','pendiente', 'en_proceso', 'completado', 'cancelado'),
    defaultValue: 'pendiente'
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'turnos',
  timestamps: true
});

// Establecer relación con Doctor
Turno.belongsTo(Doctor, { 
  foreignKey: 'id_doctor',
  as: 'doctor'
});
Doctor.hasMany(Turno, { 
  foreignKey: 'id_doctor',
  as: 'turnos'
});

module.exports = Turno;