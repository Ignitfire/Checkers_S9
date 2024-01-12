import { ViewPopUp } from "./view.Popup.js";

// pemret de voir l'historique des parties
export class ViewHistorique {
    constructor(history) {
        this.renderHistory(history);
    }

    renderHistory(history) {
        const table = this.createScoreTable(history);
        // TODO : ajouter les boutons d'action

        // Affichage de la popup
        ViewPopUp.renderPopUp(table, document.createElement("div"));
    }

    //TODO trier tableau par nbVictoires
    createScoreTable(history) {
        const arr = [
            {
                header: "Joueur1",
                data: "joueur1"
            },{
                header: "Joueur2",
                data: "joueur2"
            },
             {
                header: "gagnant",
                data: "gagnant"
            }, {
                header: "Date de la partie",
                data: "datePartie"
            }
        ];

        // Création d'un tableau des history
        const table = document.createElement("table");
        table.classList.add("history-table");

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
        for (let i = 0; i < history.length; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < arr.length; j++) {
                const cell = document.createElement("td");
                cell.innerText = history[i][arr[j].data];
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