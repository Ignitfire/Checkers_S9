import Case from './Case.js';
import Pion from './Pion.js';

export default class Damier {
    /**
     * Tableau de cases
     * @type {Case[]}
     */
    cases = [];

    /**
     * Dans ce constructeur, le joueur 1 est sytèmatiquement en haut
     * @param j1 Joueur
     * @param j2 Joueur
     */
    constructor(j1, j2) {
        this.cases = [];
        let White = false;
        for (let i = 1; i <= 8; i++) {
            White = !White;
            for (let j = 1; j <= 8; j++) {
                if (!White) {
                    let c = new Case(i, j, this);
                    let pion = null;
                    if (i <= 3) {
                        pion = new Pion(i, j, j1, c);
                        j1.pions.push(pion);
                    }
                    if (i >= 6) {
                        pion = new Pion(i, j, j2, c);
                        j2.pions.push(pion);
                    }
                    c.setPawn(pion);
                    this.cases.push(c);
                }
                White = !White;
            }
        }
    }

    /**
     * Retourne la case du plateau par rapport à des coordonnées données
     *
     * @param coord
     * @returns {Case}
     */
    getCaseFromCoord(coord) {
        return this.cases.find(c => c.x === coord.x && c.y === coord.y);
    }

    clearStatus() {
        this.cases.forEach(c => {
            if (c.status == 1) c.status = 0
        });
    }
}
