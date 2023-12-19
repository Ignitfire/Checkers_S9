import Jeu from './Jeu.js';
import User from './User.js';
import {showDamier, showPions, showPossibleMoves,} from './View.js';

// Affichage du damier seul
showDamier();
console.log('app.js loaded')

// Initialisation des utilisateurs (A récupérer plus tard par le webSocket)
let user1 = new User("Joueur1");
let user2 = new User("Joueur2");

// Initialisation du jeu
let game = new Jeu(user1, user2);

// Affichage des pions du jeu
showPions(game.plateau.pions);

