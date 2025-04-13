const Turno = require('../models/Turno');

// Obtener todos los turnos
exports.getAllTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll();
    res.json(turnos);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({ message: 'Error al obtener turnos', error: error.message });
  }
};

// Obtener un turno por ID
exports.getTurnoById = async (req, res) => {
  try {
    const turno = await Turno.findByPk(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.json(turno);
  } catch (error) {
    console.error('Error al obtener el turno:', error);
    res.status(500).json({ message: 'Error al obtener el turno', error: error.message });
  }
};

// Crear un nuevo turno
exports.createTurno = async (req, res) => {
  try {
    const nuevoTurno = await Turno.create(req.body);
    res.status(201).json(nuevoTurno);
  } catch (error) {
    console.error('Error al crear el turno:', error);
    res.status(400).json({ message: 'Error al crear el turno', error: error.message });
  }
};

// Actualizar un turno
exports.updateTurno = async (req, res) => {
  try {
    const turno = await Turno.findByPk(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    
    await turno.update(req.body);
    res.json(turno);
  } catch (error) {
    console.error('Error al actualizar el turno:', error);
    res.status(400).json({ message: 'Error al actualizar el turno', error: error.message });
  }
};

// Eliminar un turno
exports.deleteTurno = async (req, res) => {
  try {
    const turno = await Turno.findByPk(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    
    await turno.destroy();
    res.json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el turno:', error);
    res.status(500).json({ message: 'Error al eliminar el turno', error: error.message });
  }
};