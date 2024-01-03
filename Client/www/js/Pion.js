import Move from "./Move.js";

export default class Pion {

    // le joueur a qui le pion appartient
    player; // 0 pour j1, 1 pour j2
    //* la position est une case
    position;
    //* pion=0, 1=dame
    level;
    //* 0=inPlay, 1=eaten, 2=won
    status;
    color;
    c;

    constructor(x, y, player, c) {
        this.player = player;
        this.level = 0;
        this.status = 0;
        this.color = player.color;
        this.c = c;
    }

    /** retourne un tableau des actions possibles pour ce pion avec le type d'actions et la case d'arrivée  */
    getPossibleMoves(takeOnly = false, depth = 0, parent = null) {
        /*
         * si takeOnly vaut false, rajouter les coups de type move en itérant sur frontleft et frontright pour pion ou pour dame.
         * identifier chaque prise possible en itérant sur les quatres directions pour pion puis pour dame,
         *      pour chaque prises verifier les prises possible depuis la case destination en marquant le pion comme passé.
         * cosntruire l'arbre de rafles en rajoutant chaque prises possiile depuis une prise comme move descendants.
         * rajouter les coups take de premier niveau dans le tableau de moves.
         */
        let moves = [];
        let directions = this.player.getDirections();

        // sauvegarde de la position d'origine
        let originalPostition = this.c;

        // itération sur les directions
        for (let i = 0; i < directions.length; i++) {
            let direction = directions[i];
            let coord = this.c.getCoordFromDirection(direction); // Récupération des coordonnées X,Y en fonction de la direction de la case courante
            if (this.level === 0 && coord !== null) {
                let caseFromDirection = this.getPlateau().getCaseFromCoord(coord); // On récupère la case à partir des coordonnées X,Y
                if (!caseFromDirection.hasPawn() && !takeOnly && i < 2) {
                    moves.push(new Move("move", this, caseFromDirection)); // Ajout de mouvement si la case est libre dans les directions avant
                } else if (caseFromDirection.hasPawn() || takeOnly) {
                    // ajout de prise recursive si la case est occupée par un pion adverse dans toutes les directions
                    let pawnToTake = caseFromDirection.pion;
                    let coordBehindPawn = pawnToTake.c.getCoordFromDirection(direction);
                    if (coordBehindPawn !== null) {
                        let destination = this.getPlateau().getCaseFromCoord(coordBehindPawn);
                        // verifie que le pion est adverse, que la case derriere est libre et que le pion est non pris
                        if (!destination.hasPawn() && !this.hasSamePlayer(pawnToTake) && pawnToTake.status == 0) {
                            let move = new Move("take", this, destination, parent, pawnToTake, depth);
                            moves.push(move);
                        }
                    }
                }
            } else if (this.level === 1 && coord !== null) {
                let destination = coord
                let pawnToTake = null;
                let wentOver = false;
                while (destination != null) {
                    let caseFromDirection = this.getPlateau().getCaseFromCoord(destination); // On récupère la case à partir des coordonnées X,Y
                    if (!wentOver) {
                        /** si la case est libre sans prise */
                        if (!caseFromDirection.hasPawn() && !takeOnly) {
                            moves.push(new Move("move", this, caseFromDirection));
                        } else if (caseFromDirection.hasPawn() || takeOnly) {
                            // ajout de prise recursive si la case est occupée par un pion adverse dans toutes les directions
                            let pawnToTake = caseFromDirection.pion;
                            let coordBehindPawn = pawnToTake.c.getCoordFromDirection(direction);
                            if (coordBehindPawn !== null) {
                                let destination = this.getPlateau().getCaseFromCoord(coordBehindPawn);
                                // verifie que le pion est adverse, que la case derriere est libre et que le pion est non pris
                                if (!destination.hasPawn() && !this.hasSamePlayer(pawnToTake) && pawnToTake.status == 0) {
                                    let move = new Move("take", this, destination, parent, pawnToTake, depth);
                                    moves.push(move);
                                    wentOver = true;
                                }
                            }
                        }
                    } else if (!caseFromDirection.hasPawn()) {
                        let move = new Move("take", this, destination, parent, pawnToTake, depth);
                        moves.push(move);
                    } else break;
                    /** itération sur la case suivante dans la meme direction, continue tant qu'on à pas rencontrer le bord ou deux pions. */
                    destination = caseFromDirection.getCoordFromDirection(direction);
                }
            }

        }

        return moves;
    }

    getPlateau() {
        return this.c.plateau;
    }

    /**
     *
     * @returns {boolean}
     */
    isOnPromotionRow() {
        return this.c.x === this.player.promotionRow;
    }

    hasSamePlayer(pawn) {
        return this.player.playerNumber === pawn.player.playerNumber;
    }
}