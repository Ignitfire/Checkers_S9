export function showGame(game) {
    showDamier();
    showAllPawns(game);
}

export function showDamier() {
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
    document.body.appendChild(damier);
}

export function showAllPawns(game) {
    showPawnsOfPlayer(game.Joueur1);
    showPawnsOfPlayer(game.Joueur2);
}

export function showPawnsOfPlayer(joueur) {
    joueur.pions.forEach(p => {
        showPawn(p);
    });
}

/**
 * On supprime tous les mouvements possibles actuellement affichés
 */
export function cleanPossibleMoves()
{
    document.querySelectorAll(".case.possibleMove").forEach(elm => {
        elm.classList.remove('possibleMove');
        elm.classList.remove('take');
        const clone = elm.cloneNode(true);
        elm.replaceWith(clone);
    });
}

export function showPossibleMoves(possibleMoves) {
    possibleMoves.forEach(move => {
        const caseSource = document.getElementById("case" + move.pawn.c.x + move.pawn.c.y);
        const caseDestination = document.getElementById("case" + move.destination.x + move.destination.y);
        caseDestination.classList.add("possibleMove");
        if (move.type === "take") {
            caseDestination.classList.add("take");
        }
        caseDestination.addEventListener("click", () => {
            cleanPossibleMoves(); // On supprime tous les mouvements possibles actuellement affichés
            if (move.type === "take") {
                removePawn(move.pawnToTake); // On supprime le pion pris
            }
            move.execute();
            caseSource.removeChild(caseSource.lastChild); // On supprime le pion de sa case de départ
            showPawn(move.pawn); // On affiche le pion sur sa case de destination
        });
    });
}

export function showPawn(pawn) {
    const pion = document.createElement("div");
    pion.id = "pion"+pawn.c.x+pawn.c.y;
    pion.classList.add("pion");
    pion.classList.add(pawn.color);
    if (pawn.level === 1) {
        const dame = document.createElement("div");
        dame.classList.add("dame");
        dame.textContent = "D";
        pion.appendChild(dame);
    }
    pion.addEventListener("click", () => {
        cleanPossibleMoves(); // On supprime tous les mouvements possibles actuellement affichés
        showPossibleMoves(pawn.getPossibleMoves());
    });
    const casePion = document.getElementById("case" + pawn.c.x + pawn.c.y);
    casePion.appendChild(pion);
}

export function removePawn(pawn) {
    const caseOfPawn = document.getElementById("case" + pawn.c.x + pawn.c.y);
    caseOfPawn.removeChild(caseOfPawn.lastChild);
}