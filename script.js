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

// Globale Variable für die zuletzt angezeigte Karte
let lastShownCard = null;

let currentCardStorageKey = '';  // Variable für den aktuellen StorageKey
let currentCardStorage = {};     // Objekt, das die geladenen Daten enthält
let currentCardIndex = -1;       // Index der aktuellen Karte
let aktStorageKey = '';          // globaler Key für den aktiven Storage

// Funktion zur Anzeige der Karten
function nextCard(storageKey, frontSideSelector) {
    console.log("Lade Karten mit Schlüssel:", storageKey); // Debugging-Ausgabe
    const cardStorage = JSON.parse(localStorage.getItem(storageKey));

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

    // Aktuelle Daten im globalen Bereich speichern
    currentCardStorageKey = storageKey;
    currentCardStorage = cardStorage;
    currentCardIndex = -1;  // Starten beim Anfang der Liste
    aktStorageKey = storageKey; // Speichern des aktiven Storage-Keys
    console.log("Aktueller Storage Key:", aktStorageKey); // Debugging-Ausgabe

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
                frontSide.innerHTML = `${randomNextCard}?`; // Frage anzeigen
            } else {
                frontSide.innerHTML = `${currentCardStorage[randomNextCard]}!`; // Antwort anzeigen
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
    nextCard("badCards", ".front");
  } else {
    console.log("Keine gespeicherten JS-Daten gefunden.");
  }
});
// Event-Listener für den Button "Nächste Karte"
document.getElementById("nextCardButton").addEventListener("click", () => {
  console.log("Nächste Karte Button geklickt"); // Debugging-Ausgabe
  if (
    aktStorageKey &&
    currentCardStorage &&
    Object.keys(currentCardStorage).length > 0
  ) {
    console.log("Nächste Karte wird angezeigt mit Schlüssel:", aktStorageKey); // Debugging-Ausgabe
    showNextCard(aktStorageKey, ".front");
  } else {
    console.error("Keine Karten geladen. Bitte wähle zuerst eine Karte.");
    // Zeige die Nachricht an
    
    document.querySelector("#message").classList.add("show");

    // Verstecke die Nachricht nach 3 Sekunden
    setTimeout(function () {
      document.querySelector("#message").classList.remove("show");
    }, 7000); // 3000ms = 3 Sekunden
  }
});

