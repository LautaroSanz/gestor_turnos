const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnosController');

// Rutas para los turnos
router.get('/', turnosController.getAllTurnos);
router.get('/:id', turnosController.getTurnoById);
router.post('/', turnosController.createTurno);
router.put('/:id', turnosController.updateTurno);
router.delete('/:id', turnosController.deleteTurno);

// Nuevas rutas para filtrado de turnos
router.get('/medico/:medico', turnosController.getTurnosByMedico);
router.get('/libres/medico/:medico', turnosController.getTurnosLibresByMedico);
router.get('/fecha/:fecha/medico/:medico', turnosController.getTurnosByFechaAndMedico);

// Ruta para generar turnos automáticamente
router.post('/generar', turnosController.generarTurnos);

// Ruta para cancelar turnos libres por fecha y médico
router.put('/cancelar/medico/:medico/fecha/:fecha', turnosController.cancelarTurnosLibresPorFecha);

module.exports = router;