class Joueur {
    /** l'utilisateur qui joue le joueur */
    user;
    /** indice de la première ligne du joueur adverse ou les pions sont promus en dames */
    promotionRow;
    /** couleur du joueur */
    color;
    /** pion du joueur */
    pions = [];
    /** booléen qui definit si le joueur peut jouer ou non */
    active = false;

    /** Selected pawn */
    selectedPawn;

    movePawn(pion, coord) {

    }
    TakePawn(pion, coord) {

    }
    getPossibleMoves(pion) {

    }

    tour(plateau) {

        /** recupère tout les coups possible de tous les pions */
        PossibleMoves = [];
        pions.forEach(pion => {
            theoreticalMoves.push(pion.getPossibleMoves());
        });
        /** si il y a possiblité de prises lance une recherche en profondeur des prises multiples possibles et ne gearde que celles de plus haute profondeur */
        if (PossibleMoves.some(move => move[0] == "take")) {
            /** retire tout les move de type move */
            PossibleMoves = PossibleMoves.filter(move => move[0] == "take");

        }
        // TODO render les coups possibles à la vue pour activer l'action sur les cases concernés et attend la réponse de l'utilisateur
        
    }

}