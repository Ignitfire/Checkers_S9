//<==== Services gestion utilisateurs basé sur le modèle User.js===>
// <---- Dépendances ---->
const UserModel = require("./models/user_model");
const bcrypt = require("bcryptjs"); //pour le hashage du mot de passe. bycryptjs permet d'éviter les problèmes de dépendances => bycrypt est lié nativement à node
/* Il est possible qu'il vaudrait mieux créer un modèle pour l'utilisateur pour 
simplifier son insértion dans la bdd with mongoose.Schema => à voir
Alternative => modifier le fichier modèle dans client et ajouter le schéma pour le modèle et les exports + déoendances bdd_co et mongoose */
const User = UserModel.User// pas sûre que cela marche sans un fichier de modèle valable

// <---- Fonctions ---->

/**
    * Fonction qui permet de authentifier un utilisateur
    * @param data les données de l'utilisateur
    * @return Un objet avec une erreur et un utilisateur
    */
async function authenticate(data) {
    const user = await User.findOne({ username: data.username }); //on cherche l'utilisateur dans la bdd 
    if(!user) {
        console.log("Utilisateur non trouvé");
        return await create(data); 
    } else {
        //on compare les mots de passe
        if(bcrypt.compareSync(data.password, user.password)) {
            console.log("Identification: Utilisateur est authentifié");
            //on retourne l'utilisateur authentifié et qu'il n'y a pas d'erreur
            return {error: "null", user: user}; 
        } else {
            console.log("Identification: Mot de passe incorrect");
            return {error: "Mot de passe incorrect", user: {}}; //on retourne une erreur et un utilisateur vide
        }
    }
}

async function create(data) {
    //on hash le mot de passe
    const hashMdp = await bcrypt.hash(data.password, 10); //10 => nombre de tours de hashage 

    //on créer une nouvelle instance de User => RENDRE LE MODELE UTILISATEUR VALABLE
    const user = new User({
        username: data.username,
        password: hashMdp,
        nbVictoires: 0,
        nbParties: 0
    })

    //on sauvegarde l'utilisateur dans la bdd
    await user.save()
        .then(() => {
            console.log("Utilisateur ajouté à la bdd avec succès");
        })
        .catch(err => {
            console.log(err); //on affiche l'erreur
        })
    return {error: "null", user: user}; //on retourne l'utilisateur et qu'il n'y a pas d'erreur

}

// --------Fonctions pour la gestions des victoires et des parties jouées => Classement-------

/**
 * Fonction qui récupère tout les utilisateurs de la bdd
 * @returns renvoie une liste d'utilisateurs => JSON
 * */
async function getAllUserScore() {
    return await User.find({}, ['name', 'nbVictoires', 'nbParties']);
    // => fonctionne si on change le modèle de User pour ajouter les champs nbVictoires et nbParties
}

async function getUserVictoires(username) {
    return await User.findOne({ username: username }, ['nbVictoires']);
}

async function updateVictoire(username) {
    //upsert permet de créer un document si l'utilisateur n'as pas encore de victoires
    //$inc permet d'incrémenter la valeur de nbVictoires et on lui passe 1 en paramètre
    //findOneAndUpdate permet de trouver un utilisateur et de le mettre à jour 
    await User.findOneAndUpdate({ username: username }, { $inc: { nbVictoires: 1 } }, { upsert:true } );
}

async function updatePartie(username) {
    //même principe que pour updateVictoire	
    await User.findOneAndUpdate({ username: username }, { $inc: { nbParties: 1 } }, { upsert:true } );
}

// <---- Exports ---->
exports.authenticate = authenticate;
exports.create = create; 
exports.getAllUserScore = getAllUserScore;
exports.getUserVictoires = getUserVictoires;
exports.updateVictoire = updateVictoire;
exports.updatePartie = updatePartie;
