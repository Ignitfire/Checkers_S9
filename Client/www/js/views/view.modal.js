export class ViewModal {
    static renderModal(content, actionBtn) {
        const modal = document.getElementById("modal");
        const modalContent = document.querySelector("#modal .modal-content");

        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.lastChild);
        }

        modalContent.appendChild(content);
        modalContent.appendChild(actionBtn);

        // Rend visible la modal
        modal.classList.add('show');
    }

    static hideModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('show');
    }
}