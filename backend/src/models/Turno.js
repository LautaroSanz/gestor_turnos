const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/database');

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
  medico: {
    type: DataTypes.STRING,
    allowNull: false
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

module.exports = Turno;