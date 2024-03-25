const Utilisateur = require('../models/utilisateurModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // Vérifiez si l'utilisateur existe déjà dans la base de données
    const existingUser = await Utilisateur.findOne({ mail: req.body.mail });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }
    
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Créez un nouvel utilisateur
    const nouvelUtilisateur = new Utilisateur({
      mail: req.body.mail,
      password: hashedPassword,
      prenom: req.body.prenom,
      nom: req.body.nom,
      telephone: req.body.telephone
    });

    // Enregistrez l'utilisateur dans la base de données
    const utilisateur = await nouvelUtilisateur.save();

    res.status(201).json(utilisateur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Route de connexion
exports.login = async (req, res) => {
  try {
    // Vérifiez si l'utilisateur existe dans la base de données
    const utilisateur = await Utilisateur.findOne({ mail: req.body.mail });
    if (!utilisateur) {
      return res.status(401).json({ message: 'L\'e-mail ou le mot de passe est incorrect.' });
    }

    // Vérifiez si le mot de passe est correct
    const passwordMatch = await bcrypt.compare(req.body.password, utilisateur.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'L\'e-mail ou le mot de passe est incorrect.' });
    }

    // Générez un token JWT pour l'utilisateur authentifié
    const token = jwt.sign({ mail: utilisateur.mail, prenom: utilisateur.prenom, nom: utilisateur.nom, telephone: utilisateur.telephone, userId: utilisateur._id }, 'votre_clé_secrète', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
