// Die Sprache ist für Karten in einer anderen sprache
let language ;

// storedData wird für die unterschiedlichen kartenspeicher aktualisiert! z.B 1cardStorageEngGer
let storedData0 = {};
let storedData1 = {};
let storedData2 = {};


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

    // Daten frisch aus dem Speicher laden
    const freshData = JSON.parse(localStorage.getItem(currentCardStorageKey));
    if (!freshData || Object.keys(freshData).length === 0) {
        console.error("Es sind keine Karten im Speicher vorhanden oder der Speicher ist leer.");
        document.querySelector('.front').innerHTML = '';
        document.querySelector('.closeButton').innerHTML = '';
        document.querySelector("#message").classList.add("show");
        return;
    }

    // Aktualisiere die globale Variable mit den frisch geladenen Daten
    currentCardStorage = freshData;
    console.log(Object.keys(currentCardStorage))
    console.log(Object.keys(currentCardStorage).length)
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
            language ='es-ES'
            vorlesen(frontSide, randomNextCard, language);
        }

        if (currentCardStorageKey === "cardStorageengGer" ||
            currentCardStorageKey === "1cardStorageengGer" ||
            currentCardStorageKey === "2cardStorageengGer") {
                language =  'en-US'
                vorlesen(frontSide, randomNextCard, language);
            }
       if (currentCardStorageKey === "cardStoragefrGer" ||
           currentCardStorageKey === "1cardStoragefrGer" ||
           currentCardStorageKey === "2cardStoragefrGer") {
               language =  'fr-FR'
               vorlesen(frontSide, randomNextCard, language);
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
                vorlesen(frontSide, randomNextCard, language);// button hinzufügen
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


function faecherAktualisieren(globalKey){
    console.log(globalKey)
    console.log(storedData0, storedData1, storedData2)
    
    storedData0 = localStorage.getItem(globalKey);
    storedData1 = localStorage.getItem(`1${globalKey}`);
    storedData2 = localStorage.getItem(`2${globalKey}`); 
    console.log(storedData0, storedData1, storedData2)
    
        // HTML-Elemente abrufen, z.B. basierend auf einer ID oder Klasse
        const buttonElement0 = document.getElementById('zero'+globalKey);
        const buttonElement1 = document.getElementById(`one${globalKey}`);
        const buttonElement2 = document.getElementById(`two${globalKey}`);
        console.log(buttonElement0)
        console.log(buttonElement1)
        console.log(buttonElement2)
    
        // Sicherstellen, dass die Elemente existieren, bevor leeresFach aufgerufen wird
        if (buttonElement0) {
            leeresFach(storedData0, buttonElement0);
        }
        if (buttonElement1) {
            leeresFach(storedData1, buttonElement1);
        }
        if (buttonElement2) {
            leeresFach(storedData2, buttonElement2);
        }
}

// Wenn ein Fach leer ist wird die Klasse leer hinzugefügt und das Element wird Grau gefärbt
function leeresFach(fachData, buttonElement){

    if (fachData === '{}'){
        console.log('leer')
        buttonElement.classList.add('leer')
    } else {
        buttonElement.classList.remove('leer')
    }
}

// Event-Listener für den Button "Nächste Karte"
document.getElementById("nextCardButtonTrue").addEventListener("click", () => {
    console.log("Nächste Karte ButtonTrue geklickt"); // Debugging-Ausgabe
    let correct = true;
    globalKey;
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
    faecherAktualisieren(globalKey);
  });

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
  faecherAktualisieren(globalKey);
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



function storageKeyButtonsLoad() {
    // Überprüfe, ob es überhaupt Schlüssel im localStorage gibt
    const keys = Object.keys(localStorage).filter(key => key.startsWith("cardStorage"));

    // Wenn keine "cardStorage"-Schlüssel vorhanden sind
    if (keys.length === 0) {
        console.log('Keine "cardStorage"-Schlüssel im localStorage');
        document.querySelector('.cardsInStorage').style.display = 'none'; // Verstecke die Kartenanzeige
        document.querySelector('.noCardsInStorage').style.display = 'block'; // Zeige alternative Nachricht
    } else {
        // Andernfalls
        console.log('Schlüssel gefunden:', keys);
        document.querySelector('.cardsInStorage').style.display = 'block'; // Zeige die Kartenanzeige
        document.querySelector('.noCardsInStorage').style.display = 'none'; // Verstecke die alternative Nachricht
    }

    // Durchlaufe alle "cardStorage"-Schlüssel und füge die Buttons hinzu
    keys.forEach(key => {
        const keySuffix = key.replace("cardStorage", ""); // Entferne den Präfix "cardStorage"

        // Füge den Button hinzu, ohne bestehende Elemente zu ersetzen
        let cardsLoad = document.querySelector('.cardsLoad');
        cardsLoad.insertAdjacentHTML('beforeend', `<button id='${key}'>${keySuffix}</button>`);

        // Füge den Click-Listener hinzu
        globalKeySuffix = keySuffix;
        clickHinzufuegen(key, keySuffix, cardsLoad);
    });
}
let globalKeySuffix;
let globalKey;

function clickHinzufuegen(key, keySuffix, cardsLoad) {
    
        let bereichButton = document.getElementById(key);
        bereichButton.addEventListener('click', () => {
        console.log(key + ' wurde geklickt!');
        
        let buttons = cardsLoad.querySelectorAll('button');
        console.log(buttons)
        buttons.forEach(btn => btn.style.boxShadow = "none");
    
         // Füge dem geklickten Button einen Rand hinzu
         bereichButton.style.boxShadow = "inset 0 0 10px gray";

        let card = document.querySelector('.front');
        let closeB = document.querySelector('.closeButton')
        storedData0 = localStorage.getItem(key); 
        // Hole die gespeicherten Daten
        // Überprüfe, ob der Schlüssel 1 und 2 existiert
        storedData1 = localStorage.getItem(`1${key}`);
        storedData2 = localStorage.getItem(`2${key}`);
        console.log(storedData0)
        console.log(storedData1)
        console.log(storedData2)
        let level = document.querySelector('.level');
        card.innerHTML= "";
        level.innerHTML = "";
        closeB.innerHTML="";
        globalKey = key;
        // Überprüfe, ob der Schlüssel "key" existiert
        if (storedData0) {
            console.log(`Der Schlüssel "${key}" existiert im localStorage.`);
            level.insertAdjacentHTML('beforeend', `<button class='level-button' id='zero${key}'>${keySuffix} Fach 1</button>`);
            fachButton = document.getElementById(`zero${key}`);
            leeresFach(storedData0, fachButton);
            fachButton.addEventListener('click', () => {
                fachClicked(level, fachButton);
                if (storedData0) {
                    document.querySelector("#message").classList.remove("show");
                    nextCard(key, ".front");  // Rufe nextCard mit dem richtigen Schlüssel auf
                } else {
                    console.log("Keine gespeicherten HTML-Daten gefunden.");
                }
            });
        } else {
            console.log(`Der Schlüssel "${key}" existiert NICHT im localStorage.`);
        }
        
        
        if (storedData1) {
            console.log(`Der Schlüssel "1${key}" existiert im localStorage.`);
            // Button wird erstellt
            level.insertAdjacentHTML('beforeend', `<button class='level-button' id='one${key}'>${keySuffix} Fach 2</button>`);
            // click event wird den Button hinzugefügt
            fachButton1 = document.getElementById(`one${key}`);
            leeresFach(storedData1, fachButton1);
            fachButton1.addEventListener('click', () => {
                
                // Holt die daten von localStorage...
                storedData1 = localStorage.getItem(`1${key}`);
                fachClicked(level, fachButton1)

                console.log('storageData1 wird angezeigt' +storedData1);
                if (storedData1) {
                    document.querySelector("#message").classList.remove("show");
                    nextCard(`1${key}`, ".front");  // Rufe nextCard mit dem richtigen Schlüssel auf
                }
            });
        } else {
            console.log(`Der Schlüssel "1${key}" existiert NICHT im localStorage.`);
        }

        
        if (storedData2){
            console.log(`Der Schlüssel "2${key}" existiert im localStorage.`);
            level.insertAdjacentHTML('beforeend', `<button class='level-button' id='two${key}'>${keySuffix} Fach 3</button>`);
            fachButton2 = document.getElementById(`two${key}`);
            leeresFach(storedData2, fachButton2);
            fachButton2.addEventListener('click', () => {
                storedData2 = localStorage.getItem(`2${key}`);
                console.log(storedData2);
                fachClicked(level, fachButton2)
                if (storedData2) {
                    document.querySelector("#message").classList.remove("show");
                    nextCard(`2${key}`, ".front");  // Rufe nextCard mit dem richtigen Schlüssel auf
                } else {
                    console.log(`Der Schlüssel "2${key}" existiert NICHT im localStorage.`);
                }
            });
        }
    });
}
storageKeyButtonsLoad();
}

