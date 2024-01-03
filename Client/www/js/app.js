import Jeu from './Jeu.js';
import User from './User.js';
import {showGame} from './View.js';

const socket = io("http://192.168.1.10:3000");
import {ViewLoginForm} from "./views/view.loginForm.js";
/*
// Initialisation des utilisateurs (A récupérer plus tard par le webSocket)
let user1 = new User("Joueur1");
let user2 = new User("Joueur2");

// Initialisation du jeu
let game = new Jeu(user1, user2);

// Affichage des pions du jeu
showGame(game);*/

socket.on("connection", () => {
    const viewLoginForm = new ViewLoginForm();
    viewLoginForm.form.addEventListener("submit", (e) => {
        e.preventDefault();
        socket.emit("login", {username: viewLoginForm.usernameInput.value, password: viewLoginForm.passwordInput.value}, 0);
    });

    socket.on("attente", (message) => {
        console.log('Waiting Screen');
        viewLoginForm.renderWaitingScreen();
    });

    socket.on("start game", (message) => {
        console.log('Start Game !');
        console.log(message);
    });
});
