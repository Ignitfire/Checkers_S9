export class ViewGame {
    constructor(game) {
        this.initGame(game);
        this.renderGame();
    }

    initGame(game) {
        this.game = game;
        this.initDamier();
    }

    initDamier() {
        // create a new div element
        let damier = document.createElement("div");
        damier.id = "damier";

        // and give it some content
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        for (let i = 0; i < 10; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < 10; j++) {
                let td = document.createElement("td");
                td.id = "case" + i + j;
                td.classList.add("case");
                (i + j) % 2 === 0 ? td.classList.add("beige") : td.classList.add("brown");
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        damier.style.display = "block";
        damier.appendChild(table);
        table.appendChild(tbody);
        this.damier = damier;
    }

    renderGame() {
        this.renderDamier();
        this.renderPawns();
    }

    renderDamier() {
        const mainDiv = document.getElementById('main');
        mainDiv.appendChild(this.damier);
    }

    renderPawns() {
        const joueurs = [this.game.Joueur1, this.game.Joueur2];
        joueurs.forEach(joueur => {
            joueur.pions.forEach(pion => {
                this.renderPawn(pion);
            });
        });
    }

    renderPawn(pawn) {
        const pion = document.createElement("div");
        pion.id = "pion" + pawn.c.x + pawn.c.y;
        pion.classList.add("pion");
        pion.classList.add(pawn.color);

        if (pawn.level === 1) {
            const dame = document.createElement("div");
            dame.classList.add("dame");
            dame.textContent = "D";
            pion.appendChild(dame);
        }

        pion.addEventListener('click', (e) => {
            if (this.game.doesCurrentPlayerCanPlay() && this.game.isPawnOfCurrentPlayer(pawn)) {
                // On efface tous les mouvements déjà présents
                this.cleanPossibleMoves();
                // On affiche les mouvements possibles pour le pion sélectionné
                this.renderPossibleMoves(pawn.getPossibleMoves());
            }
        });

        const casePion = document.getElementById("case" + pawn.c.x + pawn.c.y);
        casePion.appendChild(pion);
    }

    renderPossibleMoves(possibleMoves) {
        possibleMoves.forEach(move => {
            const caseDestination = document.getElementById("case" + move.prochaineCase.x + move.prochaineCase.y);
            caseDestination.classList.add("possibleMove");
            if (!!move.casePionAPrendre) {
                caseDestination.classList.add("take");
            }
            caseDestination.addEventListener("click", () => {
                const eventToSend = new CustomEvent('deplacement-move', {detail : move});
                // On mets la logique du jeu à jour
                const pion = this.game.executeMove(move);
                // On mets l'écran du jeu à jour
                this.movePawn(pion, move);
                // On envoie l'evenement à l'autre joueur
                this.game.deplacementEvent.dispatchEvent(eventToSend);
                // On passe au tour suivant
                this.game.tourSuivant();
            });
        });
    }

    cleanPossibleMoves() {
        document.querySelectorAll(".case.possibleMove").forEach(elm => {
            elm.classList.remove('possibleMove');
            elm.classList.remove('take');
            const clone = elm.cloneNode(true);
            elm.replaceWith(clone);
        });
    }

    removePawn(coord) {
        const caseOfPawn = document.getElementById("case" + coord.x + coord.y);
        caseOfPawn.removeChild(caseOfPawn.lastChild);
    }

    movePawn(pion, move) {
        const caseSource = document.getElementById("case" + move.ancienneCase.x + move.ancienneCase.y);
        // On supprime tous les mouvements possibles actuellement affichés
        this.cleanPossibleMoves();
        // On supprime le pion de sa case de départ
        caseSource.removeChild(caseSource.lastChild);
        if (!!move.casePionAPrendre) {
            this.removePawn(move.casePionAPrendre);
        }
        // On affiche le pion sur sa case de destination
        this.renderPawn(pion);
    }
}