// A FINIR !!!!!!!!!!!!!
// <---- Dépendance --->
//Node
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8000"
    }
});
var user_gestion = require("./gestions/user_gestion");
var bdd_connexion = require("./connexion_bdd");
var room = require("./room");
var game_gestion = require("./gestions/game_gestion");
var adresse_gestion = require("./gestions/adresse_gestion");


const portServeur = 3000; // à vérifier si sela ne pose pas de conflit avec d'autres services sinon changer le port
var WaitListe = [];

//Lance le serveur
server.listen(portServeur);//va chercher la const
console.log("Serveur lancé sur le port " + adresse_gestion.getAdressesIp(portServeur));

// <---- Gestion des évènements ---->
io.on("connection", function (socket) {
    console.log("Un client s'est connecté");
    socket.emit("connection", "Vous êtes connecté au serveur");
    socket.emit("server-log", "Un client s'est connecté");

    // <---- Gestion des évènements de connexion ---->
    socket.on("login", async function (dataUser, etat) {
        try {

            // vérifie les rooms du socket 
            // TODO vérifier si socket.rooms est bien la bonne méthode ou socket adpater est mieux
            const roomDispo = Object.keys(socket.adapter.rooms).filter(item => item !== socket.id); //on ne veut pas que le socket se connecte à lui-même

            //on regarde si le socket est déjà dans une room
            if (socket.adapter.rooms[roomDispo]) {
                //on le déconnecte de la room
                socket.leave(roomDispo);
            }

            const obj = await user_gestion.addJoueur(dataUser, socket, etat);

            //on vérifie si il y a une erreur => on bloque et on renvoie l'erreur au client
            if (obj.error != null) {
                socket.emit("error login", obj.error);
                socket.emit("server-error", "Erreur durant login " + obj.error);
            } 
            else {
                // déroulement normal
                listeAttente = obj.listeAttente;

                //on vérifie si il y a au moins 2 joueurs dans la liste d'attente
                if (listeAttente.length >= 2) {
                    game_gestion.addList(listeAttente[0].socket.id, listeAttente[0].name, listeAttente[1].socket.id, listeAttente[1].name);

                    //On créer la nouvelle partie en bdd
                    await game_gestion.newGame(listeAttente[0].name, listeAttente[1].name);

                    const color = game_gestion.selectColor();

                    //On incrémente le nombre de parties jouées des joueurs
                    user_gestion.addPartie(listeAttente[0].name);
                    user_gestion.addPartie(listeAttente[1].name);

                    //On les ajoute à la room
                    await room.addRoom(listeAttente[0].socket);
                    await room.addRoom(listeAttente[1].socket);

                    //Envoie des infos de la partie aux joueurs
                    io.to(`${listeAttente[0].socket.id}`).emit(
                        "start game",
                        JSON.stringify({
                            color: color.color1,
                            adversaire: listeAttente[1].name
                        })
                    );
                    io.to(`${listeAttente[1].socket.id}`).emit(
                        "start game",
                        JSON.stringify({
                            color: color.color2,
                            adversaire: listeAttente[0].name
                        })
                    );

                    //On supprime les joueurs de la liste d'attente
                    listeAttente.splice(0, 2);
                } else {
                    // le joueur est seul dans la liste d'attente
                    socket.emit("attente", "En attente d'un adversaire, veuillez patienter...");
                }
            }


        } catch (error) {
            console.error("Erreur lors de la gestion de la promesse : ", error);
            socket.emit("server-error", "Erreur lors de la gestion de la promesse : " + error);
        }
    });

    // se contente de renvoyer le mouvement à l'autre joueur, l'inversement est fait coté client
    socket.on("deplacement-move", function (move) {
        const currentRoom = Object.keys(socket.rooms).filter(item => item !== socket.id); //on ne veut pas que le socket se connecte à lui-même
        //on envoie le mouvement à l'autre joueur
        socket.to(currentRoom).emit("deplacement-move", move);

    });

    socket.on("fin-partie", async function (name) {
        user_gestion.addVictoire(name);
        await game_gestion.updateGagnant(name);
        user_gestion.getNbVictoire(name);
    });

    socket.on("score", function () {
        user_gestion.getAllUserScore().then(data => {
            socket.emit("score", data);
        });
    });

    socket.on("historique", function (username) {
        user_gestion.getPlayerGameHistory(username).then(data => {
            socket.emit("historique", data);
        });
    });

    socket.on("disconnect", function () {
        user_gestion.JoueurDeco(socket);
        //on récupère la partie dans laquelle se trouve le joueur qui s'est déconnecté
        const game = game_gestion.findGame(socket.id);
        //Si la partie existe
        if (game !== undefined || typeof game !== 'undefined') {
            //on regarde si le joueur qui s'est déconnecté est le joueur 1
            if (socket.id === game.idJ1) {
                //on envoie un message au joueur 2 pour lui dire que son adversaire s'est déconnecté
                io.to(`${game.idJ2}`).emit("deconnexion", "Votre adversaire s'est déconnecté, vous avez gagné la partie !", game.J2);
            }
            //sinon on envoie un message au joueur 1 pour lui dire que son adversaire s'est déconnecté
            socket.to(`${game.idJ1}`).emit("deconnexion", "Votre adversaire s'est déconnecté, vous avez gagné la partie !", game.J1);
        }
    });

});