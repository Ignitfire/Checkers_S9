class Jeu{
    Joueur1;
    Joueur2;
    plateau;
    //** booléen du tour en cours */
    turn = 1;
    //** booléen de fin de partie */
    end = false;

    constructor(joueur1, joueur2){
        this.Joueur1 = joueur1;
        this.Joueur2 = joueur2;
        this.plateau = new Damier();
        this.plateau.init();
    }  

    /** fonction de tour, active l'action pour un joueur */
    tour(){
        while (!end)
        if(this.turn==1){
            this.Joueur1.active=true;
            // le joueur 1 joue
            this.turn=2;
            this.Joueur1.active=false;
        }else{
            this.Joueur2.active=true;
            // le joueur 2 joue
            this.turn=1;
            this.Joueur2.active=false;
        }
        //TODO si les conditions de fin de partie sont réunies, end = true
    }
}