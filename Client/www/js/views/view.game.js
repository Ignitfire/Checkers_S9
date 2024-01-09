import {ViewModal} from "./view.modal.js";

export class ViewGame {
    alphabet = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        5: 'E',
        6: 'F',
        7: 'G',
        8: 'H',
    }
    game;
    mainDiv;
    damier;
    pionContent;
    dameContent;

    constructor(game) {
        this.initGame(game);
        this.initPion()
            .then(this.renderGame.bind(this));
        this.initDame();
    }

    initGame(game) {
        this.game = game;
        this.mainDiv = document.getElementById('main');
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
                td.classList.add("case");
                if (i === 0 || i === 9) {
                    td.classList.add('border');
                    td.innerText = j > 0 && j < 9 ? j : '';
                } else {
                    if (j === 0 || j === 9) {
                        td.classList.add('border');
                        td.innerText = this.alphabet[i];
                    } else {
                        td.id = "case" + i + j;
                        (i + j) % 2 === 0 ? td.classList.add("beige") : td.classList.add("brown");
                    }
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        damier.style.display = "block";
        damier.appendChild(table);
        table.appendChild(tbody);
        this.damier = damier;
    }

    initPion() {
        return this.fetchSVG('../../img/svg/pion.svg')
            .then((svgText) => {
                this.pionContent = svgText;
            });
    }

    initDame() {
        return this.fetchSVG('../../img/svg/dame.svg')
            .then((svgText) => {
                this.dameContent = svgText;
            });
    }

    fetchSVG(svgFileUrl) {
        return fetch(svgFileUrl)
            .then(response => response.text())
            .then(svgText => {
                return svgText; // Return the SVG content if needed
            })
            .catch(error => {
                console.error('Error fetching the SVG file:', error);
            });
    }

    renderGame() {
        this.clearGame();
        this.renderInterface();
        this.renderDamier();
        this.renderPawns();
    }

    clearGame() {
        const bandeauHaut = document.getElementById("bandeauhaut");
        const informationDiv = document.getElementById("information");
        const damier = document.getElementById("damier");

        if (bandeauHaut)
            bandeauHaut.remove();

        if (informationDiv)
            informationDiv.remove();

        if (damier)
            damier.remove();
    }

    renderInterface() {
        this.mainDiv.classList.add('game');

        const bandeauHaut = document.createElement('div');
        bandeauHaut.id = 'bandeauhaut';

        this.renderInfoJoueur(this.game.Joueur1, bandeauHaut);
        this.renderInfoJoueur(this.game.Joueur2, bandeauHaut);

        const informationDiv = document.createElement('div');
        informationDiv.id = 'information';
        informationDiv.innerHTML = `C'est à <span class="joueurCourant">` + this.game.joueurQuiJoue.user.name + `</span> de jouer !`;

        this.mainDiv.appendChild(bandeauHaut);
        this.mainDiv.appendChild(informationDiv);
    }

    renderInfoJoueur(joueur, container = null) {
        const joueurDiv = document.createElement('div');
        joueurDiv.id = joueur.user.name;
        joueurDiv.classList.add('joueur');

        const joueurPseudo = document.createElement('span');
        joueurPseudo.classList.add('joueur-pseudo');
        joueurPseudo.innerText = joueur.user.name;

        const joueurCouleur = document.createElement('span');
        joueurCouleur.classList.add('joueur-couleur');
        joueurCouleur.innerText = joueur.color;

        const joueurNbPion = document.createElement('span');
        joueurNbPion.classList.add('joueur-nombre-pion');
        joueurNbPion.innerText = joueur.getPionsRestants();

        joueurDiv.appendChild(joueurPseudo);
        joueurDiv.appendChild(joueurCouleur);
        joueurDiv.appendChild(joueurNbPion);

        !!container ? container.appendChild(joueurDiv) : this.mainDiv.appendChild(joueurDiv);
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
        const pionContent = pawn.level === 1 ? this.dameContent : this.pionContent;
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(pionContent, 'image/svg+xml');
        const pion = svgDocument.documentElement;
        pion.id = "pion" + pawn.c.x + pawn.c.y;
        pion.classList.add(pawn.color);

        if (pawn.level === 1) {
            pion.classList.add("dame");
        } else {
            pion.classList.add("pion");
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
                const eventToSend = new CustomEvent('deplacement-move', {detail: move});
                // On mets la logique du jeu à jour
                const pion = this.game.executeMove(move);
                // On mets l'écran du jeu à jour
                this.movePawn(pion, move);
                // On envoie l'evenement à l'autre joueur
                this.game.deplacementEvent.dispatchEvent(eventToSend);
                // On passe au tour suivant
                this.game.tourSuivant();
                // On refresh l'affichage du joueur qui doit jouer
                this.refreshJoueurQuiJoue();
            });
        });
    }

    refreshJoueurQuiJoue() {
        const informationDiv = document.querySelector('#information .joueurCourant');
        informationDiv.innerText = this.game.joueurQuiJoue.user.name;

        this.refreshInfoJoueur(this.game.Joueur1);
        this.refreshInfoJoueur(this.game.Joueur2);
    }

    refreshInfoJoueur(joueur) {
        const nbPionJoueur = document.querySelector("#" + joueur.user.name + " .joueur-nombre-pion");
        nbPionJoueur.innerText = joueur.getPionsRestants();
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

    renderGameOver(nomJoueur, socket, message) {
        // Création du contenu de la modal
        const contentContainer = document.createElement("div");

        // Titre
        const h1 = document.createElement("h1");
        h1.innerText = 'La partie est terminée';
        contentContainer.appendChild(h1);

        // Si un message provient de l'app
        if (message) {
            const messageContainer = document.createElement("p");
            messageContainer.classList.add("message-container");
            messageContainer.innerText = message;
            contentContainer.appendChild(messageContainer);
        }

        // Création du container de bouton
        const actionBtn = document.createElement("div");
        actionBtn.classList.add("button-container");

        // Création du bouton rejouer
        const rejouerBtn = document.createElement("button");
        rejouerBtn.id = "rejouerBtn";
        rejouerBtn.classList.add("modal-button");
        rejouerBtn.innerText = "Rejouer";
        rejouerBtn.addEventListener("click", () => {
            socket.emit("login", {username: nomJoueur}, 1);
            ViewModal.hideModal();
        });

        // Création du bouton score
        const scoreBtn = rejouerBtn.cloneNode(true);
        scoreBtn.id = "scoreBtn";
        scoreBtn.innerText = "Score";
        scoreBtn.addEventListener("click", () => {
            socket.emit("score");
            ViewModal.hideModal();
        });

        // Création du bouton quitter
        const quitterBtn = rejouerBtn.cloneNode(true);
        quitterBtn.id = "quitterBtn";
        quitterBtn.innerText = "Quitter";
        quitterBtn.addEventListener("click", () => {
            socket.emit("quitter");
            ViewModal.hideModal();
        });

        // On ajoute tous les boutons au container
        actionBtn.appendChild(rejouerBtn);
        actionBtn.appendChild(scoreBtn);
        actionBtn.appendChild(quitterBtn);

        // On affiche la modal
        ViewModal.renderModal(contentContainer, actionBtn);
    }
}