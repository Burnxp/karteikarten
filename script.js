let spanisch;


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

   

    // Aktuelle Daten im globalen Bereich speichern
    currentCardStorageKey = storageKey;
    currentCardStorage = cardStorage;
    currentCardIndex = -1;  // Starten beim Anfang der Liste
    

    // Zeige die erste Karte
    showNextCard(frontSideSelector);
}





// Funktion zum Zeigen der nächsten Karte
function showNextCard(frontSideSelector) {
    
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

    //vorlesebutton einfügen:
        // Erstelle den Vorlese-Button, falls es eine spanische Karte ist
        
        if (currentCardStorageKey === "cardStoragespaGer" ||
            currentCardStorageKey === "1cardStoragespaGer" ||
            currentCardStorageKey === "2cardStoragespaGer"

        ) {
            vorlesen(frontSide, randomNextCard);
        }

        if (currentCardStorageKey === "cardStorageengGer" ||
            currentCardStorageKey === "1cardStorageengGer" ||
            currentCardStorageKey === "2cardStorageengGer") {
                vorleseneng(frontSide, randomNextCard);
            }

    // Erstelle das Kartenelement und handle Klicks
    
    if (card) {
        let showAnswer = false; // Zustand Vorder- oder Rückseite
        card.addEventListener("click", (evt) => {
            // Sicherstellen, dass der Klick genau auf die Karte geht
        if (evt.target === card || evt.target === frontSide) {  // Wenn das geklickte Element die Karte selbst ist
            if (showAnswer) {
                frontSide.innerHTML = '';
                frontSide.innerHTML += `${randomNextCard}`; // Frage anzeigen
                vorlesen(frontSide, randomNextCard);// button hinzufügen
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
        
        nextCard('cardStorageHTML', ".front");  // rufe nextCard mit dem richtigen Schlüssel auf
    } else {
        console.log("Keine gespeicherten HTML-Daten gefunden.");
    }
});

}
let cardStorage = JSON.parse(localStorage.getItem(`cardStorage`)) || {};



// Event-Listener für den Button "Nächste Karte"
document.getElementById("nextCardButtonFalse").addEventListener("click", () => {
    let correct = false;
    
  console.log("Nächste Karte ButtonFalse geklickt"); // Debugging-Ausgabe
  console.log(currentCardStorageKey)
  console.log(currentCardStorage);

  if (
    currentCardStorageKey &&
    currentCardStorage &&
    Object.keys(currentCardStorage).length > 0
  ) {
    console.log("Nächste Karte wird angezeigt mit Schlüssel:", currentCardStorageKey); // Debugging-Ausgabe
    moveCardToNextLevelOrPrevious(currentCardStorageKey, cardQuest, correct);
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

// Event-Listener für den Button "Nächste Karte"
document.getElementById("nextCardButtonTrue").addEventListener("click", () => {
    console.log("Nächste Karte ButtonTrue geklickt"); // Debugging-Ausgabe
    let correct = true;
    if (
      currentCardStorageKey &&
      currentCardStorage &&
      Object.keys(currentCardStorage).length > 0
    ) {
      console.log("Nächste Karte wird angezeigt mit Schlüssel:", currentCardStorageKey); // Debugging-Ausgabe
      moveCardToNextLevelOrPrevious(currentCardStorageKey, cardQuest, correct);
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

/* function colorChange(cardType) {
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
} */

  

    
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
storageKeyButtonsLoad();
function storageKeyButtonsLoad(){
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // Hole den Schlüssel
    if (key.startsWith("cardStorage")) { // Prüfe, ob der Schlüssel mit "cardStorage" beginnt
        console.log(key); // Gib den Schlüssel aus
        let cardsLoad = document.querySelector('.cardsLoad');
        
        const keySuffix = key.replace("cardStorage", ""); // Entferne den Präfix
        
        // Füge den Button ein, ohne bestehende Elemente zu ersetzen
        cardsLoad.insertAdjacentHTML('beforeend', `<button id='${key}'>${keySuffix}</button>`);
        
        // Füge den Click-Listener hinzu
        clickHinzufuegen(key, keySuffix);
    }
}}

function clickHinzufuegen(key, keySuffix) {
    document.getElementById(key).addEventListener('click', () => {
        console.log('klick');
        let card = document.querySelector('.front');
        let closeB = document.querySelector('.closeButton')
        let storedData = localStorage.getItem(key); // Hole die gespeicherten Daten
        let level = document.querySelector('.level');
        card.innerHTML= "";
        level.innerHTML = "";
        closeB.innerHTML="";
        
        // Überprüfe, ob der Schlüssel "key" existiert
        if (storedData) {
            console.log(`Der Schlüssel "${key}" existiert im localStorage.`);
            level.insertAdjacentHTML('beforeend', `<button class='level-button' id='zero${key}'>${keySuffix} Einführung</button>`);

            document.getElementById(`zero${key}`).addEventListener('click', () => {
                if (storedData) {
                    document.querySelector("#message").classList.remove("show");
                    nextCard(key, ".front");  // Rufe nextCard mit dem richtigen Schlüssel auf
                } else {
                    console.log("Keine gespeicherten HTML-Daten gefunden.");
                }
            });
        } else {
            console.log(`Der Schlüssel "${key}" existiert NICHT im localStorage.`);
        }
        
        // Überprüfe, ob der Schlüssel "1<key>" existiert
        let storedData1 = localStorage.getItem(`1${key}`);
        if (storedData1) {
            console.log(`Der Schlüssel "1${key}" existiert im localStorage.`);
            level.insertAdjacentHTML('beforeend', `<button class='level-button' id='one${key}'>${keySuffix} Vertiefung</button>`);
            
            document.getElementById(`one${key}`).addEventListener('click', () => {
                storedData1 = localStorage.getItem(`1${key}`);
                console.log(storedData1);
                if (storedData1) {
                    document.querySelector("#message").classList.remove("show");
                    nextCard(`1${key}`, ".front");  // Rufe nextCard mit dem richtigen Schlüssel auf
                } else {
                    console.log("Keine gespeicherten HTML-Daten gefunden.");
                }
            });
        } else {
            console.log(`Der Schlüssel "1${key}" existiert NICHT im localStorage.`);
        }
        let storedData2 = localStorage.getItem(`2${key}`);
        if (storedData2){
            console.log(`Der Schlüssel "2${key}" existiert im localStorage.`);
            level.insertAdjacentHTML('beforeend', `<button class='level-button' id='two${key}'>${keySuffix} Meister</button>`);
            
            document.getElementById(`two${key}`).addEventListener('click', () => {
                storedData2 = localStorage.getItem(`2${key}`);
                console.log(storedData2);
                if (storedData2) {
                    document.querySelector("#message").classList.remove("show");
                    nextCard(`2${key}`, ".front");  // Rufe nextCard mit dem richtigen Schlüssel auf
                } else {
                    console.log("Keine gespeicherten HTML-Daten gefunden.");
                }
            });
        }
    });
}


}



console.log('hallo-welt')

console.log(document.getElementById('addCardSend'));



function vorlesen(frontSide, randomNextCard){
    const readButton = document.createElement('button');
    readButton.textContent = 'Vorlesen';
    readButton.style.marginTop = '10px';
    frontSide.appendChild(document.createElement('br'));
    frontSide.appendChild(readButton);

    // Event-Listener für das Vorlesen
    readButton.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(randomNextCard);
        utterance.lang = 'es-ES'; // Spanische Sprache
        speechSynthesis.speak(utterance);
    });
}

function vorleseneng (frontSide, randomNextCard){
    const readButton = document.createElement('button');
    readButton.textContent = 'Vorlesen';
    readButton.style.marginTop = '10px';
    frontSide.appendChild(document.createElement('br'));
    frontSide.appendChild(readButton);

    readButton.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(randomNextCard);
        utterance.lang = 'en-US' // Englische Sprache
        speechSynthesis.speak(utterance);
    })
}



function moveCardToNextLevelOrPrevious(currentKey, cardId, correct) {
    // Lade die Daten aus der aktuellen Ebene
    let currentStorage = JSON.parse(localStorage.getItem(currentKey)) || {};

    // Prüfen, ob die Karte existiert
    if (!currentStorage[cardId]) {
        console.error(`Die Karte mit der ID "${cardId}" wurde in "${currentKey}" nicht gefunden.`);
        return;
    }

    // Daten der Karte extrahieren
    const cardData = currentStorage[cardId];

    // Entferne die Karte aus der aktuellen Ebene
    delete currentStorage[cardId];
    localStorage.setItem(currentKey, JSON.stringify(currentStorage));

    // Bestimme die nächste oder vorherige Ebene
    let nextKey;

    if (correct) {
        // Verschiebe nach oben, wenn die Antwort richtig ist
        if (currentKey.startsWith('cardStorage')) {
            nextKey = "1" + currentKey; // von der ersten Ebene zu Ebene 1
        } else if (currentKey.startsWith('1cardStorage')) {
            nextKey = "2" + currentKey.slice(1); // von Ebene 1 zu Ebene 2
        } else if (currentKey.startsWith('2cardStorage')){
            console.error("Die Karte kann nicht weiter nach oben verschoben werden, da keine höhere Ebene existiert.");
            return;
        }
    } else {
        // Verschiebe nach unten, wenn die Antwort falsch ist
        if (currentKey.startsWith('1cardStorage')) {
            nextKey = currentKey.slice(1); // von Ebene 1 zurück zu der ersten Ebene
        } else if (currentKey.startsWith('2cardStorage')) {
            nextKey = "1" + currentKey.slice(1); // von Ebene 2 zurück zu Ebene 1
        } else {
            console.error("Die Karte kann nicht weiter nach unten verschoben werden, da keine niedrigere Ebene existiert.");
            return;
        }
    }
    

    // Lade die Daten der Ziel-Ebene
    let targetStorage = JSON.parse(localStorage.getItem(nextKey)) || {};

    // Füge die Karte in die Ziel-Ebene ein
    targetStorage[cardId] = cardData;
    localStorage.setItem(nextKey, JSON.stringify(targetStorage));

    console.log(`Karte mit der ID "${cardId}" wurde von "${currentKey}" nach "${nextKey}" verschoben.`);
}

// Beispielaufruf für richtige Antwort (nach oben):
// moveCardToNextLevelOrPrevious('cardStorageTest', 'frage1', true);

// Beispielaufruf für falsche Antwort (nach unten):
// moveCardToNextLevelOrPrevious('1cardStorageTest', 'frage1', false);