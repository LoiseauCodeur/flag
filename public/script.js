document.addEventListener("DOMContentLoaded", function () {
  function init() {
    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then((response) => response.json())
      .then((data) => {
        const randomData = getRandomCountry(data);
        const randomFlag = randomData.flag;
        const countryName = randomData.name;
        const drapeau = document.getElementById("drapeau");
        drapeau.setAttribute("src", randomFlag);
        quizz(countryName);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });

    const quizz = (bonneReponse) => {
      const input = document.querySelector("#okInput");
      const okButton = document.querySelector("#okButton");

      okButton.addEventListener("click", () => {
        verification(capitalize(input.value));
        console.log("byutoon");
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          verification(capitalize(input.value));
        }
      });
      console.log(bonneReponse);

      let error = document.getElementById('drapeau');
      const verification = (reponse) => {
        if (reponse == bonneReponse) {
          alert("gagné");
          init();
        } else {
          error.classList.add("error", "border-red-800");
          error.classList.remove("border-secondary");
          setTimeout(() => {
            error.classList.remove("border-red-800", "error");
            error.classList.add("border-secondary");
          }, 1000);
        }
      };
    };

    let capitalize = a => (a && a[0].toUpperCase() + a.slice(1)) || "" //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript

    function getRandomCountry(data) {
      const randomCountryIndex = Math.floor(Math.random() * data.length);
      const randomCountry = data[randomCountryIndex];
      const randomFlag = randomCountry.flags.png;
      const nameCountry = randomCountry.translations.fra.common;
      return { country: randomCountry, flag: randomFlag, name : nameCountry };
    }
  }
  init();
});
