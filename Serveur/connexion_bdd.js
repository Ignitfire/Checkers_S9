// <----------------- Dépendances Node/Locales ----------------->
let mongoose = require('mongoose');

// Serveur de la bdd
const server = "192.168.1.17  ";
// Nom de la bdd
const database = 'jeu_dame';

class Database {
  constructor() {
    this._connect()
  }

  // Connexion à la base de données
  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
    //gestion des promesses et des erreurs
      .then(() => {
        console.log('La connexion à la bdd a réussi.')
      })
      .catch(err => {
        console.error('La connexion à la bdd a échoué.');
        console.error(err);
      })
  }
}

//<----------- Exports ----------->
module.exports = new Database() 