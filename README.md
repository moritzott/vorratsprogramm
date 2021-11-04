# H. Lohse Vorratsverwaltung und Warenmanagement

<!-- Hier ein Screenshot -->

## Beschreibung
 Ob für den Corona-Keller, den nächsten Stromausfall oder den totalen Blackout: **die H. Lohse - Vorratsverwaltung**  begleitet Sie zuverlässig und praktikabel beim Verwalten Ihres Vorrates. Fügen Sie neue Produkte hinzu, bearbeiten und löschen Sie Produkte, lassen Sie sich den Warenbestand anzeigen oder eine Liste mit Produkten ausgeben, die bald ablaufen werden! All dies geht mit **H. Lohse - Vorratsverwaltung**!
                                
## Namensgebung
Namensgeber für die Anwendung ist die Figur Hermann Lohse aus Loriots Film *Pappa ante portas*. Wer kennt nicht die Szene, in der Herr Lohse Schreibmaschinenpapier für die nächsten 40 Jahre eingekauft hat? Der perfekte Namensgeber, wenn es um Vorratsverwaltung und Warenmanagement geht!

## Live Demo
Der aktuelle Projektstand kann live im Web getestet werden:
[Live-Demo](https://moritzott.github.io/vorratsprogramm/)

## Technische Informationen
<!-- Speicherung in LocalStorage -->
* Die Anwendung ist eine normale clientseitige Webanwendung mit HTML, CSS und JS.
* Zum Speichern und Abrufen der Produkte und Waren wird der *localStorage* benutzt. Produkte werden mit einer ID als Schlüssel und den Produktinformationen (JSON) als Wert in den localStorage geschrieben (und wieder ausgelesen); siehe folgendes Beispiel:

```javascript
#ID234801 : {
    "kategorie": "Essen",
    "name": "Knorr Kartoffelcremesuppe",
    "menge": "300",
    "mengeneinheit": "g",
    "mhd": "2026-12-31",
}
```
* Die Anwendung wird in *Android Studio* in eine Android-Anwendung gepackt (damit sie offline funktioniert). Dabei wird ein ChromeBrowser-Objekt erzeugt, das die statischen Seiten der Anwendung öffnet und nutzbar macht. Zum Schluss wird eine installierbare APK-Datei erzeugt.
* Daneben soll auch eine Desktop-Version mit electronJS erstellt werden.
* Hier auf Github ist der Code der statischen Anwendung publiziert, der dann in eine Android-Anwendung oder electron-Anwendung gepackt wird.

## Installation
* Beschreibung folgt, sobald Anwendung für Produktivbetrieb geeignet ist

## Noch zu machen
* [x] Webanwendung mit HTML, CSS, JS erstellen
* [x] CRUD-Anwendung mit LocalStorage umsetzen
* [ ] für mobile Geräte optimieren (Tabellen!)
* [ ] Vorrat (localStorage) in Datei exportieren. Damit auch ein Import einer Vorratsdatei durchgeführt werden kann.
* [ ] Debug-Log-Nachrichten entfernen
* [ ] Desktop-Anwendung mit electronJS erstellen
* [ ] Abgleichen mit Empfehlungen des Bundesamtes für Bevölkerungsschutz und Katastrophenhilfe
* [ ] mit Android Studio eine Android App daraus bauen
* [ ] APK-Datei in App-Stores bringen


## Projektstand
* im Aufbau (Anfang)

## Version
H. Lohse Vorratsverwaltung & Warenmanagement SPA v0.0.1-alpha
