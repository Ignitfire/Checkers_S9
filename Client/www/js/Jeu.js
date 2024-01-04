import Damier from "./Damier.js";
export default class Jeu {
    Joueur1;
    Joueur2;
    plateau;
    tour;
    joueurCourant;
    joueurQuiJoue;

    constructor(player1, player2, joueurCourant) {
        this.Joueur1 = player1;
        this.Joueur2 = player2;
        this.plateau = new Damier(this.Joueur1, this.Joueur2);
        this.tour = 1;
        this.joueurCourant = joueurCourant;
        this.joueurQuiJoue = this.Joueur1;
    }

    doesCurrentPlayerCanPlay() {
        return this.joueurCourant === this.joueurQuiJoue;
    }

    isPawnOfCurrentPlayer(pawn) {
        return pawn.color === this.joueurCourant.color;
    }

    checkEnd() {
        if (this.checkVictory()) return true //TODO Renvoie la fonction de victoire du joueur concernée;
    }

    /** fonction de tour, active l'action pour un joueur */
    tour() {
        while (!end)
            if (this.turn == 1) {
                end = !this.Joueur1.tour(this.plateau);
                if (end) lauchEnd(1);
                // le joueur 1 joue
                this.turn = 2;
            } else {
                end = !this.Joueur2.tour(this.plateau);
                if (end) lauchEnd(2);
                // le joueur 2 joue
                this.turn = 1;
            }
        //TODO si les conditions de fin de partie sont réunies, end = true
    }
}