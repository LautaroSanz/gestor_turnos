const Doctor = require('./Doctor');
const Especialidad = require('./Especialidad');
const Turno = require('./Turno');

// Definir las relaciones entre los modelos
Doctor.belongsTo(Especialidad, { foreignKey: 'id_especialidad', as: 'especialidad' });
Especialidad.hasMany(Doctor, { foreignKey: 'id_especialidad', as: 'doctores' });

Turno.belongsTo(Doctor, { foreignKey: 'id_doctor', as: 'doctor' });
Doctor.hasMany(Turno, { foreignKey: 'id_doctor', as: 'turnos' });

module.exports = {
  Doctor,
  Especialidad,
  Turno
};