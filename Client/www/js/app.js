import Jeu from './models/Jeu.js';
import User from './models/User.js';

const socket = io("http://192.168.16.1:3000");
import {ViewLoginForm} from "./views/view.loginForm.js";
import {ViewGame} from "./views/view.game.js";
import Joueur from "./models/Joueur.js";

socket.on("connection", () => {
    const viewLoginForm = new ViewLoginForm();
    let gameView;
    let currentUserData;
    let currentUser;
    let game;

    viewLoginForm.form.addEventListener("submit", (e) => {
        e.preventDefault();
        currentUserData = viewLoginForm.getUser();
        socket.emit("login", {username: currentUserData.username, password: currentUserData.password}, 0);
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
        let currentPlayer;

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

        game.deplacementEvent.addEventListener('deplacement-move', (e) => {
            socket.emit('deplacement-move', e.detail);
            if (game.isOver()) {
                const nomGagnant = game.getNomGagnant();
                // Envoie de la fin de partie et du gagnant
                socket.emit("fin-partie", nomGagnant);
                gameView.renderGameOver(currentUser.name, socket);
            }
        });
    });

    socket.on("deplacement-move", (moveData) => {
        const pawn = game.executeMove(moveData);
        gameView.movePawn(pawn, moveData);
        game.tourSuivant();
        gameView.refreshJoueurQuiJoue();
        // Vérifier que le jeu est terminé
        if (game.isOver()) {
            gameView.renderGameOver(currentUser.name, socket);
        }
    });
});
