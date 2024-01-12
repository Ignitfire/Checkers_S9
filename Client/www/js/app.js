import Jeu from './models/Jeu.js';
import User from './models/User.js';
const socket = io("http://192.168.1.215:3000");
import { ViewLoginForm } from "./views/view.loginForm.js";
import { ViewGame } from "./views/view.game.js";
import Joueur from "./models/Joueur.js";
import { ViewScore } from "./views/view.score.js";
import { ViewNavigation } from './views/view.navigation.js';
import { ViewHistorique } from './views/view.historique.js';

socket.on("server-log", (logMessage) => {
    console.log("Server Log: ", logMessage);
});

socket.on("server-error", (errorMessage) => {
    console.error("Server Error: ", errorMessage);
    //Recuperation de l'erreur
});

console.log("Client lancé");

socket.on("connection", () => {
    const viewLoginForm = new ViewLoginForm();
    let gameView;
    let currentUserData;
    let currentUser;
    let game;
    let currentPlayer;

    viewLoginForm.form.addEventListener("submit", (e) => {
        e.preventDefault();
        currentUserData = viewLoginForm.getUser();
        socket.emit("login", { username: currentUserData.username, password: currentUserData.password }, 0);
    });

    socket.on("error login", (error) => {
        console.log(error);
        viewLoginForm.renderError(error);
    });

    socket.on("attente", (message) => {
        console.log('Waiting Screen');
        viewLoginForm.renderWaitingScreen();
    });

    socket.on("start game", (message) => {
        message = JSON.parse(message);

        // Initialisation des utilisateurs (A récupérer plus tard par le webSocket)
        currentUser = new User(currentUserData.username);
        let opponentUser = new User(message.adversaire);
        let joueur1;
        let joueur2;

        if (message.color === 'noir') {
            joueur1 = new Joueur(opponentUser, 'blanc');
            joueur2 = new Joueur(currentUser, message.color);
            currentPlayer = joueur2;
        } else {
            joueur1 = new Joueur(currentUser, message.color);
            joueur2 = new Joueur(opponentUser, 'noir');
            currentPlayer = joueur1;
        }


        // Initialisation du jeu
        game = new Jeu(joueur1, joueur2, currentPlayer);

        // On supprime l'affichage de la waiting screen et/ou du formulaire
        viewLoginForm.clearRender();

        // Affichage des pions du jeu
        gameView = new ViewGame(game);

        //Affichage des boutons de gestion de jeu
        const navigations = new ViewNavigation(socket, currentUser, opponentUser, gameView);

        // ajustement des éléments de main
        let observer = new MutationObserver(function(mutations) {
            let main = document.querySelector('#main');
            let divs = main.getElementsByTagName('div');
        
            if (divs.length >= 3) {
                main.appendChild(document.querySelector('.navigation'));
                observer.disconnect(); // Stop observing when condition is met
            }
        });
        
        // Configuration of the observer:
        let config = { childList: true, subtree: true };
        
        // Pass in the target node (in this case, '#main') and the observer options
        observer.observe(document.querySelector('#main'), config);
        
        document.querySelector('#main').appendChild(document.querySelector('.navigation'));


        game.deplacementEvent.addEventListener('deplacement-move', (e) => {
            socket.emit('deplacement-move', e.detail);
            if (game.isOver()) {
                const nomGagnant = game.getNomGagnant();
                // Envoie de la fin de partie et du gagnant
                socket.emit("fin-partie", nomGagnant);
                gameView.renderGameOver(currentUser.name, socket);
            }
        });



        window.addEventListener('unload', (e) => {
            // On envoit au serveur que l'utilisateur s'est déconnecté
            socket.emit("disconnect");
        });
    });

    socket.on("deplacement-move", (moveData) => {
        const pawn = game.executeMove(moveData);
        gameView.movePawn(pawn, moveData);
        game.tourSuivant();
        currentPlayer.getMoves(game.plateau);
        console.log("listes des moves possibles: ", currentPlayer.possibleMoves);
        gameView.refreshJoueurQuiJoue();
        // Vérifier que le jeu est terminé
        if (game.isOver()) {
            gameView.renderGameOver(currentUser.name, socket);
        }
    });

    // On reçoit l'information du serveur que le joueur adverse s'est déconnecté
    socket.on("deconnexion-adversaire", (message, joueur) => {
        // On envoie au serveur que c'est une fin de partie
        socket.emit("fin-partie", joueur);
        // On informe le joueur qu'il a gagné la partie à cause de la deconnexion de son adversaire
        gameView.renderGameOver(currentUser.name, socket, message);
    });

    socket.on("abandon-adversaire", (message, joueur) => {
        // On envoie au serveur que c'est une fin de partie
        socket.emit("fin-partie", joueur);
        // On informe le joueur qu'il a gagné la partie à cause de l'abandon de son adversaire
        gameView.renderGameOver(currentUser.name, socket, message);
    });
    // On reçoit l'information du serveur d'afficher le tableau des scores
    socket.on("score", (data) => {
        const viewScore = new ViewScore(data);
    });
    // on recoit l'information du serveur d'affiché l'historiques des parties du joueur
    socket.on("historique", (data) => {
        const viewHistorique = new ViewHistorique(data);
    });
});
