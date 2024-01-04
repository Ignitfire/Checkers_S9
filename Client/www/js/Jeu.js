import Damier from "./Damier.js";
export default class Jeu {
    Joueur1;
    Joueur2;
    plateau;
    tour;
    joueurCourant;
    joueurQuiJoue;
    deplacementEvent;

    constructor(player1, player2, joueurCourant) {
        this.Joueur1 = player1;
        this.Joueur2 = player2;
        this.plateau = new Damier(this.Joueur1, this.Joueur2);
        this.tour = 1;
        this.joueurCourant = joueurCourant;
        this.joueurQuiJoue = this.Joueur1;
        this.deplacementEvent = new EventTarget();
    }

    doesCurrentPlayerCanPlay() {
        return this.joueurCourant === this.joueurQuiJoue;
    }

    isPawnOfCurrentPlayer(pawn) {
        return pawn.color === this.joueurCourant.color;
    }

    executeMove(move) {
        const ancienneCase = this.plateau.getCaseFromCoord(move.ancienneCase); // On récupère la case du plateau depuis laquelle un pion adverse a été bougé
        const prochaineCase = this.plateau.getCaseFromCoord(move.prochaineCase); // On récupère la case du plateau vers laquelle un pion adverse a été bougé
        const pionABouger = ancienneCase.pion; // On récupère le pion bougé

        pionABouger.c.setPawn(null); // On supprime le pion de l'ancienne case
        pionABouger.c = prochaineCase; // On déplace le pion vers la prochaine case
        if (pionABouger.isOnPromotionRow()) pionABouger.level = 1; // Si le pion est sur une case qui le fait devenir reine, alors on le pion devient reine
        prochaineCase.setPawn(pionABouger); // On informe la nouvelle case qu'elle a un pion
        if (!!move.casePionAPrendre) {
            const casePionAPrendre = this.plateau.getCaseFromCoord(move.casePionAPrendre);
            casePionAPrendre.pion.c = null;
            casePionAPrendre.setPawn(null);
        }

        return pionABouger;
    }

    tourSuivant() {
        this.tour++;
        this.joueurQuiJoue = this.joueurQuiJoue === this.Joueur1 ? this.Joueur2 : this.Joueur1;
        console.log("C'est au tour des " + this.joueurQuiJoue.color + "s de jouer");
    }
}