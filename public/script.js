/**************
 *	On ajoute un évènement "lorsque l'arborescence DOM est chargée".
 *   Ainsi, nous sommes certains de manipuler des élements
 *	chargés et existants dans notre DOM.
 **************/
document.addEventListener("DOMContentLoaded", function () {
  let bonneReponse;
  let input;
  function getRandomCountry(data) {
    const randomCountryIndex = Math.floor(Math.random() * data.length);
    const randomCountry = data[randomCountryIndex];
    const randomFlag = randomCountry.flags.png;
    const nameCountry = randomCountry.translations.fra.common;
    return { country: randomCountry, flag: randomFlag, name: nameCountry };
  }

  let loose = document.getElementById("loose");
  let score = document.getElementById("score");

  function init() {
    input = document.querySelector("#okInput");
    loose.style.display = 'none';
    recommencer.addEventListener("click", function () {
      recommencer.classList.add("hidden");
      rate.classList.add("hidden");
      rateReponse.classList.remove("hidden");
      location.reload();
    });

    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then((response) => response.json())
      .then((data) => {
        const randomData = getRandomCountry(data);
        const randomFlag = randomData.flag;
        const countryName = randomData.name;
        const drapeau = document.getElementById("drapeau");
        drapeau.setAttribute("src", randomFlag);
        bonneReponse = countryName;
        quizz();
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }

  function handleInput() {
    let correct = document.getElementById("drapeau");
    let error = document.getElementById("drapeau");
    let question = document.getElementById("question");
    let rep = document.getElementById("champ-rep");

    let faute = 1;
    let points = 0;

    const okButton = document.querySelector("#okButton");

    const verification = (reponse) => {
      console.log(reponse, bonneReponse);
      if (transform(reponse) === transform(bonneReponse)) {
        points++;
        correct.classList.add(
          "border-green-500",
          "shadow-xl",
          "shadow-green-800"
        );
        correct.classList.remove("border-secondary");
        setTimeout(() => {
          correct.classList.remove(
            "border-green-500",
            "shadow-xl",
            "shadow-green-800"
          );
          correct.classList.add("border-secondary");
        }, 1000);
        init();
        rate.classList.add("hidden");
        rateReponse.classList.remove("hidden");
      } else {
        console.log(reponse, bonneReponse);
        console.log(input.value);
        error.classList.add("error", "border-red-800");
        error.classList.remove("border-secondary");
        setTimeout(() => {
          error.classList.remove("border-red-800", "error");
          error.classList.add("border-secondary");
        }, 1000);
        console.log(faute);
        rate.classList.remove("hidden");
        rateReponse.classList.remove("hidden");
        rateReponse.innerHTML = bonneReponse;
        document.getElementById(`flag-${faute}`).style.opacity = 0.5;

        if (faute == 3) {
          faute = 1;
          recommencer.classList.remove("hidden");
          question.style.display = 'none';
          rep.style.display = 'none';
          loose.style.display = 'flex';
          score.innerHTML= points;
        }
        faute++;
      }
      input.value = "";
    };

    okButton.addEventListener("click", () => {
      verification(input.value);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        verification(input.value);
      }
    });
  }

  let transform = (a) => {
    return a
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-/g, "")
      .replace(/ /g, "");
  }; //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript

  const quizz = () => {
    const rate = document.querySelector("#rate");
    const rateReponse = document.querySelector("#rateReponse");

   
    
    console.log(bonneReponse);

    let error = document.getElementById("drapeau");
    let correct = document.getElementById("drapeau");

    let fl1 = document.getElementById("flag-1");
    let fl2 = document.getElementById("flag-2");
    let fl3 = document.getElementById("flag-3");
  };
  init();
  handleInput();
});
