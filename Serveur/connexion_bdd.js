// <----------------- Dépendances Node/Locales ----------------->
let mongoose = require('mongoose');

// Serveur de la bdd
//TODO :
//const server = "à_définir_adresse"; -----------------> A DEFINIR
// Nom de la bdd
const database = 'jeu_dame';

class Database {
  constructor() {
    this._connect()
  }

  // Connexion à la base de données 
// useFindAndModify: false => pour éviter les warnings concernant les méthodes de mongoose dépréciées
  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    //gestion des promesses et des erreurs
      .then(() => {
        console.log('La connexion à la bdd a réussi.')
      })
      .catch(err => {
        console.error('La connexion à la bdd a échoué.')
      })
  }
}

//<----------- Exports ----------->
module.exports = new Database() 