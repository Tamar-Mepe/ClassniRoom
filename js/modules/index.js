class indexController {
    static index() {
        async function typeWriter(personNames, personColors, labels, typeOutText, typeOutLine, typeOutLineLabel) {
            while (true) {
                for (let i = 0; i < labels.length; i++) {
                    typeOutLine.style.borderColor = personColors[i];
                    typeOutLineLabel.textContent = personNames[i];
                    typeOutLineLabel.style.backgroundColor = personColors[i];
                    for (let j = 0; j < labels[i].length; j++) {
                        typeOutText.textContent += labels[i][j];
                        await sleep(100);
                    }
                    await sleep(2000);
                    typeOutText.textContent = "";
                }
            }
        }

        function removeWhiteBackground() {
            document.getElementById('white-background').style.display = 'none';
        }

        return fetch('/html/index.html')
            .then(response => {
                return response.text();
            })
            .then(data => {
                document.getElementById('body').innerHTML = data;
                document.fonts.ready.then(function () {
                    removeWhiteBackground();

                    const personNames = ['Pam', 'Kim', 'Tom'];
                    const personColors = ['#00a3bd', '#f4b400', '#cc1470'];
                    const labels = ['informative', 'inspiring', 'helpful'];

                    const typeOutText = document.getElementById('type-out-line-text');
                    const typeOutLine = document.querySelector('.type-out-line');
                    const typeOutLineLabel = document.getElementById('type-out-line-label');

                    typeWriter(personNames, personColors, labels, typeOutText, typeOutLine, typeOutLineLabel);
                })
            })
    }
}
