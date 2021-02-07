export class loginController {
    static login() {
        async function loadLoggingIn(loadingScreenContainer) {
            loadingScreenContainer.style.display = 'block';
            await sleep(2000);
            loadingScreenContainer.style.display = 'none';
            window.location.href = '/courses';
        }

        fetch('/html/login.html')
            .then(response => {
                return response.text();
            })
            .then(data => {
                document.getElementById('body').innerHTML = data;
                const logInButton = document.getElementById('button-lr');
                const googleButton = document.getElementById('google-button');
                const loadingScreenContainer = document.getElementById('loading-screen-container');
                logInButton.addEventListener('click', function (event) {
                    const emailField = document.getElementById('email').value;
                    const passwordField = document.getElementById('password').value;
                    event.preventDefault();
                    if (emailField.toLowerCase() === approvedEmail && passwordField === approvedPassword)
                        window.location.href = '/courses';
                    else {
                        alert('For login use:\nEmail: test@test\nPassword: test\nOR press google button');
                        document.getElementById('wrong-credentials').style.display = 'block';
                    }
                });
                googleButton.addEventListener('click', function () {
                    loadLoggingIn(loadingScreenContainer);
                });
            });
    }
}