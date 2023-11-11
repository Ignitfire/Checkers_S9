import  Case  from "./Case.js";
import  Move  from "./Move.js";

export default class Pion {

    // le joueur a qui le pion appartient
    player; // 0 pour j1, 1 pour j2
    //* la position est une case
    position
    //* pion=0, 1=dame
    level
    //* 0=inPlay, 1=eaten, 2=won
    status
    color
    
    constructor(x, y, player) {
        this.player = player;
        this.position = new Case(x, y);
        this.level = 0;
        this.status = 0;
        this.color = player == 0 ? "white" : "black";
    }

        /** retourne un tableau des actions possibles pour ce pion avec le type d'actions et la case d'arrivée  */
    getPossibleMoves(plateau, takeOnly = false, depth=0, parent=null) {
        console.log("position: "+this.position.x + this.position.y);
/*
         * si takeOnly vaut false, rajouter les coups de type move en itérant sur frontleft et frontright pour pion ou pour dame.
         * identifier chaque prise possible en itérant sur les quatres directions pour pion puis pour dame, 
         *      pour chaque prises verifier les prises possible depuis la case destination en marquant le pion comme passé.
         * cosntruire l'arbre de rafles en rajoutant chaque prises possiile depuis une prise comme move descendants.
         * rajouter les coups take de premier niveau dans le tableau de moves.
         */
        let moves = [];
        let directions = [];
        // inverse the direction of the moves if the player is 1
        //TODO potentiellement mettre ses fonctions dans player plutot qu'ici.
        let frontLeft = this.player == 0 ? this.position.getDownRight.bind(this.position) : this.position.getUpLeft.bind(this.position);
        let frontRight = this.player == 0 ? this.position.getDownLeft.bind(this.position) : this.position.getUpRight.bind(this.position);
        let backLeft = this.player == 0 ? this.position.getUpRight.bind(this.position) : this.position.getDownLeft.bind(this.position);
        let backRight = this.player == 0 ? this.position.getUpLeft.bind(this.position) : this.position.getDownRight.bind(this.position);
        directions.push(frontLeft, frontRight, backLeft, backRight);

        // sauvegarde de la position d'origine
        let originalPostition = this.position;
            
            // itération sur les directions
            for(let i=0;i<directions.length;i++){
                let direction = directions[i];
                // if the piece is a pawn 
                if (this.level == 0) {
                    if(direction() != null){
                        // ajout de mouvement si la ce est libre dans les directions avant
                        console.log(direction().x +" "+ direction().y);
                        console.log(this.isFree(direction(),plateau), !takeOnly, i);
                        if (this.isFree(direction(),plateau) && !takeOnly && i<2) moves.push(new Move("move",this,new Case(direction().x, direction().y)));
                        // ajout de prise recursive si la case est occupée par un pion adverse dans toutes les directions
                        else{
                            console.log(direction());
                            let pawnToTake=plateau.getPion(direction().x,direction().y);
                            // verifie que le pion est adverse, que la case derriere est libre et que le pion est non pris
                            if(pawnToTake.player!=this.player && pawnToTake.isFree(pawnToTake.direction(),plateau) && pawnToTake.status==0){
                                let destination=new Case(pawnToTake.position.direction().x, pawnToTake.position.direction().y);
                                    
                                // deplacement fictif du pion qui s'annule apres la recherche
                                pawnToTake.status = 1;
                                this.postition = destination;
                                if(this.position.y == this.promotionRow) this.level = 1;
    
                                // recherche récursives des prises possibles depuis la case destination en takeOnly, l'indicateur de profondeur de la rafle "depth" est incrémenté
                                let move = new Move("take", this, destination, parent, pawnToTake, depth);
                                move.descendants=pawn.getPossibleMoves(plateau,true,depth+1, move);
                                moves.push(move);

                                //reset des variables du déplacement fictif
                                this.position = originalPostition;
                                this.level = 0;
                                plateau.clearStatus();   
                                }
                            }
                        }
                }

                // if the piece is a dame
                else {
                    let destination = position.direction();
                    let pawnToTake = null;
                    //
                    let wentOver = false;
                    while (destination!=null){
                        if(!wentOver){
                        /** si la case est libre sans prise */
                        if(this.isFree(destination,plateau) && !takeOnly){
                        moves.push(new Move ("move",this,new Case(destination.x, destination.y)));
                        }
                        /** prise d'un pion */
                        else{
                            pawnToTake=plateau.getPion(destination.x,destination.y);
                            if(pawnToTake.player == this.player) break;
                            else if(pawnToTake.isFree(pawnToTake.direction(),plateau)){
                                
                            // deplacement fictif du pion qui s'annule apres la recherche
                            pawnToTake.status = 1;
                            pawn.postition = destination;

                            // recherche récursives des prises possibles depuis la case destination en takeOnly, l'indicateur de profondeur de la rafle "depth" est incrémenté
                            let move = new Move("take", this, destination, parent, pawnToTake, depth);
                            move.descendants=pawn.getPossibleMoves(plateau,true,depth+1, move);
                            moves.push(move);

                            //reset des variables du déplacement fictif
                            this.position = originalPostition;
                            plateau.clearStatus();                                    
                            
                            wentOver = true;
                            }
                        }
                    }
                    else{
                        /** case d'arret après le pion */
                        if(this.isFree(destination,plateau)){

                            // deplacement fictif du pion qui s'annule apres la recherche
                            pawnToTake.status = 1;
                            pawn.postition = destination;

                            // recherche récursives des prises possibles depuis la case destination en takeOnly, l'indicateur de profondeur de la rafle "depth" est incrémenté
                            let move = new Move("take", this, destination,parent, pawnToTake, depth);
                            move.descendants=pawn.getPossibleMoves(plateau,true,depth+1, move);
                            moves.push(move);

                            //reset des variables du déplacement fictif
                            this.position = originalPostition;
                            plateau.clearStatus();
                        }
                        else break;
                    }
                    /** itération sur la case suivante dans la meme direction, continue tant qu'on à pas rencontrer le bord ou deux pions. */
                        destination = destination.direction();
                    }
                }

            }

        return moves;
    }
    
    isFree(coord,plateau){
        return plateau.getPion(coord.x, coord.y) == null;
    }


    Move(coord){
        //TODO: Check move is possible
        //TODO: Move the piece
        //TODO: Check if the piece is a dame
        //TODO: Check if the piece can eat another piece
        //TODO: update visuals
    }
}