// A FINIR !!!!!!!!!!!!!
// <---- Dépendance --->
//Node
var server = require ("http").createServer();
const io = require ("socket.io")(server);
//TODO:
// var user_manage, game_manage, adresse_manage
var bdd_connexion = require("./connexion_bdd");
var room = require("./room");
var game_gestion = require ("./gestions/game_gestion");
var adresse_gestion = require ("./gestions/adresse_gestion");


//ajouter const portServeur
var WaitListe = [];

//Lance le serveur
server.listen(portServeur);//va chercher la const
console.log ("Serveur lancé sur le port " + adresse_gestion.getAdressesIp(portServeur));

// <---- Gestion des évènements ---->
io.on("connection", function(socket) {
    console.log("Un client s'est connecté");
    socket.emit("connection", "Vous êtes connecté au serveur");

    // <---- Gestion des évènements de connexion ---->
    socket.on("login", async function (dataUser, etat) {

        // vérifie les rooms du socket 
        // TODO vérifier si socket.rooms est bien la bonne méthode ou socket adpater est mieux
        var roomDispo = Object.keys(socket.adpater.rooms).filter(item => item!= socket.id); //on ne veut pas que le socket se connecte à lui-même 
        
        
    
    });


});