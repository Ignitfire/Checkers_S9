//<====== Gestion Service de la partie==> 
var game_model = require("./models/game_model");
var Partie = game_model.Partie;


async function updateGagnant(name) {
    await Partie.findOneAndUpdate({ 
        $and: [
            { $or: [{ joueur1: name }, { joueur2: name }] },
            { gagnant: "" }
        ]
    }, { gagnant: name }) 
}


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