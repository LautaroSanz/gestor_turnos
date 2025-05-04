const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Especialidad = require('./Especialidad');

const Doctor = sequelize.define('Doctor', {
  id_doctor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_doctor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_doctor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_especialidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Especialidad,
      key: 'id_especialidad'
    }
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'doctores',
  timestamps: true
});



module.exports = Doctor;