// Border um geklicktes Feld
function fachClicked(level, button){
    let buttons = level.querySelectorAll('button');
    console.log(buttons)
    buttons.forEach(btn => btn.style.boxShadow = "none");

     // Füge dem geklickten Button einen Rand hinzu
     button.style.boxShadow = "inset 0 0 10px green";
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
    console.log('vorher ' + Object.keys(currentStorage).length);
    
    // Bestimme die nächste oder vorherige Ebene
    let nextKey;

    if (correct) {
        // Verschiebe nach oben, wenn die Antwort richtig ist
        if (currentKey.startsWith('cardStorage')) {
            nextKey = "1" + currentKey; // von der ersten Ebene zu Ebene 1
        } else if (currentKey.startsWith('1cardStorage')) {
            nextKey = "2" + currentKey.slice(1); // von Ebene 1 zu Ebene 2
        } else if (currentKey.startsWith('2cardStorage')) {
            console.error("Die Karte kann nicht weiter nach oben verschoben werden, da keine höhere Ebene existiert.");
            nextKey = currentKey; // Die Karte bleibt in der aktuellen Ebene
        }
    } else {
        // Verschiebe nach unten, wenn die Antwort falsch ist
        if (currentKey.startsWith('1cardStorage')) {
            nextKey = currentKey.slice(1); // von Ebene 1 zurück zu der ersten Ebene
        } else if (currentKey.startsWith('2cardStorage')) {
            nextKey = "1" + currentKey.slice(1); // von Ebene 2 zurück zu Ebene 1
        } else {
            console.error("Die Karte kann nicht weiter nach unten verschoben werden, da keine niedrigere Ebene existiert.");
            nextKey = currentKey; // Die Karte bleibt in der aktuellen Ebene
        }
    }

    // Wenn nextKey gleich currentKey ist, bleibt die Karte in der aktuellen Ebene
    if (nextKey === currentKey) {
        console.log('Die Karte bleibt in der aktuellen Ebene.');
    } else {
        // Entferne die Karte aus der aktuellen Ebene, wenn sie verschoben wird
        delete currentStorage[cardId];
        localStorage.setItem(currentKey, JSON.stringify(currentStorage));

        console.log('nachher ' + Object.keys(currentStorage).length);

        // Lade die Daten der Ziel-Ebene
        let targetStorage = JSON.parse(localStorage.getItem(nextKey)) || {};

        // Füge die Karte in die Ziel-Ebene ein
        targetStorage[cardId] = cardData;
        localStorage.setItem(nextKey, JSON.stringify(targetStorage));

        console.log(`Karte mit der ID "${cardId}" wurde von "${currentKey}" nach "${nextKey}" verschoben.`);
    }

    currentStroageLoad(currentKey); // Lade die aktuelle Ebene neu
}




