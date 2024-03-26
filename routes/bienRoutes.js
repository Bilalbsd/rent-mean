const express = require('express');
const router = express.Router();
const bienController = require('../controllers/bienController');

// Routes pour les biens
router.post('/', bienController.createBien);
router.get('/recherche', bienController.rechercheBiens);
router.get('/', bienController.getBiens);
router.get('/:id', bienController.getBienById);
router.put('/:id', bienController.updateBien);
router.delete('/:id', bienController.deleteBien);

module.exports = router;
