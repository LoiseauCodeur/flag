

document.addEventListener('DOMContentLoaded', function () {
    function init() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const randomData = getRandomCountry(data); 
                const randomCountry = randomData.country;
                const randomFlag = randomData.flag;
                const drapeau = document.getElementById('drapeau');
                drapeau.setAttribute('src', randomFlag);
                console.log(randomCountry.translations.fra.common);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite :', error);
            });
    }
    
    function getRandomCountry(data) {
        const randomCountryIndex = Math.floor(Math.random() * data.length);
        const randomCountry = data[randomCountryIndex];
        const randomFlag = randomCountry.flags.png;
        return { country: randomCountry, flag: randomFlag };
    }
    init();
});
