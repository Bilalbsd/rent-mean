const Bien = require('../models/bienModel');
const Location = require('../models/locationModel');


// Créer un nouveau bien
exports.createBien = async (req, res) => {
  try {
    const nouveauBien = new Bien(req.body);
    const bien = await nouveauBien.save();
    res.status(201).json(bien);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les biens
exports.getBiens = async (req, res) => {
  try {
    const biens = await Bien.find();
    res.json(biens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Recherche multicritères des biens disponibles
exports.rechercheBiens = async (req, res) => {
  try {
    const { dateDebut, dateFin, commune, prixMax, nbChambresMin, nbCouchagesMin, distanceMax } = req.query;
    
    // Récupérer les ID des biens loués pendant la période spécifiée
    const locationsChevauchant = await Location.find({
      dateDebut: { $lte: parseInt(dateFin) },
      dateFin: { $gte: parseInt(dateDebut) }
    }).distinct('idBien');

    // Construire le filtre de recherche pour les biens disponibles
    const filter = {
      _id: { $nin: locationsChevauchant } // Exclure les biens loués
    };
    if (commune) filter.commune = commune;
    if (prixMax) filter.prix = { $lte: parseInt(prixMax) };
    if (nbChambresMin) filter.nbChambres = { $gte: parseInt(nbChambresMin) };
    if (nbCouchagesMin) filter.nbCouchages = { $gte: parseInt(nbCouchagesMin) };
    if (distanceMax) filter.distance = { $lte: parseInt(distanceMax) };

    // Rechercher les biens disponibles
    const biens = await Bien.find(filter);
    res.status(200).json({ status: 'success', data: biens });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};


// Obtenir un bien par son ID
exports.getBienById = async (req, res) => {
  try {
    const bien = await Bien.findById(req.params.id);
    if (bien === null) {
      return res.status(404).json({ message: 'Bien non trouvé' });
    }
    res.json(bien);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un bien
exports.updateBien = async (req, res) => {
  try {
    const bien = await Bien.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (bien === null) {
      return res.status(404).json({ message: 'Bien non trouvé' });
    }
    res.json(bien);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un bien
exports.deleteBien = async (req, res) => {
  try {
    const bien = await Bien.findByIdAndDelete(req.params.id);
    if (bien === null) {
      return res.status(404).json({ message: 'Bien non trouvé' });
    }
    res.json({ message: 'Bien supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
