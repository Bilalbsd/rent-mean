const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// Routes pour l'authentification
router.post('/register', utilisateurController.register);
router.post('/login', utilisateurController.login);

// Routes pour les utilisateurs
router.post('/', utilisateurController.createUtilisateur);
router.get('/', utilisateurController.getUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.put('/:id', utilisateurController.updateUtilisateur);
router.delete('/:id', utilisateurController.deleteUtilisateur);

module.exports = router;
