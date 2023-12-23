import Case from "./Case.js";
import Pawn from "./Pion.js";

export default class Move {
    type;
    pawn;
    pawnToTake;
    destination;
    parent;
    descendants;
    depth;

    constructor(type, pawn, destination, parent = null, pawnToTake = null, depth = 0, descendants = []) {
        this.type = type;
        this.pawn = pawn;
        this.destination = destination;
        this.parent = parent;
        this.pawnToTake = pawnToTake;
        this.descendants = descendants;
        this.depth = depth;
    }

    execute() {
        /** si le coup est un move, on déplace le pion */
        if (this.type === "move") {
            if (this.pawn.isOnPromotionRow()) this.pawn.level = 1;
            this.pawn.c.setPawn(null);
            this.pawn.c = this.destination;
            this.destination.setPawn(this.pawn);
        }
        /** si le coup est une prise, on déplace le pion, on supprime le pion pris et on met à jour le damier */
        if (this.type === "take") {
            if (this.pawn.isOnPromotionRow()) this.pawn.level = 1;
            this.pawn.c.setPawn(null);
            this.pawn.c = this.destination;
            this.destination.setPawn(this.pawn);
            this.pawnToTake.c.setPawn(null);
        }
    }
}