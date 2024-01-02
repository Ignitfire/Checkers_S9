import Jeu from './Jeu.js';
import User from './User.js';
import {showGame} from './View.js';
const { io } = require("socket.io-client");


// Affichage du damier seul
console.log('app.js loaded')

// Initialisation des utilisateurs (A récupérer plus tard par le webSocket)
let user1 = new User("Joueur1");
let user2 = new User("Joueur2");

// Initialisation du jeu
let game = new Jeu(user1, user2);

// Affichage des pions du jeu
showGame(game);