
// permet de gérer l'affichage du formulaire de connexion
export class ViewLoginForm {
    constructor() {
        this.initForm();
        this.initWaitingScreen();
        this.renderForm();
    }

    initForm() {
        // Create form element
        const form = document.createElement('form');
        form.id = 'loginForm';

        const errorParagraph = document.createElement('p');
        errorParagraph.id = 'errorMessage';

        // Create fieldset
        const fieldset = document.createElement('fieldset');

        // Create username input
        const usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username:';
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.name = 'username';
        usernameInput.required = true;

        // Create password input
        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Password:';
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.name = 'password';
        passwordInput.required = true;

        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Login';

        // Append elements to fieldset
        fieldset.appendChild(usernameLabel);
        fieldset.appendChild(usernameInput);
        fieldset.appendChild(document.createElement('br')); // Line break
        fieldset.appendChild(passwordLabel);
        fieldset.appendChild(passwordInput);
        fieldset.appendChild(document.createElement('br')); // Line break
        fieldset.appendChild(submitButton);

        // Append elements to the form
        form.appendChild(fieldset);

        this.form = form;
        this.usernameInput = usernameInput;
        this.passwordInput = passwordInput;
    }

    renderForm() {
        const mainDiv = document.getElementById('main');
        mainDiv.appendChild(this.form);
        mainDiv.classList.add("loginForm");
    }

    initWaitingScreen() {
        const div = document.createElement('div');
        div.id = 'spinnerContainer';
        div.innerHTML = `
        <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
           <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
        <p>En attente de joueurs...</p>
        `;

        this.waitingScreen = div;
    }

    renderWaitingScreen() {
        const mainDiv = document.getElementById('main');

        // Si le damier est présent, on clear l'entièreté de la mainDiv (cas où le joueur en fin de partie veut rejouer)
        if (document.getElementById('damier')) {
            while(mainDiv.firstChild) {
                mainDiv.removeChild(mainDiv.lastChild);
            }
        }

        mainDiv.classList.add('waitingScreen');
        mainDiv.appendChild(this.waitingScreen);

        // On désactive tous les éléments du fieldset
        const fieldset = this.form.getElementsByTagName('fieldset')[0];
        fieldset.disabled = true;
    }

    clearRender() {
        const mainDiv = document.getElementById("main");
        const loginForm = document.getElementById("loginForm");
        const waitingScreen = document.getElementById("spinnerContainer");

        if (loginForm) {
            mainDiv.removeChild(loginForm);
            mainDiv.classList.remove('loginForm');
        }

        if (waitingScreen) {
            mainDiv.removeChild(waitingScreen);
            mainDiv.classList.remove('waitingScreen');
        }
    }

    getUser() {
        return {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        };
    }

    renderError(errorMessage) {
        document.getElementById('errorMessage').innerText = errorMessage;
    }
}