export class Modal {
    constructor(id, content) {
        this.id = id;
        this.initModal(content);
    }

    initModal(content) {
        // Création de la modal
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.id = this.id;

        // Création du contenu de la modal
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("button-container");

        modalContent.appendChild(content);
        modalContent.appendChild(buttonsContainer);

        modal.appendChild(modalContent);
        document.querySelector('body').appendChild(modal);
    }

    renderModal() {
        const modal = document.getElementById(this.id);
        if (modal) {
            // Rend visible la modal
            modal.classList.add('show');
        }
    }

    hideModal() {
        const modal = document.getElementById(this.id);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    createButton(id) {
        const button = document.createElement("button");
        button.id = id;
        button.classList.add("modal-button");
    }
}