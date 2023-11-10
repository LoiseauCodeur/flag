/**************
 *	On ajoute un évènement "lorsque l'arborescence DOM est chargée".
 *   Ainsi, nous sommes certains de manipuler des élements
 *	chargés et existants dans notre DOM.
 **************/
document.addEventListener("DOMContentLoaded", function () {
  // La fonction init() est apppelée lorsque le DOM est prêt
  function init() {
    // fetch() est ici mis pour faire une requête HTTP à l'API des pays
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json()) // La réponse est convertie en JSON
      .then((data) => {
        const randomData = getRandomCountry(data); // Un pays choisit aléatoirement est récupérer
        const randomFlag = randomData.flag; // Le drapeau du pays choisit aléatoirement est récupérer
        const countryName = randomData.name; // Le nom du pays choisit aléatoirement est récupérer
        const drapeau = document.getElementById("drapeau");
        // On fait appele ici à l'élement ayant comme id "drapeau"
        drapeau.setAttribute("src", randomFlag);
        // L'attribut "src" de l'élément "drapeau" est difini sur l'URL du drapeau
        quizz(countryName);
        // La fonction quizz() est appellée avec le nom du pays en argument
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error); // Les erreurs ici s'afficheront dans la console
      });

    // La constante quizz() est définie ici pour gérer la fonction devinettes du jeu
    const quizz = (bonneReponse) => {
      const input = document.querySelector("#okInput"); // On fait appele ici à l'élement ayant comme id "okInput"
      const okButton = document.querySelector("#okButton"); // On fait appele ici à l'élement ayant comme id "okButton"

      // L'événement est lier à l'input. Lorsque la touche "Enter" est appuiyer,
      // la fonction de vérification est appelée avec la valeur de l'input comme argument.
      okButton.addEventListener("click", () => {
        verification(capitalize(input.value));
        // console.log("byutoon");
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          verification(capitalize(input.value));
        }
      });

      console.log(bonneReponse);
      // La fonction ici est mise en place afin de vérifier si la réponse de l'utilisateur est correcte

      let error = document.getElementById('drapeau');// Variable error pointant vers l'ément ayant comme ID drapeau
      
      let faute = 0;

      let fl1 = document.getElementById("flag-1");
      let fl2 = document.getElementById("flag-2");
      let fl3 = document.getElementById("flag-3");

      const verification = (reponse) => {
        if (reponse == bonneReponse) {
          alert("gagné");
          init();
        }else{
          faute++
          error.classList.add("error", "border-red-800");
          error.classList.remove("border-secondary");
          setTimeout(() => {
            error.classList.remove("border-red-800", "error");
            error.classList.add("border-secondary");
          }, 1000);
          console.log(faute);
          if(faute <= 3){
            document.getElementById(`flag-${faute}`).style.opacity = 0.5;
          }else{
            alert("STOP C'EST MORT !!!")
          };
        };
      };
    };

    // function capitalize() est définie pour mettre en majuscule la première lettre d'une chaîne de caractères
    let capitalize = (a) => (a && a[0].toUpperCase() + a.slice(1)) || ""; //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript

    // Function permettant de sélectionner un pays aléatoirement à partir des données
    function getRandomCountry(data) {
      const randomCountryIndex = Math.floor(Math.random() * data.length);
      // Un index est générer aléatoirement
      const randomCountry = data[randomCountryIndex];
      // Un pays est sélectionné à partir des données
      const randomFlag = randomCountry.flags.png;
      const nameCountry = randomCountry.translations.fra.common;
      return { country: randomCountry, flag: randomFlag, name: nameCountry };
    }
  }
  init(); // La fonction init est appelée.
});
