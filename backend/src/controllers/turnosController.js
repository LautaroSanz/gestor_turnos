const Turno = require('../models/Turno');
const { Op } = require('sequelize');

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

// Filtrar turnos por médico
exports.getTurnosByMedico = async (req, res) => {
  try {
    const { medico } = req.params;
    const turnos = await Turno.findAll({
      where: {
        medico: medico
      }
    });
    res.json(turnos);
  } catch (error) {
    console.error('Error al filtrar turnos por médico:', error);
    res.status(500).json({ message: 'Error al filtrar turnos por médico', error: error.message });
  }
};

// Filtrar turnos libres por médico
exports.getTurnosLibresByMedico = async (req, res) => {
  try {
    const { medico } = req.params;
    const turnos = await Turno.findAll({
      where: {
        medico: medico,
        estado: 'libre'
      }
    });
    res.json(turnos);
  } catch (error) {
    console.error('Error al filtrar turnos libres por médico:', error);
    res.status(500).json({ message: 'Error al filtrar turnos libres por médico', error: error.message });
  }
};

// Obtener turnos por fecha y médico
exports.getTurnosByFechaAndMedico = async (req, res) => {
  try {
    const { fecha, medico } = req.params;
    const turnos = await Turno.findAll({
      where: {
        fecha: fecha,
        medico: medico
      }
    });
    res.json(turnos);
  } catch (error) {
    console.error('Error al obtener turnos por fecha y médico:', error);
    res.status(500).json({ message: 'Error al obtener turnos por fecha y médico', error: error.message });
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

// Generar automáticamente turnos para un médico en un rango de fechas
exports.generarTurnos = async (req, res) => {
  try {
    const { medico, consultorio, fechaInicio, fechaFin } = req.body;
    
    if (!medico || !consultorio || !fechaInicio || !fechaFin) {
      return res.status(400).json({ message: 'Faltan datos necesarios: médico, consultorio, fechaInicio y fechaFin son obligatorios' });
    }
    
    // Convertir las fechas de string a objetos Date
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    
    if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
      return res.status(400).json({ message: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }
    
    // Array para almacenar todos los turnos a crear
    const turnosACrear = [];
    
    // Iterar sobre cada día del rango de fechas
    const currentDate = new Date(fechaInicioDate);
    while (currentDate <= fechaFinDate) {
      // Verificar si es día de semana (0 = domingo, 6 = sábado)
      const diaSemana = currentDate.getDay();
      if (diaSemana >= 1 && diaSemana <= 5) {
        // Es día de semana (lunes a viernes)
        const fechaActual = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        
        // Generar turnos de 8am a 4pm con intervalos de 30 minutos
        for (let hora = 8; hora < 16; hora++) {
          for (let minutos = 0; minutos < 60; minutos += 30) {
            const horaFormateada = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:00`;
            
            turnosACrear.push({
              nombre_cliente: '',
              fecha: fechaActual,
              hora: horaFormateada,
              medico,
              consultorio,
              estado: 'libre',
              observaciones: 'Turno generado automáticamente'
            });
          }
        }
      }
      
      // Avanzar al siguiente día
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Verificar si ya existen turnos en las fechas/horas/médico seleccionadas
    // para evitar duplicados
    const fechasTurnos = turnosACrear.map(t => t.fecha);
    const existentes = await Turno.findAll({
      where: {
        fecha: {
          [Op.in]: [...new Set(fechasTurnos)]
        },
        medico
      }
    });
    
    // Crear un mapa de turnos existentes para búsqueda rápida
    const turnosExistentesMap = {};
    existentes.forEach(turno => {
      const key = `${turno.fecha}_${turno.hora}_${turno.medico}`;
      turnosExistentesMap[key] = true;
    });
    
    // Filtrar solo los turnos que no existen
    const turnosNuevos = turnosACrear.filter(turno => {
      const key = `${turno.fecha}_${turno.hora}_${turno.medico}`;
      return !turnosExistentesMap[key];
    });
    
    // Crear los turnos en la base de datos
    if (turnosNuevos.length > 0) {
      await Turno.bulkCreate(turnosNuevos);
      res.status(201).json({ 
        message: `Se generaron ${turnosNuevos.length} turnos para el médico ${medico}`,
        turnosGenerados: turnosNuevos.length
      });
    } else {
      res.status(200).json({ 
        message: 'No se generaron nuevos turnos, posiblemente ya existen para las fechas seleccionadas'
      });
    }
  } catch (error) {
    console.error('Error al generar turnos automáticamente:', error);
    res.status(500).json({ message: 'Error al generar turnos automáticamente', error: error.message });
  }
};

// Cancelar todos los turnos libres de un médico en una fecha específica
exports.cancelarTurnosLibresPorFecha = async (req, res) => {
  try {
    const { medico, fecha } = req.params;
    
    const resultado = await Turno.update(
      { estado: 'cancelado' },
      {
        where: {
          medico,
          fecha,
          estado: 'libre'
        }
      }
    );
    
    res.json({ message: `${resultado[0]} turnos cancelados correctamente` });
  } catch (error) {
    console.error('Error al cancelar turnos:', error);
    res.status(500).json({ message: 'Error al cancelar turnos', error: error.message });
  }
};