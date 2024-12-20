import { cssCards, htmlCards, jsCards } from './cardData.js';

// load cards to localstorage

function cssCardsLoad(){
    cssCards;
      
    localStorage.setItem(`cardStorageCSS`, JSON.stringify(cssCards));
/*         const cardLoadContent = document.querySelector('.cardLoadContent');
      cardLoadContent.innerHTML = ` <h4>Laden der CSS-Daten abgeschlossen</h4>
      Es wurden CSS Karteikarten in den Localstorage geladen!`; */

      console.log('cssCardsLoad wurder erfolgreich abgeschlossen!')
}

function htmlCardsLoad(){
      htmlCards;
      console.log(htmlCards)
      localStorage.setItem(`cardStorageHTML`, JSON.stringify(htmlCards));
/*           const cardLoadContent = document.querySelector('.cardLoadContent');
      cardLoadContent.innerHTML = ` <h4>Laden der HTML-Daten abgeschlossen</h4>
      Es wurden HTML Karteikarten in den Localstorage geladen!`; */
}

function jsCardsLoad(){

    jsCards;
    /* const cardLoadContent = document.querySelector('.cardLoadContent'); */
    localStorage.setItem(`cardStorageJS`, JSON.stringify(jsCards)); 
    /* cardLoadContent.innerHTML = ` <h4>Laden der HTML-Daten abgeschlossen</h4>
    Es wurden JavaScript Karteikarten in den Localstorage geladen!`; */
}

function allCardsLoad(){
    let allCards = ({...cssCards, ...jsCards, ...htmlCards});// Spread-Operator 
    console.log(allCards)
    localStorage.setItem(`cardStorageAll`, JSON.stringify(allCards));
    
}

function badCardsLoad() {
    const badCardsList = JSON.parse(localStorage.getItem('badCards')) || [];
    console.log(badCardsList)
    
}


let cardStorage = JSON.parse(localStorage.getItem('cardStorage')) || {};/* localStorage - speichert die neuen Vokabeln 
parse heißt Textumwandeln in das Format was ich brauche zwei striche heißen oder.. alternative!*/
/* lehrnt eigenständig die neuen Vokabeln, Startpunkt ist {}*/
let randomNextCard; 


const frontSide = document.querySelector('.front');




function addNewCard() {
    cardStorage[frage.value] = antwort.value; /* germanText.value = es wird auf das treffende Wort zugegriffen */

    frage.value = '';
    antwort.value = '';
    console.log(cardStorage)
    localStorage.setItem(`cardStorage`, JSON.stringify(cardStorage));
    console.log(`cardStorage`, JSON.stringify(cardStorage))
    render();
   

    
}

function render() {
    cardList.innerHTML = '';

    for (let key in cardStorage) { /* Ich greife auf die Objekte zu */
        cardList.innerHTML += `<li>${key} - ${cardStorage[key]}</li>`;
    }

    
}



let currentCardStorageKey = '';  // Variable für den aktuellen StorageKey
let currentCardStorage = {};     // Objekt, das die geladenen Daten enthält
let currentCardIndex = -1;       // Index der aktuellen Karte


// Funktion zur Anzeige der Karten
function nextCard(storageKey, frontSideSelector) {
    console.log("Lade Karten mit Schlüssel:", storageKey); // Debugging-Ausgabe
    const cardStorage = JSON.parse(localStorage.getItem(storageKey));

    ifBadCard(storageKey);

    // Aktuelle Daten im globalen Bereich speichern
    currentCardStorageKey = storageKey;
    currentCardStorage = cardStorage;
    currentCardIndex = -1;  // Starten beim Anfang der Liste
    

    // Zeige die erste Karte
    showNextCard(frontSideSelector);
}
let checked = false;
document.getElementById('badCard').addEventListener('click', () => {
    
    if (!checked){

        console.log('checkboxchecked');
    } else {
    console.log('unchecked');
}
checked = !checked
}

)
function ifBadCard(storageKey){
        // wenn es badCards sind wird die Checkbox nicht angezeigt!
        if(storageKey === 'badCards'){
            console.log('badCards KEY!!!')
            document.getElementById('spanBadCard').classList.add('hidden');
        } else {
            document.getElementById('spanBadCard').classList.remove('hidden');
        }
        
        if (!cardStorage || Object.keys(cardStorage).length === 0) {
            console.error("cardStorage ist leer oder nicht definiert");
            return;
        }

}


