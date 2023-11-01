 import Joueur from "./Joueur.js";
 import Damier from "./Damier.js";

 
 export default class Jeu{
    Joueur1;
    Joueur2;
    plateau;

    //**Conserve un historique des coups joués, pour pouvoir revenir en arrière
    Moves=[];
    //** nombre de tours sans prises */
    turnCounter = 0;
    //** numéro du tour en cours */
    turnCounter = 0;
    //** booléen du tour en cours, à le même indicateur que le joueur qui doit jouer */
    turnIndicator = 1;
    //** booléen de fin de partie */
    end = false;

    constructor(user1, user2){
        let randomizer= Math.round(Math.random());
        if(randomizer==0){
            this.Joueur1 = new Joueur(user1, 1);
            this.Joueur2 = new Joueur(user2, 2);
        }
        else{
            this.Joueur1 = new Joueur(user2, 1);
            this.Joueur2 = new Joueur(user1, 2);
        }
        this.plateau = new Damier(this.Joueur1, this.Joueur2);
    }

    checkVictory(){
        // plus de pions ou plus de coups possibles, la defaite par abandon est géré ailleurs
    }

    checkDraw(){
        // 3 repetitions des deux cotés ou 25 tours sans prises

    }
    checkEnd(){
        if(this.checkVictory()) return true //TODO Renvoie la fonction de victoire du joueur concernée;
    }

    /** fonction de tour, active l'action pour un joueur */
    tour(){
        while (!end)
        if(this.turn==1){
            end=!this.Joueur1.tour(this.plateau);
            if(end) lauchEnd(1);
            // le joueur 1 joue
            this.turn=2;
        }else{
            end=!this.Joueur2.tour(this.plateau);
            if(end) lauchEnd(2);
            // le joueur 2 joue
            this.turn=1;
        }
        //TODO si les conditions de fin de partie sont réunies, end = true
    }
}