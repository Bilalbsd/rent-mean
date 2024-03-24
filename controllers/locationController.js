const Location = require('../models/locationModel');

// Créer une nouvelle location
exports.createLocation = async (req, res) => {
  try {
    const nouvelleLocation = new Location(req.body);
    const location = await nouvelleLocation.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir toutes les locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une location par son ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (location === null) {
      return res.status(404).json({ message: 'Location non trouvée' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une location
exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (location === null) {
      return res.status(404).json({ message: 'Location non trouvée' });
    }
    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une location
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (location === null) {
      return res.status(404).json({ message: 'Location non trouvée' });
    }
    res.json({ message: 'Location supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
