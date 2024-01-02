export class ViewLoginForm {
    constructor() {
        this.initForm();
        this.initFormEvent();
        this.renderForm();
    }

    initForm() {
        // Create form element
        const form = document.createElement('form');
        form.id = 'loginForm';

        form.innerHTML = `
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required><br>
          <button type="submit">Login</button>
          <p id="loginMessage"></p>
        `;

        this.form = form;
    }

    initFormEvent() {
        this.form.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Get username and password element
            const usernameInput = document.getElementById("username");
            const passwordInput = document.getElementById("password");

            // Get username and password values
            const username = usernameInput.value;
            const password = passwordInput.value;

            // Perform login validation or other actions here
            // This is where you would typically make a request to your server for authentication

            // For example, you can log the input values to the console for demonstration purposes
            console.log('Username:', username);
            console.log('Password:', password);

            // Clear input fields after submission
            usernameInput.value = '';
            passwordInput.value = '';
        });
    }

    renderForm() {
        document.getElementById('main').appendChild(this.form);
    }
}