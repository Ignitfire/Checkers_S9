export default class Joueur {
    /** l'utilisateur qui joue le joueur */
    user;
    /** indice de la première ligne du joueur adverse ou les pions sont promus en dames */
    promotionRow;
    /** couleur du joueur */
    color;
    /** pion du joueur */
    pions = [];
    //TODO pas sur que ce soit toujours d'actualité, booléen qui definit si le joueur peut jouer ou non */
    active = false;

    /** Selected pawn */
    selectedPawn;
    /** Selected move */
    selectedMove;
    /** chaine de coups possibles, tableau de tableau de take */
    moveSequences = [];
    /** liste de coups possible, tableau de move ou take */
    possibleMoves = [];
    
    constructor(user, playerNumber) {
        this.user = user;
        if(playerNumber == 1){ 
            this.color = "white";
            this.promotionRow = 9;
        }
        else {
            this.color = "black";
            this.promotionRow = 0;
        }
    }


    executeMove(move) {
        /** si le coup est un move, on déplace le pion */
        if (move.type == "move") {
            move.pawn.position = move.destination;
            if(move.pawn.position.y == this.promotionRow) move.pawn.level = 1;
        }
        /** si le coup est une prise, on déplace le pion, on supprime le pion pris et on met à jour le damier */
        if (move.type == "take") {
            move.pawn.position = move.destination;
            if(move.pawn.position.y == this.promotionRow) move.pawn.level = 1; 
            move.pawnToTake.position = null;
            move.pawnToTake = null;
        }
    }

    /** si un autre coup possible met les valeurs de coups possibles à jour et renvoie true, sinon renvoie false */
    nextMove() {
        /** filtre les sequences pour ne garder que celle dont le premier coup à était joué */
        this.moveSequences = this.moveSequences.filter(moveSequence => moveSequence[0] == this.selectedMove);
        this.moveSequences.forEach(moveSequence => {
            moveSequence.shift();
        });
        /** si il n'y a plus de sequence, le joueur ne peut plus jouer */
        if (this.moveSequences.length == 0) return false;
        /** place le premier coups de chaque chaine dans possibleMoves */
        this.possibleMoves = [];
        this.moveSequences.forEach(moveSequence => {
            this.possibleMoves.push(moveSequence[0]);
        });
        return true;
    }


    /** recupere les coups (possibleMoves) et rafles (suite de possibleMoves dans moveSequence) */
    getMoves(plateau){
         /** recupère tout les coups possible de tous les pions */
         pions.forEach(pion => {
            this.possibleMoves.push(pion.getpossibleMoves(plateau));
        });
        /** si il y a possiblité de prises retire tout les move de type move et les rafle de pronfondeur inferieur */
        if (this.possibleMoves.some(move => move[0] == "take")) {
            /** retire tout les move de type move */
            this.possibleMoves = possibleMoves.filter(move => move[0] == "take");
            /** recherche de la profondeur maximum */
            let maxDepth = 0;
            this.possibleMoves.forEach(move => {
                if (move.depth > maxDepth) maxDepth = move.depth;
            });
            /** retire les move de profondeur inférieur */
            this.possibleMoves = this.possibleMoves.filter(move => move.depth == maxDepth);

            /** former des chainage de coups dans un tableau */
            this.possibleMoves.forEach(move => {
                let moveSequence = [];
                while (move.parent != null) {
                    moveSequence.unshift(move);
                    move = move.parent;
                };
                moveSequence.unshift(move);
                this.moveSequences.push(moveSequence);
            });
            // TODO verifier que les chaingages se forment correctement, que la chaine de parentalité est bien retrouvé.

            this.possibleMoves = [];
            /** place le premier coups de chaque chaine dans possibleMoves */
            this.moveSequences.forEach(moveSequence => {
                this.possibleMoves.push(moveSequence[0]);
            });
        }
    }

    tour(plateau) {
        this.getMoves(plateau);
        if (this.possibleMoves.length == 0) {
            return false;
        }
        let canPlay = true;
        while(canPlay){

        // TODO render vue
        // TODO await action, on recupere 2 coordonnées le pion a bougé et la case de destination
        let coordFrom;
        let coordTo;
        // TODO verfiier cette fonction partiellement auto-généré
       this.selectedMove = this.possibleMoves.find(move => 
             move.pawn.position.x == coordFrom.x && move.pawn.position.y == coordFrom.y && move.destination.x == coordTo.x && move.destination.y == coordTo.y
        );
        this.executeMove(this.selectedMove);
        if(!nextMove(this.selectedMove)) canPlay = false;
        }
    }

}