import { Case } from "Case.js";

class Pion {

    // le joueur a qui le pion appartient
    player; // 0 pour j1, 1 pour j2
    //* la position est une coordonnée
    position
    //* pion=0, 1=dame
    level
    //* 0=inPlay, 1=eaten
    status
    
    constructor(x, y, player) {
        this.player = player;
        this.position = new Case(x, y);
        this.level = 0;
    }

        /** retourne un tableau des actions possibles pour ce pion avec le type d'actions et la case d'arrivée  */
    getPossibleMoves(plateau) {
        Moves = [];
        // if the piece is a pawn
        if (this.level == 0) {
            // inverse the direction of the moves if the player is 1
            frontLeft = this.player == 0 ? Case.getDownRight : Case.getUpLeft;
            frontRight = this.player == 0 ? Case.getDownLeft : Case.getUpRight;
            backLeft = this.player == 0 ? Case.getUpRight : Case.getDownLeft;
            backRight = this.player == 0 ? Case.getUpLeft : Case.getDownRight;
                if(frontLeft() != null){
                    if (this.isFree(frontLeft())) Moves.push(["move",this,new Case(frontLeft().x, frontLeft().y)]);
                    else{
                        pawnToTake=this.getPawn(frontLeft());
                        if(pawnToTake.player!=this.player && pawnToTake.isFree(pawnToTake.frontLeft())){
                        Moves.push(["take",this,new Case(frontLeft().x, frontLeft().y)]);
                    }
                }
                }
                if(frontRight() != null){
                    if (this.isFree(frontRight())) Moves.push(["move",this,new Case(frontRight().x, frontRight().y)]);
                    else{
                        pawnToTake=this.getPawn(frontRight());
                        if(pawnToTake.player!=this.player && pawnToTake.isFree(pawnToTake.frontRight())){
                        Moves.push(["take",this,new Case(frontRight().x, frontRight().y)]);
                    }
                }
                }
                if(backLeft() != null && !isFree(backLeft())){
                        pawnToTake=this.getPawn(backLeft());
                        if(pawnToTake.player!=this.player && pawnToTake.isFree(pawnToTake.backLeft())){
                        Moves.push(["take",this,new Case(backLeft().x, backLeft().y)]);
                    }
                }
                if(backRight() != null && !isFree(backRight())){
                        pawnToTake=this.getPawn(backRight());
                        if(pawnToTake.player!=this.player && pawnToTake.isFree(pawnToTake.backRight())){
                        Moves.push(["take",this,new Case(backRight().x, backRight().y)]);
                    }
                }
            }
        // if the piece is a dame
        else {
            placeToMove = position.frontLeft();
            moveToDo = true;
            wentOver = false;
            while (moveToDo) {
                if(!wentOver){
                    /** si la case est libre sans prise */
                if(this.isFree(placeToMove)){
                Moves.push(["move",this,new Case(placeToMove.x, placeToMove.y)]);
                }
                /** prise d'un pion */
                else{
                    pawnToTake=this.getPawn(placeToMove);
                    if(pawnToTake.player!=this.player && pawnToTake.isFree(pawnToTake.frontLeft())){
                        Moves.push(["take",this,new Case(placeToMove.x, placeToMove.y)]);
                    }
                    break;
                }
            }
            else{
                /** case d'arret après le pion */
                if(this.isFree(placeToMove)){
                Moves.push(["take",this,new Case(placeToMove.x, placeToMove.y)]);
                }
            }
            /** itération sur la case suivante dans la meme direction, continue tant qu'on à pas rencontrer le bord ou deux pions. */
                placeToMove = placeToMove.frontLeft();
            }
        }
    }
    
    IsFree(coord){
        return plateau.getPion(coord.x, coord.y) == null;
    }
    getPawn(coord){
        return plateau.getPion(coord.x, coord.y);
    }


    Move(coord){
        //TODO: Check move is possible
        //TODO: Move the piece
        //TODO: Check if the piece is a dame
        //TODO: Check if the piece can eat another piece
        //TODO: update visuals
    }
}