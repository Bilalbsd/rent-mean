const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  idBien: { type: mongoose.Schema.Types.ObjectId, ref: 'Bien', required: true },
  mailLoueur: { type: String, ref: 'Utilisateur.mail', required: true },
  dateDebut: { type: Number, required: true },
  dateFin: { type: Number, required: true },
  avis: { type: String }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
