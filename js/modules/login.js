class loginController {
    static login(match, router) {
        async function loadLoggingIn(loadingScreenContainer, mainLabel) {
            mainLabel.textContent = 'Please wait';
            loadingScreenContainer.style.display = 'block';
            await sleep(1313);
            loadingScreenContainer.style.display = 'none';
            router.navigate('/courses');
        }

        return fetch('/html/login.html')
            .then(response => {
                return response.text();
            })
            .then(data => {
                document.getElementById('body').innerHTML = data;
                const logInButton = document.getElementById('button-lr');
                const googleButton = document.getElementById('google-button');
                const loadingScreenContainer = document.getElementById('loading-screen-container');
                const mainLabel = document.getElementById('loading-screen-main-label');
                logInButton.addEventListener('click', function (event) {
                    const emailField = document.getElementById('email').value;
                    const passwordField = document.getElementById('password').value;
                    event.preventDefault();
                    if (emailField.toLowerCase() === approvedEmail && passwordField === approvedPassword) {
                        router.navigate('/courses');
                    } else {
                        alert('For login use:\nEmail: test@test\nPassword: test\nOR press google button');
                        document.getElementById('wrong-credentials').style.display = 'block';
                    }
                });
                googleButton.addEventListener('click', function () {
                    loadLoggingIn(loadingScreenContainer, mainLabel);
                });
            });
    }
}