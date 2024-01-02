//<====== Gestion Service de la partie==> 
var game_model = require("./models/game_model");
var Partie = game_model.Partie;

// TODO : ajout des variables du modèle joueur ? => gestions des couleurs à bouger du coup

//TODO: fonction update du gagnant de la partie, on retourne le nom du gagnant en string pour la bdd
async function updateGagnant(name) {
    await Partie.findOneAndUpdate({ 
        $and: [
            { $or: [{ joueur1: name }, { joueur2: name }] },
            { gagnant: "" }
        ]
    }, { gagnant: name }) 
}

//TODO: fonction création et save d'une partie, renvoie les infos sur la partie
async function create (data) {
    let nouvellePartie = new Partie({
        joueur1: data.joueur1,
        joueur2: data.joueur2,
        gagnant: "",
        datePartie: Date.now()
    });

    // Sauvegarde de cette instance dans mongoDb
    await nouvellePartie.save()
        .catch(err => {
            console.error(err) // affiche erreur si problème
        });

}

// <--- Exports --->
exports.create = create;
exports.updateGagnant = updateGagnant;