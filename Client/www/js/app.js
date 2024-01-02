import Jeu from './Jeu.js';
import User from './User.js';
import {showGame} from './View.js';
const socket = io("http://192.168.16.1:3000");
import {ViewLoginForm} from "./views/view.loginForm.js";
/*
// Initialisation des utilisateurs (A récupérer plus tard par le webSocket)
let user1 = new User("Joueur1");
let user2 = new User("Joueur2");

// Initialisation du jeu
let game = new Jeu(user1, user2);

// Affichage des pions du jeu
showGame(game);*/

// Définition des étapes à réaliser dans l'app :
// 1. Connexion au serveur
// 2. Affiche le formulaire de connexion
// 3. Gestion des erreurs et des boutons de connexion
// 4. Attente de l'arrivé d'un autre joueur
// 5. Lance la partie
const viewLoginForm = new ViewLoginForm();

socket.on("connection_ok", function () {
    console.log("Connexion au serveur ok")
})