document.addEventListener("DOMContentLoaded", function () {
  function init() {
    fetch("https://restcountries.com/v3.1/all")
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
      const verification = (reponse) => {
        if (reponse == bonneReponse) {
          alert("gagné");
        } else {
          alert("NUL !");
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
