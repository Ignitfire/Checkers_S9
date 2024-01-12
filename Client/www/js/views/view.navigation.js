import { ViewPopUp } from "./view.Popup.js";

// permet l'affichage des boutons de navigation
export class ViewNavigation {
    navigation;
    constructor(socket, currentPlayer, opponentUser, gameView) {
        this.renderNavigations(socket, currentPlayer, opponentUser, gameView);
    }

    renderNavigations(socket, currentPlayer, opponentUser, gameView) {
        //check if navigations already exist
        if (!document.querySelector('.navigation')) {
            // Ajout de navigation dans le DOM
            this.navigation = document.createElement('div');
            this.navigation.classList.add('navigation');
            // Ajout du bouton abandonner dans le DOM
            const forfeitButton = document.createElement('button');
            forfeitButton.classList.add('forfeit-button', 'nav-button');
            forfeitButton.textContent = 'Abandonner';
            forfeitButton.addEventListener('click', () => {
                socket.emit("forfait");
                // On informe le joueur qu'il a gagné la partie à cause de la deconnexion de son adversaire
                gameView.renderGameOver(currentPlayer.name, socket, "Vous avez abandonné la partie");
            });
            this.navigation.appendChild(forfeitButton);
            // Ajout du bouton classement dans le DOM
            const rankingButton = document.createElement('button');
            rankingButton.classList.add('ranking-button', 'nav-button');
            rankingButton.textContent = 'Classement';
            rankingButton.addEventListener('click', () => {
                socket.emit("score");
            });
            this.navigation.appendChild(rankingButton);
            // Ajout du bouton Aide dans le DOM
            const helpButton = document.createElement('button');
            helpButton.classList.add('help-button', 'nav-button');
            helpButton.textContent = 'Aide';
            //au clic ouvre une fenetre modale avec les regles du jeu
            helpButton.addEventListener('click', () => {
                //TODO ecrire les vrais règles du jeu
                let rules = 'Le jeu de dames se joue sur un plateau de 100 cases, alternativement claires et sombres, disposées en damier. Chaque joueur dispose de 20 pions. Les pions se déplacent d\'une case en diagonale vers l\'avant. Les prises se font en prenant un pion adverse par saut par dessus la case voisine, vers l\'avant, en diagonale. Les pions peuvent prendre en avant et en arrière. Les pions peuvent prendre plusieurs pions en un seul coup. Les pions peuvent prendre les pions adverses qui sont sur une case voisine. Les pions peuvent prendre les pions adverses qui sont sur une case voisine. Les pions peuvent prendre les pions adverses qui sont sur une case voisine. Les pions peuvent prendre les pions adverses qui sont sur une case voisine. Les pions peuvent prendre les pions adverses qui sont sur une case voisine. Les pions peuvent prendre les pions adverses qui sont sur une case voisine.';
                let ruleContainer = document.createElement('div');
                ruleContainer.classList.add('rule-container');
                ruleContainer.textContent = rules;
                ViewPopUp.renderPopUp(ruleContainer, document.createElement("div"));
            });
            this.navigation.appendChild(helpButton);
            // Ajout du bouton historique dans le DOM
            const historyButton = document.createElement('button');
            historyButton.classList.add('history-button', 'nav-button');
            historyButton.textContent = 'Historique';
            // recupere les parties jouées par le joueur depuis le serveur et les affiche dans une fenetre modale
            historyButton.addEventListener('click', () => {
                socket.emit("historique", currentPlayer.name);
            });
            this.navigation.appendChild(historyButton);
            document.querySelector('#main').appendChild(this.navigation);
        }
    }
}