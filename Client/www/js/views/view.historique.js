import { ViewPopUp } from "./view.Popup.js";

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
<<<<<<< HEAD
            }, {
=======
            },{
>>>>>>> df8ca9bb8d06d27df35445835c3e77aba4c96e0d
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

        // Fonction pour formater la date
        const formatDate = (dateString) => {
            const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'};
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', options);
        };

        // Boucle pour créer le contenu du tableau
        const tableBody = document.createElement("tbody");
        for (let i = 0; i < history.length; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < arr.length; j++) {
                const cell = document.createElement("td");
                cell.innerText = arr[j].data === "datePartie" ? formatDate(history[i][arr[j].data]) : history[i][arr[j].data];
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