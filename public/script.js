




init();


function getRandomFlag(data) {
    const randomCountryIndex = Math.floor(Math.random() * data.length);
    const randomCountry = data[randomCountryIndex];
    const randomFlag = randomCountry.flags.png;
    return randomFlag;
}

        function init() {
            fetch('https://restcountries.com/v3.1/all?fields=flags')
            .then(response => response.json())
                .then(data => {
                    const randomFlag = getRandomFlag(data);
                    const drapeau = document.getElementById('drapeau');
                    drapeau.setAttribute('src', randomFlag);
                })
                .catch(error => {
                    console.error('Une erreur s\'est produite :', error);
                });
        };
