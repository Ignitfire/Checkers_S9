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

}