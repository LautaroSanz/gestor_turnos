const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController');

// Rutas para médicos
router.get('/', medicosController.getAllMedicos);
router.get('/:id', medicosController.getMedicoById);
router.get('/especialidad/:especialidadId', medicosController.getMedicosByEspecialidad);

module.exports = router;