const Utilisateur = require('../models/utilisateurModel');

// Créer un nouvel utilisateur
exports.createUtilisateur = async (req, res) => {
  try {
    const nouvelUtilisateur = new Utilisateur(req.body);
    const utilisateur = await nouvelUtilisateur.save();
    res.status(201).json(utilisateur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les utilisateurs
exports.getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un utilisateur par son ID
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (utilisateur === null) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (utilisateur === null) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(utilisateur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
    if (utilisateur === null) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
