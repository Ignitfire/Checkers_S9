export default class Case {
    name;
    x;
    y;
    pion;
    plateau;

    constructor(x, y, plateau) {
        this.name = "Case" + x + y;
        this.x = x;
        this.y = y;
        this.plateau = plateau;
    }

    /**
     * Défini un pion sur la case
     * @param pawn
     */
    setPawn(pawn) {
        this.pion = pawn;
    }

    hasPawn() {
        return this.pion != null;
    }

    getUpLeft() {
        let x = this.x;
        let y = this.y;
        return (x > 1 && y > 1) ? {x: x - 1, y: y - 1} : null;
    }

    getUpRight() {
        let x = this.x;
        let y = this.y;
        return (x > 1 && y < 8) ? {x: x - 1, y: y + 1} : null;
    }

    getDownLeft() {
        let x = this.x;
        let y = this.y;
        return (x < 8 && y > 1) ? {x: x + 1, y: y - 1} : null;
    }

    getDownRight() {
        let x = this.x;
        let y = this.y;
        return (x < 8 && y < 8) ? {x: x + 1, y: y + 1} : null;
    }

    getCoordFromDirection(name) {
        if (name === "UpLeft")
            return this.getUpLeft();
        if (name === "UpRight")
            return this.getUpRight();
        if (name === "DownLeft")
            return this.getDownLeft();
        if (name === "DownRight")
            return this.getDownRight();
    }

    getCoord() {
        return {x: this.x, y: this.y};
    }
}