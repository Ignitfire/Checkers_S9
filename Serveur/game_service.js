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
    const currentDate  = new Date();
    const optionDate = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}
    let nouvellePartie = new Partie({
        joueur1: data.joueur1,
        joueur2: data.joueur2,
        gagnant: "",
<<<<<<< HEAD
        datePartie: currentDate.toLocaleDateString('fr-FR', optionDate) 
=======
        datePartie: new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
>>>>>>> df8ca9bb8d06d27df35445835c3e77aba4c96e0d
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