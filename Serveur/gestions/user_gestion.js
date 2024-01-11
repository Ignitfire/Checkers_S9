//<--- Module dependencies --->//
const user_service = require('../user_service');

//<-- Variables globales -->//
let listeAttente = [];
let error;

//<--- Fonctions --->//

function getNbVictoire(name) {
    user_service.getUserVictoires(name)
    .then(data => {
      console.log(name + " a gagné " + data.nbVictoires + " fois.");
    })
}

/**
 * Incrémente le nombre de victoires du joueur
 * @param nom du joueur 
 */

function addVictoire (name) {
   user_service.updateVictoire(name).then(data => {
        console.log("Mise à jour du nombre de victoires du joueur");
   })
}

/**
 * Incrémente le nombre de parties jouées par le joueur
 * @param nom du joueur
 */

function addPartie (name) {
    user_service.updatePartie(name).then(data => {
        console.log("Mis à jour du nombre de parties jouées par le joueur");
    })
}

/**
 * Fonction qui récupère la liste de tous les utilisateurs avec le score
 * @return une liste de Document JSON contenant le score de tout les joueurs
 * Fonction asynchrone car on attend la réponse de la bdd
 */
async function getAllUserScore() {
    return await user_service.getAllUserScore();
}

async function getPlayerGameHistory(username) {
    return await user_service.getPlayerGameHistory(username);
}

/**
 * Ajout d'un joueur dans la liste d'attente
 * @param socket socket du joueur
 * @param name nom du joueur
 */

function JoueurCo(socket, name) {
    listeAttente.push({socket: socket, name: name});
}

/**
 * Supprime un joueur de la liste d'attente
 * Utilise la méthode filter() pour créer une nouvelle liste qui exclue les éléments correspondant à socket.id
 * @param socket socket du joueur
 */

function JoueurDeco (socket) {
    listeAttente = listeAttente.filter(el => {
        // Retourne true si l'id de la socket actuelle ne correspond pas à l'id de la socket passée en paramètre
        return el.socket.id != socket.id;
    });
}

/**
 * Fonction authentification/ajout d'utilisateur dans la bdd et dans la liste d'attente
 * @param data données du joueur { nom, mdp } ou { nom } si déjà connecté
 * @param socket socket du joueur
 * @param etat état du joueur (0 si non connecté, 1 si connecté)
 * @returns Promesse d'un objet { error, listeAttente }
 */

async function addJoueur (data, socket, etat) {
    
    if (etat == 0) {
        const userPromise = await user_service.authenticate(data);
        if (userPromise.error == null) {
            //On ajoute le joueur à la liste d'attente
            
            JoueurCo(socket, userPromise.user.username); 
            error = null;
        } else {
            //Si une erreur est retourner, on attribue le message à notre variable error
            error = userPromise.error;
        }
    } else if (etat == 1) {
        //on vérifie qu'il n'est pas déjà dans la liste d'attente
        const existUser = listeAttente.find(el => el.name === data.username);
        if (!existUser) {
            //On ajoute le joueur à la liste d'attente
            JoueurCo(socket, data.username);
            error = null;
        } else {
            error = "Vous êtes déjà dans la liste d'attente";
        }
    }
    //On retourne la liste d'attente et l'erreur
    return { error: error, listeAttente: listeAttente };
} 

//<--- Exports --->//
exports.addJoueur = addJoueur;
exports.JoueurDeco = JoueurDeco;
exports.JoueurCo = JoueurCo;
exports.getAllUserScore = getAllUserScore;
exports.addPartie = addPartie;
exports.addVictoire = addVictoire;
exports.getNbVictoire = getNbVictoire;
exports.getPlayerGameHistory = getPlayerGameHistory;
