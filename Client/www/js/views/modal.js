export class Modal {
    constructor(id, content) {
        this.init(id, content);
    }

    init(id, content) {
        this.id = id;
        this.buttons = [];
        this.content = document.createElement('div');
        this.content.id = id;
        this.content.classList.add('modal');

        // Création du contenu de la modal
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("button-container");

        modalContent.appendChild(content);
        modalContent.appendChild(buttonsContainer);
        this.content.appendChild(modalContent);

        document.querySelector('body').appendChild(this.content);
    }

    render() {
        // Rend visible la modal
        this.content.classList.add('show');
    }

    hide() {
        this.content.classList.remove('show');
    }

    addButton(id, label) {
        const button = document.createElement("button");
        button.id = id;
        button.classList.add("modal-button");
        button.innerText = label;

        this.buttons.push({id: id, button: button});

        const buttonsContainer = this.content.querySelector(".button-container");
        buttonsContainer.appendChild(button);
    }

    getButton(id) {
        return this.buttons.find((btn)=> btn.id === id)?.button;
    }
}