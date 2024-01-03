// TODO
const bbd_connexion = require('../connexion_bdd');

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nbVictoires: Number,
    nbParties: Number
});

// export du modèle pour pouvoir l'utiliser dans les autres fichiers 
let User = mongoose.model('User', UserSchema);
module.exports = {User: User};