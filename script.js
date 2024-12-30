


let randomNextCard; 

if (document.querySelector(`.front`)){
const frontSide = document.querySelector('.front');

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
if (document.getElementById('badCard')){
    document.getElementById('badCard').addEventListener('click', () => {
    
    if (!checked){

        console.log('checkboxchecked');
    } else {
    console.log('unchecked');
}
    
checked = !checked
})};


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
function badCardsLoad() {
    const badCardsList = JSON.parse(localStorage.getItem('badCards')) || [];
    console.log(badCardsList)
    
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

    const card = document.querySelector(".card");
    // Hole den closeButton innerhalb der card
    const closeButton = card.querySelector('.closeButton');
    // Aktualisiere die Vorderseite mit der nächsten Karte
    frontSide.innerHTML = '';
    closeButton.innerHTML = 'x <br>';
    frontSide.innerHTML += randomNextCard;

    // Erstelle das Kartenelement und handle Klicks
    
    if (card) {
        let showAnswer = false; // Zustand Vorder- oder Rückseite
        card.addEventListener("click", (evt) => {
            // Sicherstellen, dass der Klick genau auf die Karte geht
        if (evt.target === card || evt.target === frontSide) {  // Wenn das geklickte Element die Karte selbst ist
            if (showAnswer) {
                frontSide.innerHTML = '';
                frontSide.innerHTML += `${randomNextCard}`; // Frage anzeigen
            } else {
                frontSide.innerHTML = '';
                frontSide.innerHTML += `${currentCardStorage[randomNextCard]}`; // Antwort anzeigen
            }
            showAnswer = !showAnswer;
        }});
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

if (document.getElementById("htmlButton")) {

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

}
let cardStorage = JSON.parse(localStorage.getItem(`cardStorage`)) || {};



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
        localStorage.setItem('cardStorageBADCARDS', JSON.stringify(badCardObject));
    
        console.log(badCardObject); // Überprüfe die aktualisierte Struktur
}
    
function loadLocalStorage(){
    let htmlData = localStorage.getItem('cardStorageHTML');
    let cardList = document.getElementById('cardList');
    console.log(htmlData.length)
    console.log(htmlData)
    if (htmlData) {
        try {
            let jsonData = JSON.parse(htmlData);
            //einzelne Werte durchgehen
            Object.entries(jsonData).forEach(([key, value]) => {
                console.log (`${key}: ${value}`)
                
                    cardList.innerHTML += `X <br><li>${key} - ${value}</li>`;
                
            
            });
        } catch (error){
            console.error('fehler beim parsen von JSON', error)
        }
    } else {
        console.log("Kein JSON-Datensatz im Local Storage gefunden.");
    }
}



document.querySelector('.closeButton').addEventListener('click', () => {
    elementKeyDelete(currentCardStorageKey, cardQuest);
    

}
)

function elementKeyDelete(key, value) {
    // Den Wert aus localStorage holen
    const dataKey = localStorage.getItem(key);
    const confirmDelete = confirm(`Möchtest du den Wert "${value}" wirklich löschen?`);
    // Existiert der Schlüssel?
    if (confirmDelete) {
        try {
            // In ein Objekt umwandeln
            let keyObject = JSON.parse(dataKey);
            console.log("Vorher:", keyObject);

            // Überprüfen, ob es ein Objekt ist
            if (typeof keyObject === 'object' && keyObject !== null) {
                // Entferne den spezifischen Schlüssel
                console.log('vor dem löschen', keyObject, keyObject[value]);
                delete keyObject[value];
                console.log('nach dem löschen', keyObject[value]);
                console.log("Nachher:", keyObject);

                // Aktualisiertes Objekt zurückspeichern
                localStorage.setItem(key, JSON.stringify(keyObject));

                // nächste Karte laden
                showNextCard(currentCardStorageKey, ".front");
            } else {
                console.error(`Der Wert von ${key} ist kein Objekt.`);
            }
        } catch (e) {
            console.error("Fehler beim Parsen von JSON:", e);
        }
    } else {
        console.warn(`Schlüssel ${key} existiert nicht.`);
    }
}


for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // Hole den Schlüssel
    if (key.startsWith("cardStorage")) { // Prüfe, ob der Schlüssel mit "cardStorage" beginnt
        console.log(key); // Gib den Schlüssel aus
        let cardsLoad = document.querySelector('.cardsLoad');
        const keySuffix = key.replace("cardStorage", ""); // Entferne den Präfix
        
        // Füge den Button ein, ohne bestehende Elemente zu ersetzen
        cardsLoad.insertAdjacentHTML('beforeend', `<button id='${key}'>${keySuffix}</button>`);
        
        // Füge den Click-Listener hinzu
        clickHinzufuegen(key);
    }
}

function clickHinzufuegen(key) {
    document.getElementById(key).addEventListener('click', () => {
        console.log('klick');
        let storedData = localStorage.getItem(key);

        console.log(key + " geklickt - storedData:", storedData); // Debugging-Ausgabe

        if (storedData) {
            document.querySelector("#message").classList.remove("show");
            colorChange(key);
            nextCard(key, ".front");  // rufe nextCard mit dem richtigen Schlüssel auf
        } else {
            console.log("Keine gespeicherten HTML-Daten gefunden.");
        }
    });
}

}


// button mit badCards erstellen falls noch keine badcards vorhanden sind
console.log('hallo-welt')

console.log(document.getElementById('addCardSend'));