// Funktion zum Zeigen der nächsten Karte
function showNextCard(frontSideSelector) {
    checkboxPrüfen();
    console.log("Zeige nächste Karte..."); // Debugging-Ausgabe

    // Wenn keine Karten vorhanden sind, abbrechen
    if (!currentCardStorage || Object.keys(currentCardStorage).length === 0) {
        console.error("Es sind keine Karten vorhanden.");
        return;
    }

    // Berechne den nächsten Index
    const obj_keys = Object.keys(currentCardStorage);
    const randomNextCard = obj_keys[Math.floor(Math.random() * obj_keys.length)];

    const frontSide = document.querySelector('.front');
    if (!frontSide) {
        
        console.error("Kein Element mit dem angegebenen Selector gefunden:", frontSideSelector);
        return;
    }
    cardQuest = randomNextCard;
    cardAnswer = currentCardStorage[randomNextCard];
  

    console.log("Zeige nächste Karte:", randomNextCard, currentCardStorage[randomNextCard]); // Debugging-Ausgabe
    
    // Aktualisiere die Vorderseite mit der nächsten Karte
    frontSide.innerHTML = randomNextCard;

    // Erstelle das Kartenelement und handle Klicks
    const card = document.querySelector(".card");
    if (card) {
        let showAnswer = false; // Zustand Vorder- oder Rückseite
        card.addEventListener("click", () => {
            if (showAnswer) {
                frontSide.innerHTML = `${randomNextCard}`; // Frage anzeigen
            } else {
                frontSide.innerHTML = `${currentCardStorage[randomNextCard]}`; // Antwort anzeigen
            }
            showAnswer = !showAnswer;
        });
    }
    console.log(cardQuest, cardAnswer)
}

let cardQuest = null;
let cardAnswer = null;
console.log(cardQuest, cardAnswer)

function checkboxPrüfen(){

       // Speichern der Karte, falls sie schwierig ist (nach vorherigem Setzen des Indexes und Front)
       if (checked) {
           // Speichern der vorherigen Karte als "bad card"
           badCardsSave(cardQuest, cardAnswer);
           checked = !checked;
           document.getElementById('badCard').checked = false;

       }
}


// Sicherstellen, dass die Daten korrekt aus dem LocalStorage geladen werden
// Event-Listener für die Buttons hinzufügen
document.getElementById("htmlButton").addEventListener("click", () => {
    let storedData = localStorage.getItem('cardStorageHTML');
    
    console.log("HTML Button geklickt - storedData:", storedData); // Debugging-Ausgabe
    if (storedData === null) {
        htmlCardsLoad(); // Diese Funktion wird nur aufgerufen, wenn kein Wert im localStorage vorhanden ist
        storedData = localStorage.getItem('cardStorageHTML');
    }

    if (storedData) {
        document.querySelector("#message").classList.remove("show");
        colorChange('html');
        nextCard('cardStorageHTML', ".front");  // rufe nextCard mit dem richtigen Schlüssel auf
    } else {
        console.log("Keine gespeicherten HTML-Daten gefunden.");
    }
});

document.getElementById("cssButton").addEventListener("click", () => {
    
    let storedData = localStorage.getItem('cardStorageCSS');
    console.log("CSS Button geklickt - storedData:", storedData); // Debugging-Ausgabe
    if (storedData === null) {
        cssCardsLoad(); // Diese Funktion wird nur aufgerufen, wenn kein Wert im localStorage vorhanden ist
        storedData = localStorage.getItem('cardStorageCSS');
    }
    console.log(storedData);
    

    if (storedData) {
        document.querySelector("#message").classList.remove("show");
        colorChange('css');
        nextCard('cardStorageCSS', ".front");
    } else {
        console.log("Keine gespeicherten CSS-Daten gefunden.");
    }
});

