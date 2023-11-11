import Jeu from './Jeu.js';
import {showDamier, showPions} from './View.js';

showDamier();
console.log('app.js loaded')
let game = new Jeu();
console.log(game)
showPions(game.plateau.pions);
game.Joueur2.getMoves(game.plateau);
console.log(game.Joueur2.possibleMoves);
