export class ViewPopUp {
    static renderPopUp(content, actionBtn) {
        const popup = document.getElementById("popup");
        const popupContent = document.querySelector("#popup .popup-content");

        while (popupContent.firstChild) {
            popupContent.removeChild(popupContent.lastChild);
        }

        popupContent.appendChild(content);
        popupContent.appendChild(actionBtn);

        // Rend visible la popup
        popup.classList.add('show');

        // Ajout de l'event listener pour fermer la popup
        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                ViewPopUp.hidePopUp();
            }
        });
    }

    static hidePopUp() {
        const popup = document.getElementById('popup');
        popup.classList.remove('show');
    }
}