//cards Objecte
    let jsCards = {
    "console.log()": "Gibt eine Nachricht oder einen Wert in der Browser-Konsole aus",
    "alert()": "Zeigt ein Pop-up-Dialogfeld mit einer Nachricht an",
    "prompt()": "Öffnet ein Eingabefeld und gibt die eingegebene Zeichenfolge zurück",
    "confirm()": "Öffnet ein Bestätigungsdialogfeld mit OK- und Abbrechen-Schaltflächen",
    "document.getElementById()": "Wählt ein HTML-Element anhand seiner ID aus",
    "document.querySelector()": "Wählt das erste Element, das mit einem CSS-Selektor übereinstimmt",
    "document.querySelectorAll()": "Wählt alle Elemente aus, die mit einem CSS-Selektor übereinstimmen",
    "addEventListener()": "Fügt einem Element einen Ereignis-Listener hinzu",
    "setTimeout()": "Führt eine Funktion nach einer bestimmten Zeitverzögerung aus",
    "setInterval()": "Führt eine Funktion in festgelegten Intervallen aus",
    "clearTimeout()": "Stoppt eine zuvor gestartete Timeout-Funktion",
    "clearInterval()": "Stoppt eine wiederholte Ausführung durch setInterval",
    "Math.random()": "Gibt eine zufällige Zahl zwischen 0 (inklusive) und 1 (exklusive) zurück",
    "Math.floor()": "Rundet eine Zahl ab",
    "Math.ceil()": "Rundet eine Zahl auf",
    "Math.round()": "Rundet eine Zahl auf die nächste Ganzzahl",
    "Math.max()": "Gibt den größten Wert aus einer Liste von Zahlen zurück",
    "Math.min()": "Gibt den kleinsten Wert aus einer Liste von Zahlen zurück",
    "Date()": "Erstellt ein neues Datumsobjekt",
    "JSON.stringify()": "Konvertiert ein JavaScript-Objekt in eine JSON-Zeichenkette",
    "JSON.parse()": "Konvertiert eine JSON-Zeichenkette in ein JavaScript-Objekt",
    "localStorage.setItem()": "Speichert einen Schlüssel-Wert-Paar in localStorage",
    "localStorage.getItem()": "Liest einen Wert aus localStorage",
    "localStorage.removeItem()": "Entfernt ein Schlüssel-Wert-Paar aus localStorage",
    "localStorage.clear()": "Löscht alle Daten im localStorage",
    "Array.push()": "Fügt ein oder mehrere Elemente an das Ende eines Arrays hinzu",
    "Array.pop()": "Entfernt das letzte Element eines Arrays und gibt es zurück",
    "Array.shift()": "Entfernt das erste Element eines Arrays und gibt es zurück",
    "Array.unshift()": "Fügt ein oder mehrere Elemente am Anfang eines Arrays hinzu",
    "Array.splice()": "Ändert den Inhalt eines Arrays, indem Elemente hinzugefügt, entfernt oder ersetzt werden",
    "Array.slice()": "Gibt eine Kopie eines Teils eines Arrays zurück",
    "Array.filter()": "Erstellt ein neues Array mit Elementen, die eine Bedingung erfüllen",
    "Array.map()": "Erstellt ein neues Array, indem eine Funktion auf jedes Element angewendet wird",
    "Array.forEach()": "Führt eine Funktion für jedes Element eines Arrays aus",
    "Array.reduce()": "Reduziert ein Array auf einen einzigen Wert, indem eine Funktion aufgerufen wird",
    "Array.includes()": "Prüft, ob ein Array ein bestimmtes Element enthält",
    "Array.indexOf()": "Gibt den Index des ersten Vorkommens eines Elements zurück",
    "Array.find()": "Findet das erste Element eines Arrays, das eine Bedingung erfüllt",
    "Array.sort()": "Sortiert die Elemente eines Arrays",
    "String.toUpperCase()": "Wandelt eine Zeichenfolge in Großbuchstaben um",
    "String.toLowerCase()": "Wandelt eine Zeichenfolge in Kleinbuchstaben um",
    "String.split()": "Teilt eine Zeichenfolge in ein Array von Teilzeichenfolgen",
    "String.replace()": "Ersetzt einen Teil einer Zeichenfolge durch eine andere",
    "String.trim()": "Entfernt Leerzeichen am Anfang und Ende einer Zeichenfolge",
    "String.includes()": "Prüft, ob eine Zeichenfolge eine bestimmte Teilzeichenfolge enthält",
    "String.indexOf()": "Gibt den Index des ersten Vorkommens einer Teilzeichenfolge zurück",
    "document.createElement()": "Erstellt ein neues HTML-Element",
    "element.appendChild()": "Fügt ein Kind-Element an ein Eltern-Element an",
    "element.removeChild()": "Entfernt ein Kind-Element aus einem Eltern-Element",
    "element.innerHTML": "Setzt oder liest den HTML-Inhalt eines Elements",
    "element.textContent": "Setzt oder liest den Textinhalt eines Elements",
    "element.style": "Ändert den Inline-Stil eines Elements",
    "navigator.geolocation.getCurrentPosition()": "Ruft die aktuelle Position des Benutzers ab",
    "fetch()": "Führt eine HTTP-Anfrage durch und gibt eine Promise zurück",
    "async/await": "Arbeitet mit asynchronen Funktionen auf eine synchrone Art",
    "try/catch": "Fängt Fehler in einem Block von Code ab",
    "Promise.then()": "Verarbeitet das Ergebnis einer erfolgreichen Promise",
    "Promise.catch()": "Verarbeitet Fehler aus einer Promise",
    "Promise.finally()": "Wird unabhängig vom Ergebnis einer Promise ausgeführt",
    "class": "Definiert eine Klasse zur Erstellung von Objekten",
    "constructor": "Erstellt eine spezielle Methode in einer Klasse für Initialisierungen",
    "this": "Bezieht sich auf das aktuelle Objekt im Kontext",
    "new": "Erzeugt eine Instanz einer Klasse oder eines Objekts",
    "Object.keys()": "Gibt ein Array mit den Schlüsseln eines Objekts zurück",
    "Object.values()": "Gibt ein Array mit den Werten eines Objekts zurück",
    "Object.entries()": "Gibt ein Array von Schlüssel-Wert-Paaren eines Objekts zurück",
    "Object.assign()": "Kopiert die Werte aller Eigenschaften von einem oder mehreren Objekten in ein Zielobjekt",
    "Object.freeze()": "Friert ein Objekt ein, sodass keine Änderungen vorgenommen werden können",
    "Object.seal()": "Versiegelt ein Objekt, sodass keine neuen Eigenschaften hinzugefügt werden können",
    "typeof": "Gibt den Datentyp einer Variablen zurück",
    "instanceof": "Prüft, ob ein Objekt zu einem bestimmten Typ gehört",
    "isNaN()": "Prüft, ob ein Wert keine Zahl ist",
    "parseInt()": "Konvertiert eine Zeichenfolge in eine ganze Zahl",
    "parseFloat()": "Konvertiert eine Zeichenfolge in eine Gleitkommazahl"
  };
  let htmlCards = {
    "id": "Eindeutige Identifikation für ein HTML-Element, um es gezielt anzusprechen",
    "class": "Eine oder mehrere Klassen für CSS-Styling oder JavaScript-Zugriffe",
    "style": "Inline-CSS, um das Styling eines Elements direkt zu definieren",
    "title": "Zusätzliche Informationen, die beim Hover über das Element angezeigt werden",
    "alt": "Alternativer Text für ein Bild, falls dieses nicht geladen werden kann",
    "src": "Quelle einer eingebetteten Ressource, z.B. ein Bild oder Video",
    "href": "Ziel-URL für Links oder Ressourcen",
    "target": "Bestimmt, wie ein Link geöffnet wird (z.B. _blank für neues Fenster)",
    "rel": "Beziehung zwischen der aktuellen Seite und der verlinkten Ressource",
    "type": "Typ der Ressource, z.B. für `<link>` oder `<script>`",
    "name": "Name eines Elements, z.B. für Formularfelder",
    "value": "Wert eines Elements, z.B. bei Formularfeldern oder `<input>`",
    "placeholder": "Anzeigetext in einem leeren Formularfeld",
    "required": "Gibt an, ob ein Eingabefeld ausgefüllt sein muss",
    "disabled": "Deaktiviert ein Formularfeld oder Element",
    "readonly": "Verhindert die Bearbeitung eines Eingabefelds, aber erlaubt die Auswahl",
    "checked": "Markiert ein Kontrollkästchen oder eine Optionsschaltfläche als ausgewählt",
    "maxlength": "Maximale Anzahl von Zeichen, die in einem Eingabefeld erlaubt sind",
    "minlength": "Minimale Anzahl von Zeichen, die in einem Eingabefeld erforderlich sind",
    "pattern": "Definiert ein reguläres Ausdrucksmuster für Eingabewerte",
    "autofocus": "Setzt den Fokus automatisch auf ein Eingabefeld, wenn die Seite geladen wird",
    "autocomplete": "Steuert die automatische Vervollständigung von Eingaben",
    "multiple": "Erlaubt die Auswahl mehrerer Werte (z.B. für `<select>` oder `<input>`)",
    "size": "Anzahl der sichtbaren Optionen in einem Dropdown-Menü",
    "step": "Legt die Inkremente für Zahlen- oder Datumsfelder fest",
    "min": "Minimal erlaubter Wert für ein Eingabefeld",
    "max": "Maximal erlaubter Wert für ein Eingabefeld",
    "for": "Verknüpft ein `<label>` mit der ID eines Formularfelds",
    "method": "Methode des Formularversands (z.B. GET oder POST)",
    "action": "URL, an die ein Formular gesendet wird",
    "enctype": "Codierungstyp des Formularinhalts (z.B. multipart/form-data für Datei-Uploads)",
    "novalidate": "Deaktiviert die HTML-Standardformularvalidierung",
    "cols": "Anzahl der sichtbaren Spalten in einem `<textarea>`",
    "rows": "Anzahl der sichtbaren Zeilen in einem `<textarea>`",
    "wrap": "Steuert den Textumbruch in einem `<textarea>` (z.B. hard oder soft)",
    "lang": "Sprache des Inhalts im Element",
    "dir": "Textausrichtung (z.B. ltr für links-nach-rechts oder rtl für rechts-nach-links)",
    "hidden": "Verbirgt ein Element vor der Anzeige",
    "data-*": "Benutzerdefinierte Datenattribute für Entwickler (z.B. `data-id`, `data-role`)",
    "contenteditable": "Erlaubt die Bearbeitung des Inhalts eines Elements",
    "draggable": "Macht ein Element per Drag-and-Drop verschiebbar",
    "spellcheck": "Aktiviert oder deaktiviert die Rechtschreibprüfung für ein Element",
    "tabindex": "Reihenfolge der Tabulator-Navigation",
    "role": "Definiert die semantische Rolle eines Elements (z.B. für Barrierefreiheit)",
    "aria-label": "Beschriftung eines Elements für Screenreader",
    "aria-hidden": "Gibt an, ob ein Element für Screenreader verborgen ist",
    "loading": "Gibt an, wie Ressourcen (z.B. Bilder) geladen werden sollen (lazy oder eager)",
    "async": "Gibt an, ob ein `<script>` asynchron geladen werden soll",
    "defer": "Gibt an, ob ein `<script>` verzögert ausgeführt werden soll",
    "sandbox": "Einschränkungen für eingebettete `<iframe>`-Inhalte",
    "allow": "Definiert Berechtigungen für eingebettete `<iframe>`-Inhalte",
    "charset": "Zeichensatz der Webseite oder Ressource (z.B. UTF-8)",
    "http-equiv": "Meta-Informationen, die an den HTTP-Header gesendet werden",
    "content": "Inhalt eines `<meta>`-Elements",
    "viewport": "Definiert Ansichtsfenster-Einstellungen für mobile Geräte",
    "accesskey": "Legt eine Tastenkombination zum Aktivieren eines Elements fest",
    "translate": "Gibt an, ob ein Element übersetzt werden soll",
    "controls": "Zeigt Steuerelemente für Audio- oder Video-Elemente an",
    "autoplay": "Startet ein Audio- oder Video-Element automatisch",
    "loop": "Wiederholt ein Audio- oder Video-Element automatisch",
    "muted": "Stellt ein Audio- oder Video-Element standardmäßig auf stumm",
    "poster": "Vorschaubild für ein `<video>`-Element",
    "crossorigin": "Gibt an, wie Anfragen über verschiedene Ursprünge hinweg behandelt werden",
    "preload": "Gibt an, wie ein `<audio>`- oder `<video>`-Element vorab geladen wird"
  }
  ;
  let cssCards = {
    "color": "Textfarbe festlegen",
    "background-color": "Hintergrundfarbe festlegen",
    "background-image": "Hintergrundbild hinzufügen",
    "background-size": "Größe des Hintergrundbilds einstellen",
    "background-position": "Position des Hintergrundbilds festlegen",
    "background-repeat": "Wiederholung des Hintergrundbilds steuern",
    "font-size": "Schriftgröße einstellen",
    "font-weight": "Schriftgewicht festlegen (z.B. fett oder normal)",
    "font-family": "Schriftart festlegen",
    "text-align": "Textausrichtung festlegen (z.B. links, rechts, zentriert)",
    "text-decoration": "Textdekoration wie Unterstrich, Durchstreichen definieren",
    "text-transform": "Text umwandeln (z.B. Großbuchstaben, Kleinbuchstaben)",
    "letter-spacing": "Abstand zwischen Buchstaben einstellen",
    "word-spacing": "Abstand zwischen Wörtern anpassen",
    "line-height": "Zeilenhöhe anpassen",
    "white-space": "Verhalten von Leerzeichen steuern (z.B. umbrechen, nicht umbrechen)",
    "border": "Rahmen definieren (Dicke, Stil, Farbe)",
    "border-radius": "Ecken des Rahmens abrunden",
    "border-width": "Dicke des Rahmens festlegen",
    "border-style": "Stil des Rahmens festlegen (z.B. solid, dotted)",
    "border-color": "Farbe des Rahmens bestimmen",
    "outline": "Außenlinie (Outline) definieren",
    "outline-offset": "Abstand der Außenlinie zum Element festlegen",
    "width": "Breite des Elements festlegen",
    "height": "Höhe des Elements festlegen",
    "min-width": "Minimale Breite festlegen",
    "max-width": "Maximale Breite definieren",
    "min-height": "Minimale Höhe festlegen",
    "max-height": "Maximale Höhe bestimmen",
    "padding": "Innenabstand festlegen",
    "padding-top": "Innenabstand oben einstellen",
    "padding-right": "Innenabstand rechts definieren",
    "padding-bottom": "Innenabstand unten bestimmen",
    "padding-left": "Innenabstand links einstellen",
    "margin": "Außenabstand festlegen",
    "margin-top": "Außenabstand oben definieren",
    "margin-right": "Außenabstand rechts einstellen",
    "margin-bottom": "Außenabstand unten bestimmen",
    "margin-left": "Außenabstand links festlegen",
    "display": "Darstellungsart definieren (z.B. block, inline, flex)",
    "flex": "Flexbox-Einstellungen festlegen",
    "flex-grow": "Wachstum des Flex-Items definieren",
    "flex-shrink": "Schrumpfen des Flex-Items bestimmen",
    "flex-basis": "Startwert der Flex-Größe einstellen",
    "align-items": "Ausrichtung von Items innerhalb eines Flex-Containers festlegen",
    "justify-content": "Verteilung der Flex-Items steuern",
    "align-self": "Ausrichtung eines einzelnen Flex-Items definieren",
    "grid-template-rows": "Reihen eines CSS-Grids definieren",
    "grid-template-columns": "Spalten eines CSS-Grids festlegen",
    "grid-gap": "Abstand zwischen Grid-Elementen steuern",
    "position": "Positionierungsmethode wählen (z.B. statisch, relativ, absolut)",
    "top": "Abstand von der oberen Seite festlegen",
    "right": "Abstand von der rechten Seite bestimmen",
    "bottom": "Abstand von der unteren Seite definieren",
    "left": "Abstand von der linken Seite einstellen",
    "z-index": "Schichtebene des Elements definieren",
    "overflow": "Überlaufverhalten bestimmen (z.B. scrollen, verstecken)",
    "overflow-x": "Überlaufverhalten auf der X-Achse steuern",
    "overflow-y": "Überlaufverhalten auf der Y-Achse steuern",
    "clip-path": "Form des sichtbaren Bereichs eines Elements festlegen",
    "opacity": "Transparenz des Elements einstellen",
    "box-shadow": "Schatten um das Element erzeugen",
    "text-shadow": "Schrift-Schatten definieren",
    "filter": "Grafik-Effekte wie Unschärfe oder Farbanpassung anwenden",
    "backdrop-filter": "Filter auf den Hintergrund hinter einem Element anwenden",
    "cursor": "Art des Mauszeigers festlegen (z.B. Zeiger, Hand)",
    "transition": "Übergangseffekte definieren",
    "transition-property": "Eigenschaft(en) festlegen, die animiert werden",
    "transition-duration": "Dauer des Übergangs definieren",
    "transition-timing-function": "Zeitverlauf der Animation bestimmen",
    "animation": "CSS-Animationen anwenden",
    "animation-name": "Name der Animation definieren",
    "animation-duration": "Dauer der Animation festlegen",
    "animation-delay": "Startverzögerung der Animation bestimmen",
    "animation-timing-function": "Zeitverlauf der Animation definieren",
    "transform": "Element transformieren (z.B. drehen, skalieren)",
    "transform-origin": "Ursprung der Transformation festlegen",
    "perspective": "Perspektive für 3D-Transformationen definieren",
    "perspective-origin": "Ursprung der Perspektive festlegen",
    "visibility": "Sichtbarkeit des Elements steuern (sichtbar, verborgen)",
    "content": "Inhalt für Pseudo-Elemente definieren",
    "object-fit": "Inhalt eines Elements an dessen Box anpassen",
    "object-position": "Position des Inhalts innerhalb eines Elements bestimmen",
    "scroll-behavior": "Scroll-Verhalten bei Navigation festlegen (z.B. smooth)",
    "will-change": "Geplante Änderungen für Optimierung angeben",
    "aspect-ratio": "Seitenverhältnis eines Elements festlegen",
    "isolation": "Rendering-Kontext eines Elements isolieren",
    "place-items": "Ausrichtung und Positionierung in Grids und Flexboxen kombinieren",
    "gap": "Abstände zwischen Elementen in Flexbox und Grid steuern",
    "container-type": "Container-Queries aktivieren",
    "container-name": "Container für spezifische Abfragen benennen",
    "user-select": "Textauswahl durch Benutzer erlauben oder verhindern",
    "pointer-events": "Interaktionen mit einem Element steuern",
    "resize": "Größenänderung eines Elements durch Benutzer erlauben oder verbieten",
    "box-sizing": "Berechnungsmodell für Breite und Höhe festlegen",
    "scroll-margin": "Abstand von einem Scrollpunkt definieren",
    "scroll-padding": "Innenabstand bei Scrollpunkten festlegen"
  };

  




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
    
  