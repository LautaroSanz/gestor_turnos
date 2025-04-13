const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnosController');

// Rutas para los turnos
router.get('/', turnosController.getAllTurnos);
router.get('/:id', turnosController.getTurnoById);
router.post('/', turnosController.createTurno);
router.put('/:id', turnosController.updateTurno);
router.delete('/:id', turnosController.deleteTurno);

module.exports = router;