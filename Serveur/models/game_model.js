// TODO
var bbd_connexion = require('../connexion_bdd');

var mongoose = require('mongoose');

let Schema = mongoose.Schema;

var PartieSchema = new Schema({
    joueur1: {type: String, required: true},
    joueur2: {type: String, required: true},
    gagnant: String, //on laisse vide si la partie n'est pas finie 
    datePartie: Date //date auquel la partie a été créée
});

let Partie = mongoose.model('Partie', PartieSchema);

exports.Partie = Partie;