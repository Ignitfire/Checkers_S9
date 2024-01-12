import { ViewPopUp } from "./view.Popup.js";

// permet de voir le classement des joueurs
export class ViewScore {
    constructor(scores) {
        this.renderScore(scores);
    }

    renderScore(scores) {
        const table = this.createScoreTable(scores);
        // TODO : ajouter les boutons d'action

        // Affichage de la popup
        ViewPopUp.renderPopUp(table, document.createElement("div"));
    }

    //TODO trier tableau par nbVictoires
    createScoreTable(scores) {
        const arr = [
            {
                header: "Joueur",
                data: "username"
            }, {
                header: "Parties jouées",
                data: "nbParties"
            }, {
                header: "Parties gagnées",
                data: "nbVictoires"
            }
        ];

        // Création d'un tableau des scores
        const table = document.createElement("table");
        table.classList.add("score-table");

        const tableHeader = document.createElement("thead");
        const firstRow = document.createElement("tr");

        // Boucle pour créer le header du tableau
        for (let i = 0; i < arr.length; i++) {
            const cell = document.createElement("th");
            cell.innerText = arr[i].header;
            firstRow.appendChild(cell);
        }
        tableHeader.append(firstRow);

        // Boucle pour créer le contenu du tableau
        const tableBody = document.createElement("tbody");
        for (let i = 0; i < scores.length; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < arr.length; j++) {
                const cell = document.createElement("td");
                cell.innerText = scores[i][arr[j].data];
                row.appendChild(cell);
            }

            tableBody.appendChild(row);
        }

        // Ajouter le header et le body au tableau
        table.appendChild(tableHeader);
        table.appendChild(tableBody);
        return table;
    }
}