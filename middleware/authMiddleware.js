const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Utilisateur = require('../models/utilisateurModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Vérifiez si le token JWT est fourni dans l'en-tête Authorization
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new Error('Authentification requise.');
    }

    // Vérifiez le token JWT
    const decodedToken = jwt.verify(token, config.jwtSecret);
    if (!decodedToken) {
      throw new Error('Token JWT invalide.');
    }

    // Vérifiez si l'utilisateur existe dans la base de données
    const utilisateur = await Utilisateur.findOne({ _id: decodedToken.userId });
    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé.');
    }

    // Ajoutez l'utilisateur authentifié à la demande pour un accès ultérieur
    req.utilisateur = utilisateur;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = authMiddleware;
