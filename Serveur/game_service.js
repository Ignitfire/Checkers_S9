//<====== Gestion Service de la partie==> 

// TODO : ajout des variables du modèle joueur ? => gestions des couleurs à bouger du coup

//TODO: fonction update du gagnant de la partie, on retourne le nom du gagnant en string pour la bdd
async function updateGagnant(name) {
    
}

//TODO: fonction création et save d'une partie, renvoie les infos sur la partie
async function create (data) {
    //voir avec le modèle 
    //on créer une nouvelle instance
    // et on la sauvegarde dans MongoDb avec un catch pour afficher si il y a une errer

}

// <--- Exports --->
exports.create = create;
exports.updateGagnant = updateGagnant;