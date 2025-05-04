const Doctor = require('../models/Doctor');
const Especialidad = require('../models/Especialidad');

// Obtener todos los médicos
exports.getAllMedicos = async (req, res) => {
  try {
    const medicos = await Doctor.findAll({
      include: [{
        model: Especialidad,
        as: 'especialidad',
        attributes: ['nombre_especialidad']
      }],
      where: {
        activo: true
      }
    });

    // Formatear la respuesta para que sea compatible con el frontend
    const medicosFormateados = medicos.map(medico => ({
      id: medico.id_doctor,
      nombre: `${medico.nombre_doctor} ${medico.apellido_doctor}`,
      especialidad: medico.especialidad ? medico.especialidad.nombre_especialidad : 'Sin especialidad',
      imagen: medico.imagen,
      email: medico.email,
      telefono: medico.telefono
    }));
    
    res.json(medicosFormateados);
  } catch (error) {
    console.error('Error al obtener médicos:', error);
    res.status(500).json({ message: 'Error al obtener médicos', error: error.message });
  }
};

// Obtener un médico por ID
exports.getMedicoById = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await Doctor.findByPk(id, {
      include: [{
        model: Especialidad,
        as: 'especialidad'
      }]
    });
    
    if (!medico) {
      return res.status(404).json({ message: 'Médico no encontrado' });
    }
    
    // Formatear la respuesta
    const medicoFormateado = {
      id: medico.id_doctor,
      nombre: `${medico.nombre_doctor} ${medico.apellido_doctor}`,
      especialidad: medico.especialidad ? medico.especialidad.nombre_especialidad : 'Sin especialidad',
      id_especialidad: medico.id_especialidad,
      imagen: medico.imagen,
      email: medico.email,
      telefono: medico.telefono
    };
    
    res.json(medicoFormateado);
  } catch (error) {
    console.error('Error al obtener el médico:', error);
    res.status(500).json({ message: 'Error al obtener el médico', error: error.message });
  }
};

// Obtener médicos por especialidad
exports.getMedicosByEspecialidad = async (req, res) => {
  try {
    const { especialidadId } = req.params;
    
    const medicos = await Doctor.findAll({
      include: [{
        model: Especialidad,
        as: 'especialidad',
        attributes: ['nombre_especialidad']
      }],
      where: {
        id_especialidad: especialidadId,
        activo: true
      }
    });
    
    // Formatear la respuesta
    const medicosFormateados = medicos.map(medico => ({
      id: medico.id_doctor,
      nombre: `${medico.nombre_doctor} ${medico.apellido_doctor}`,
      especialidad: medico.especialidad ? medico.especialidad.nombre_especialidad : 'Sin especialidad',
      imagen: medico.imagen,
      email: medico.email,
      telefono: medico.telefono
    }));
    
    res.json(medicosFormateados);
  } catch (error) {
    console.error('Error al obtener médicos por especialidad:', error);
    res.status(500).json({ message: 'Error al obtener médicos por especialidad', error: error.message });
  }
};