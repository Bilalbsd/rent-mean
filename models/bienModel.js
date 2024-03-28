const mongoose = require('mongoose');

const bienSchema = new mongoose.Schema({
  mailProprio: { type: String, ref: 'Utilisateur.mail', required: true },
  commune: { type: String, required: true },
  rue: { type: String },
  cp: { type: String },
  nbCouchages: { type: Number },
  nbChambres: { type: Number },
  distance: { type: Number },
  prix: { type: Number },
  image: { type: String },
  latitude: { type: Number },
  longitude: { type: Number }
});

const Bien = mongoose.model('Bien', bienSchema);

module.exports = Bien;
