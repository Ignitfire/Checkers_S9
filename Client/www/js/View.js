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

export function showPions(pions) {
    pions.forEach(p => {
        let pion = p.getRender();
        let casePion = document.getElementById("case" + p.position.x + p.position.y);
        casePion.appendChild(pion);
    });
}

export function cleanPossibleMoves() {
    document.querySelectorAll(".case.possibleMove").forEach(e => {
        e.classList.remove("possibleMove");

        // En clonant le noeud, on supprime tous les Eventlistener sur celui-ci
        let clone = e.cloneNode(true);
        e.replaceWith(clone);
    });
}

export function showPossibleMoves(possibleMoves) {
    possibleMoves.forEach(move => {
        let caseMove = document.getElementById("case" + move.destination.x + move.destination.y);
        caseMove.classList.add("possibleMove");
        caseMove.addEventListener("click", () => {
            // TODO : Déplacement du pion selon le move associé
            cleanPossibleMoves();
            move.pawn.player.executeMove(move);
        });
    });
}

export function movePawn(pawn, destination) {
    let casePion = document.getElementById("case" + pawn.position.x + pawn.position.y);
    casePion.removeChild(casePion.lastChild);
    pawn.position = destination;
    let caseDestination = document.getElementById("case" + destination.x + destination.y);
    let pion = pawn.getRender();
    caseDestination.appendChild(pion);
}

export function removePawn(pawn) {
    let pion = document.getElementById("pion" + pawn.position.x + pawn.position.y);
    let casePion = document.getElementById("case" + pawn.position.x + pawn.position.y);
    casePion.removeChild(pion);
}