document.getElementById("jsButton").addEventListener("click", () => {
    let storedData = localStorage.getItem('cardStorageJS');
    console.log("JS Button geklickt - storedData:", storedData); // Debugging-Ausgabe
    if (storedData === null) {
        jsCardsLoad(); // Diese Funktion wird nur aufgerufen, wenn kein Wert im localStorage vorhanden ist
        storedData = localStorage.getItem('cardStorageJS');
    }

    if (storedData) {
        document.querySelector("#message").classList.remove("show");
        colorChange('js');
        nextCard('cardStorageJS', ".front");
    } else {
        console.log("Keine gespeicherten JS-Daten gefunden.");
    }
});


document.getElementById("allButton").addEventListener("click", () => {
    allCardsLoad();
    const storedData = localStorage.getItem('cardStorageAll');
    console.log("JS Button geklickt - storedData:", storedData); // Debugging-Ausgabe

    if (storedData) {
        document.querySelector("#message").classList.remove("show");
        colorChange('allCards');
        nextCard('cardStorageAll', ".front");
    } else {
        console.log("Keine gespeicherten JS-Daten gefunden.");
    }
});

document.getElementById("badCards").addEventListener("click", () => {
  badCardsLoad();
  const storedData = localStorage.getItem("badCards");
  console.log("badCards Button geklickt - storedData:", storedData); // Debugging-Ausgabe

  if (storedData) {

    colorChange('badCards');
    nextCard("badCards", ".front");
  } else {
    console.log("Keine gespeicherten badCards-Daten gefunden.");
    document.querySelector('.front').innerHTML = '';
    document.querySelector("#message").classList.add("show");


    // Verstecke die Nachricht nach 3 Sekunden
    setTimeout(function () {
      document.querySelector("#message").classList.remove("show");
    }, 7000); // 3000ms = 3 Sekunden
  }
});
// Event-Listener für den Button "Nächste Karte"
document.getElementById("nextCardButton").addEventListener("click", () => {
  console.log("Nächste Karte Button geklickt"); // Debugging-Ausgabe
  if (
    currentCardStorageKey &&
    currentCardStorage &&
    Object.keys(currentCardStorage).length > 0
  ) {
    console.log("Nächste Karte wird angezeigt mit Schlüssel:", currentCardStorageKey); // Debugging-Ausgabe
    showNextCard(currentCardStorageKey, ".front");
  } else {
    console.error("Keine Karten geladen. Bitte wähle zuerst eine Karte.");
    // Zeige die Nachricht an
    
    document.querySelector("#message").classList.add("show");

    // Verstecke die Nachricht nach 3 Sekunden
    setTimeout(function () {
      document.querySelector("#message").classList.remove("show");
    }, 10000); // 
  }
});

function colorChange(cardType) {
    const cardElement = document.querySelector('.card');

    // Überprüfen, ob das Element existiert
    if (!cardElement) {
        console.error('Element .card nicht gefunden');
        return; // Funktion beenden, wenn das Element nicht existiert
    }

    // Hintergrund basierend auf cardType setzen
    if (cardType === 'allCards') {
        cardElement.style.backgroundImage = 'var(--card-img-allCards)';
    } else if (cardType === 'html') {
        cardElement.style.backgroundImage = 'var(--card-img-html)';
    } else if (cardType === 'css') {
        cardElement.style.backgroundImage = 'var(--card-img-css)';
    } else if (cardType === 'js') {
        cardElement.style.backgroundImage = 'var(--card-img-js)';
    } else if (cardType === 'badCards') {
        cardElement.style.backgroundImage = 'var(--card-img-badCards)';
    } else {
        console.warn('Unbekannter Wert für cardType:', cardType);
    }
}





    


    
    
    function badCardsSave(randomNextCard, cardValue) {
        console.log(randomNextCard, currentCardStorage[randomNextCard]);
        
        // Lade das bestehende Objekt aus dem localStorage oder initialisiere ein leeres Objekt
        let badCardObject = JSON.parse(localStorage.getItem('badCards')) || {};
    
        // Füge oder aktualisiere den neuen Eintrag im Objekt
        badCardObject[randomNextCard] = cardValue;
    
        // Speichere das aktualisierte Objekt zurück in den localStorage
        localStorage.setItem('badCards', JSON.stringify(badCardObject));
    
        console.log(badCardObject); // Überprüfe die aktualisierte Struktur
    }
    
  