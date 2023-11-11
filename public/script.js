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
    // Un index est générer aléatoirement
    const randomCountry = data[randomCountryIndex];
    // Un pays est sélectionné à partir des données
    const randomFlag = randomCountry.flags.png;
    const nameCountry = randomCountry.translations.fra.common;
    return { country: randomCountry, flag: randomFlag, name: nameCountry };
  }


  function init() {
    input = document.querySelector("#okInput");

    recommencer.addEventListener('click', function () {
      recommencer.classList.add('hidden');
      faute = 0;
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
    let correct = document.getElementById('drapeau');
    let error = document.getElementById('drapeau'); 

    let faute = 1
  
    const okButton = document.querySelector("#okButton");
  
    const verification = (reponse) => {
      console.log(reponse, bonneReponse)
      if (reponse.trim() === bonneReponse.trim()) {
        correct.classList.add("border-green-500", "shadow-xl", "shadow-green-800");
        correct.classList.remove("border-secondary");
        setTimeout(() => {
          correct.classList.remove("border-green-500","shadow-xl", "shadow-green-800");
          correct.classList.add("border-secondary");
        }, 1000);
        init();          
      } else {
        document.getElementById(`flag-${faute}`).style.opacity = 0.5;
        console.log(reponse, bonneReponse)
        console.log(input.value)
        error.classList.add("error", "border-red-800");
        error.classList.remove("border-secondary");
        setTimeout(() => {
          error.classList.remove("border-red-800", "error");
          error.classList.add("border-secondary");
        }, 1000);
        console.log(faute);
        
        if(faute == 3){
          faute = 1
          recommencer.classList.remove('hidden'); // Afficher le bouton "Recommencer"
          for (let i = 0; i <= 3; i++) {
            document.querySelectorAll(`#flag-${i}`).forEach(flag => flag.style.opacity = 1);
          }
        };
        faute++

      };
      input.value = "";
    };
  
    okButton.addEventListener("click", () => {
      let reponse = input.value;
      verification(capitalize(reponse));
    });
  
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        let reponse = input.value;
        verification(capitalize(reponse));
      }
    });
  }
  
  

  let capitalize = (a) => (a && a[0].toUpperCase() + a.slice(1)) || ""; //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript

  const quizz = () => {
    const okButton = document.querySelector("#okButton"); // On fait appele ici à l'élement ayant comme id "okButton"

    const verification = (reponse) => {
      console.log(reponse, bonneReponse)
      if (reponse.trim() === bonneReponse.trim()) {
        correct.classList.add("border-green-500", "shadow-xl", "shadow-green-800");
        correct.classList.remove("border-secondary");
        setTimeout(() => {
          correct.classList.remove("border-green-500","shadow-xl", "shadow-green-800");
          correct.classList.add("border-secondary");
        }, 1000);
        init();          
      }else{
        console.log(reponse, bonneReponse)
        console.log(input.value)
        alert('test')
        error.classList.add("error", "border-red-800");
        error.classList.remove("border-secondary");
        setTimeout(() => {
          error.classList.remove("border-red-800", "error");
          error.classList.add("border-secondary");
        }, 1000);
        faute++
        console.log(faute);
        
        if(faute == 3){
          document.getElementById(`flag-${faute}`).style.opacity = 0.5;
        
          faute = 0
          recommencer.classList.remove('hidden'); // Afficher le bouton "Recommencer"
        };
      };
      
    };
    // L'événement est lier à l'input. Lorsque la touche "Enter" est appuiyer,
    // la fonction de vérification est appelée avec la valeur de l'input comme argument.

  
    

    console.log(bonneReponse);

    // La fonction ici est mise en place afin de vérifier si la réponse de l'utilisateur est correcte

    let error = document.getElementById('drapeau');// Variable error pointant vers l'ément ayant comme ID drapeau
    let correct = document.getElementById('drapeau');
    
    let faute = 0;

    let fl1 = document.getElementById("flag-1");
    let fl2 = document.getElementById("flag-2");
    let fl3 = document.getElementById("flag-3");


    
  };
  init();
  handleInput();
});
