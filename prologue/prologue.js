import { getCookie, setCookie } from "../cookies.js";
import {loadDialogues, showDialogue} from "../dialogues.js";

let isCleared = false;
let password = 'Lecodeestbienvenulittlewhitehat';
let styleBeforeZoom;
let currentScene = 'desktop';
let laptopVisited = false;

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
}

function manageBackButton(display, functionToCall) {
    let backButton = document.getElementById('backButton');
    backButton.style.display = display;
    backButton.onclick = functionToCall;
    addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            functionToCall();
        }
    });
}

function goToComputer() {
    changeScene('computer');
    document.body.style.backgroundImage = "url('img/computer.png')";
    manageBackButton('block', goToDesktop);
}

function goToLaptop() {
    if (!laptopVisited) {
        laptopVisited = true;
        requestAnimationFrame(() => {
            alert("Vous allez arriver sur votre ordinateur personnel. Il vous servira pour la plupart des énigmes.");
        });
    }
    changeScene('laptop');
    document.body.style.backgroundImage = "url('img/laptopBackground.jpg')";
    manageBackButton('block', goToDesktop);
}


function goToDesktop() {
    changeScene('desktop');
    document.body.style.backgroundImage = "url('img/desktop.jpg')";
    manageBackButton('none', null);
}


function zoomOnObject(object) {
    document.getElementById(currentScene).querySelectorAll('.object').forEach(otherObject => {
        if (otherObject !== object) otherObject.style.display = 'none';
    });
    styleBeforeZoom = object.style;
    object.style.position = 'absolute';
    object.style.top = '25%';
    object.style.left = '25%';
    object.style.width = "50%";
    object.style.height = "50%";
    object.onclick = "null";
    manageBackButton('block', function() {
        zoomOutObject(object);
    });

    if (object.id === 'hiddenQRCode') {
        let btn = document.createElement('button');
        btn.onclick = function() {
            downloadFile(object.src);
        };
        btn.innerHTML = "Télécharger l'image";
        btn.style.fontSize = "15px";
        btn.style.position = 'absolute';
        btn.style.width = '10%';
        btn.style.height = '5%';
        let bounding = object.getBoundingClientRect();
        btn.style.top = bounding.top + bounding.height + 15 + 'px';
        btn.style.left = "45%";
        object.parentElement.appendChild(btn);
    }
}

function zoomOutObject(object) {
    object.style = styleBeforeZoom;
    document.getElementById(currentScene).querySelectorAll('.object').forEach(otherObject => {
        otherObject.style.display = 'block';
    });
    document.getElementById('backButton').style.display = 'none';
    if (object.id === 'hiddenQRCode') {
        object.parentElement.removeChild(object.parentElement.lastChild);
    }
    object.onclick = function() {
        zoomOnObject(object);
    };
}

function downloadFile(fileUrl) {
    if (confirm("vous allez télécharger le fichier")){

        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = fileUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error("Erreur de téléchargement :", error));
    }
}

function clearText(element) {
    if (!isCleared) {
        element.value = '';
        isCleared = true;
    }
}

function handleEnterKey(event, element) {
    if (event.key === 'Enter') {
        event.preventDefault();
        tryPassword(element);
    }
}

function tryPassword(element) {
    let text = element.value;
    if (text == password) {
        goToComputer();
        if (getCookie("Prologue") === null) {
            setCookie("Prologue", "true", 365);
            showDialogue(1);
        }
    } else {
        alert('mot de passe incorrect');
    }
}

function openFolder(element) {
    element.children[0].style.display = 'none';
    element.children[1].style.display = 'none';
    element.children[2].style.display = 'block';
    let folderBackground = element.children[2].children[0];
    let quitFolder = element.children[2].children[1];
    quitFolder.style.left = folderBackground.style.left + folderBackground.width - 30 + 'px';
    quitFolder.style.top = folderBackground.style.top + 10 + "px";
    quitFolder.onclick = function() {
        closeFolder(element);
    }
}

function closeFolder(element) {
    element.children[0].style.display = 'block';
    element.children[1].style.display = 'block';
    element.children[2].style.display = 'none';
}

function openApp(appId, appLink) {
    let app = document.getElementById(appId);
    if (app) {
        app.style.display = 'block';
    } else {
        app = document.createElement("iframe");
        app.src = appLink;
        app.style.position = "absolute";
        app.style.width = "100%";
        app.style.height = "100%";
        app.style.top = "0";
        app.style.left = "0";
        app.style.zIndex = "10";
        app.id = appId;
        document.body.appendChild(app);
    }
    manageBackButton('block', () => closeApp(appId));
}

function closeApp(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.style.display = 'none';
    }
    manageBackButton('block', goToDesktop);
}
function showHints() {
    hintButton.style.display = 'none';
    hintBox.style.display = 'block';
}

function hideHints() {
    hintButton.style.display = 'block';
    hintBox.style.display = 'none';
}

const hintBox = document.getElementById("hint-box");
const hintButton = document.getElementById("hint-button");
hintButton.addEventListener("click", showHints);
document.getElementById("close-hint").addEventListener("click", hideHints);

let passwordTextArea = document.getElementById("passwordTextArea");
passwordTextArea.addEventListener("click", () => clearText(passwordTextArea));
passwordTextArea.addEventListener("keydown", (event) => handleEnterKey(event, passwordTextArea));

document.getElementById("laptopIcon").addEventListener("click", goToLaptop);

let closedFolder = document.getElementById("closedFolder");
closedFolder.addEventListener("click", () => openFolder(closedFolder.parentElement));

let hiddenQRCode = document.getElementById("hiddenQRCode");
hiddenQRCode.addEventListener("click", () => zoomOnObject(hiddenQRCode));

document.getElementById("aperisolve").addEventListener("click", () => openApp("aperisolveWeb", "https://www.aperisolve.com"));
document.getElementById("forensically").addEventListener("click", () => openApp("forensicallyWeb", "https://29a.ch/photo-forensics/#pca"));
document.getElementById("exifReader").addEventListener("click", () => openApp("exifReaderWeb", "https://tools.waytolearnx.com/exif-reader?set_language=Français"));
document.getElementById("computer").children[0].addEventListener("click", () => window.location.href = "../chapter1/chapter1.html");

if (getCookie("Prologue") === null || getCookie("dialogueReset") === "true") {
    loadDialogues();
}