function vorlesen(frontSide, randomNextCard, language) {
    const readButton = document.createElement('button');
    readButton.textContent = 'Vorlesen';
    readButton.style.marginTop = '10px';
    frontSide.appendChild(document.createElement('br'));
    frontSide.appendChild(readButton);

    readButton.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(randomNextCard);
            utterance.lang = language; // Sprache festlegen

            // Alle verfügbaren Stimmen durchsuchen
            const voices = speechSynthesis.getVoices();
            let selectedVoice = null;

            // Stimme auswählen, die der gewünschten Sprache entspricht
            voices.forEach((voice) => {
                if (voice.lang.startsWith(language)) {
                    selectedVoice = voice;
                }
            });

            // Wenn eine passende Stimme gefunden wurde, verwenden
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            } else {
                console.log('Keine passende Stimme gefunden');
            }

            // Verzögerung hinzufügen, um die Stimmenliste vollständig zu laden
            setTimeout(() => {
                speechSynthesis.speak(utterance);
            }, 100);
        } else {
            console.log('Sprachsynthese wird nicht unterstützt');
        }
    });
}



function currentStroageLoad(storageKey){
    const storage = JSON.parse(localStorage.getItem(storageKey));
    console.log(storage + ' wurde geladen')
    return storage;
    
}

