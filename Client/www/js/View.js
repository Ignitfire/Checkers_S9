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
        let pion = p.getRender();
        let casePion = document.getElementById("case" + p.c.x + p.c.y);
        casePion.appendChild(pion);
    });
}

export function showPossibleMoves(possibleMoves) {
    possibleMoves.forEach(move => {
        let caseMove = document.getElementById("case" + move.destination.x + move.destination.y);
        caseMove.classList.add("possibleMove");
        caseMove.addEventListener("click", () => {
            move.execute();
            movePawn(move.pawn, move.destination);
        });
    });
}

export function movePawn(source, destination) {
    let casePion = document.getElementById("case" + source.x + source.y);
    casePion.removeChild(casePion.lastChild);
    let caseDestination = document.getElementById("case" + destination.x + destination.y);
    let pion = pawn.getRender();
    caseDestination.appendChild(pion);
}

export function removePawn(pawn) {
    let pion = document.getElementById("pion" + pawn.c.x + pawn.c.y);
    let casePion = document.getElementById("case" + pawn.c.x + pawn.c.y);
    casePion.removeChild(pion);
}