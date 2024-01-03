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

        const casePion = document.getElementById("case" + pawn.c.x + pawn.c.y);
        casePion.appendChild(pion);
    }
}