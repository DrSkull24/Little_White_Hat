import { getCookie, setCookie } from "../cookies.js";

let isCleared = false;
let password = 'Lecodeestbienvenulittlewhitehat';
let styleBeforeZoom;
let currentScene = 'desktop';
let laptopVisited = false;
let currentDialogueIndex = 0;
let dialogues;
let stopDialogues = [5, 8];

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
}

function manageBackButton(display, functionToCall) {
    var backButton = document.getElementById('backButton');
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
    currentScene = 'computer';
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
    currentScene = 'laptop';
    let laptop = document.getElementById('laptop');
    laptop.querySelectorAll('.folder').forEach(object => {
        initClosedFolderDisplay(object);
    });
    manageBackButton('block', goToDesktop);
}


function goToDesktop() {
    changeScene('desktop');
    document.body.style.backgroundImage = "url('img/desktop.jpg')";
    currentScene = 'desktop';
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
        var btn = document.createElement('button');
        btn.onclick = function() {
            downloadFile(object.src);
        };
        btn.innerHTML = "Télécharger l'image";
        btn.style.fontSize = "15px";
        btn.style.position = 'absolute';
        btn.style.width = '10%';
        btn.style.height = '5%';
        var bounding = object.getBoundingClientRect();
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
    var text = element.value;
    if (text == password) {
        goToComputer();
        if (getCookie("prologue_finished") === null) {
            setCookie("prologue_finished", "true", 365);
        }
        showDialogue();
    } else {
        alert('mot de passe incorrect');
    }
}

function initClosedFolderDisplay(object) {
    let closedFolder = object.children[0];
    let name = object.children[1];
    let bounding = closedFolder.getBoundingClientRect();
    name.style.position = 'absolute';
    name.style.left = bounding.left + bounding.width / 2 - name.width / 2 + 'px';
    name.style.top = bounding.top + bounding.height - 50 + 'px';
}

function openFolder(element) {
    element.children[0].style.display = 'none';
    element.children[1].style.display = 'none';
    element.children[2].style.display = 'block';
    var folderBackground = element.children[2].children[0];
    var quitFolder = element.children[2].children[1];
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

function openAperiSolve() {
    let aperiSolve = document.getElementById("aperisolveWeb");
    if (aperiSolve) {
        aperiSolve.style.display = 'block';
    } else {
        aperiSolve = document.createElement("iframe");
        aperiSolve.src = "https://www.aperisolve.com";
        aperiSolve.style.position = "absolute";
        aperiSolve.style.width = "100%";
        aperiSolve.style.height = "100%";
        aperiSolve.style.top = "0";
        aperiSolve.style.left = "0";
        aperiSolve.style.zIndex = "10";
        aperiSolve.id = "aperisolveWeb";
        document.body.appendChild(aperiSolve);
    }
    manageBackButton('block', closeAperiSolve);
}

function closeAperiSolve() {
    const aperiSolve = document.getElementById("aperisolveWeb"); 
    if (aperiSolve) {
        aperiSolve.style.display = 'none'; 
    }
    manageBackButton('block', goToDesktop);
}

function openForensically() {
    let forensically = document.getElementById("forensicallyWeb");
    if (forensically) {
        forensically.style.display = 'block';
    } else {
        forensically = document.createElement("iframe");
        forensically.src = "https://29a.ch/photo-forensics/#pca";
        forensically.style.position = "absolute";
        forensically.style.width = "100%";
        forensically.style.height = "100%";
        forensically.style.top = "0";
        forensically.style.left = "0";
        forensically.style.zIndex = "10";
        forensically.id = "forensicallyWeb";
        document.body.appendChild(forensically);
    }
    manageBackButton('block', closeForensically);
}

function closeForensically() {
    const forensically = document.getElementById("forensicallyWeb"); 
    if (forensically) {
        forensically.style.display = 'none'; 
    }
    manageBackButton('block', goToDesktop);
}

fetch('dialogues.json')
  .then(response => response.json())
  .then(dialoguesJSON => {
    const username = getCookie('username');  

    dialoguesJSON.forEach(dialogue => {
      if (dialogue.name.includes("{{username}}")) {
        dialogue.name = dialogue.name.replace("{{username}}", username);
      }
    });
    
    dialogues = dialoguesJSON;
    showDialogue();
  })
  .catch(error => console.error('Erreur lors du chargement des dialogues:', error));

const dialogueContainer = document.getElementById("dialogue-container");
const dialogueText = document.getElementById("dialogue-text");
const speakerName = document.getElementById("speaker-name");

function showDialogue() {
    const currentDialogue = dialogues[currentDialogueIndex];
    speakerName.textContent = currentDialogue.name + " :";
    dialogueText.textContent = currentDialogue.text;
    dialogueContainer.style.display = "block";
  }
  
function nextDialogue() {
    currentDialogueIndex++;
    if (currentDialogueIndex < dialogues.length && currentDialogueIndex !== 5) {
        showDialogue();
    } else {
        dialogueContainer.style.display = "none";
    }
}

function skipDialogues() {
    while (!stopDialogues.includes(currentDialogueIndex)) {
        currentDialogueIndex++;
    }
    dialogueContainer.style.display = "none";
}

document.getElementById("next-dialogue").addEventListener("click", nextDialogue);
document.getElementById("skip-dialogues").addEventListener("click", skipDialogues);

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

document.getElementById("aperisolve").addEventListener("click", openAperiSolve);

document.getElementById("forensically").addEventListener("click", openForensically);