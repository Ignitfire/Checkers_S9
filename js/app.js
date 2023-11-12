import Jeu from './Jeu.js';
import {showDamier, showPions, showPossibleMoves, } from './View.js';

showDamier();
console.log('app.js loaded')
let game = new Jeu();
console.log(game)
showPions(game.plateau.pions);
game.Joueur2.getMoves(game.plateau);
let J2moves=game.Joueur2.possibleMoves;
console.log(J2moves);
showPossibleMoves(game.Joueur2.possibleMoves);
console.log(J2moves[0]);
game.Joueur2.executeMove(J2moves[0]);

