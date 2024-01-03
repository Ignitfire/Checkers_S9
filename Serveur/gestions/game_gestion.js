//<===== Fonctions gestions informations lié à une partie==>

/* TO ADD: une fonction pour inverser les déplacements 
et afficher du bonc coté entre les joueurs ?
 */


// --------Importation Bdd---------
var gameService = require("../game_service");

// <--- Variable Globales ---->
let ListGame = [];
//va nous permettre de garder les infos des joueurs de parties en cours 

// <---- Fonctions --->

// Choix random des couleurs des pions
function selectColor() {
    const color1 = Math.random() >= 0.5 ? "noir" : "blanc";
    const color2 = color1 === "noir" ? "blanc" : "noir";

    return { color1: color1, color2: color2 };
}

async function newGame(Joueur1, Joueur2) {
  await gameService.create({ joueur1: Joueur1, joueur2: Joueur2 });
}

async function updateGagnant(name) {
  await gameService.updateGagnant(name);
}

//Fonction d'ajout de partie à ListGame
function addList(socketId1, Joueur1, socketId2, Joueur2) {
    const game = { idJ1: socketId1, J1: Joueur1, idJ2: socketId2, J2: Joueur2 };
    const obj = Object.create(game);
    ListGame.push(obj); //ajout de la partie à la liste
  }

/**
 * Fonction qui retrouve la partie dans laquelle se trouve le joueur qui s'est déconnecté
 * @param socketId socket id du joueur qui s'est déconnecté
 * @return La partie en question { idJ1 , J1 , idJ2 , J2 }
 */
//TODO: gérer la suppression de la partie de la liste et ajout victoire des joeurs => lié à la bdd
function findGame(socketId) {
    const find1 = ListGame.find(joueur => joueur.idJ1 === socketId);
    const find2 = ListGame.find(joueur => joueur.idJ2 === socketId);
    //on vérifie si le joueur est dans une partie ou pas 
    if (find1 === undefined || typeof find1 === 'undefined') {
      return find2;
    }
    return find1;
  }

// <----------------- Exports ----------------->
exports.selectColor = selectColor;
exports.newGame = newGame;
exports.updateGagnant = updateGagnant; // cas où un joueur s'est déconnecter
exports.addList = addList;
exports.findGame = findGame;
