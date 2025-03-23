import { getCookie, setCookie, deleteAllCookies } from "./cookies.js";

function selectChapter() {
    const chapters = ["Prologue", "Chapitre 1", "Chapitre 2"];
    const chaptersLinks = ["prologue/prologue.html", "chapter1/chapter1.html", "chapter2/chapter2.html"];
    const chapterSelectionDiv = document.getElementById("chapterSelectionDiv");

    let unlocked = true;
    chapters.forEach((chapter, index) => {
        var button = chapterSelectionDiv.children[index];
        button.textContent = chapter;
        if (unlocked) {
            button.onclick = () => {
                window.location.href = chaptersLinks[index];
            };
            button.className = "unlockedChapter";
        } else {
            button.onclick = () => {
                alert("Ce chapitre n'est pas encore débloqué");
            };
            button.className = "lockedChapter";
        }
        unlocked = getCookie(chapter);
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.style.display = "block";
    closeButton.style.margin = "10px 0";
    closeButton.onclick = () => {
        chapterSelectionDiv.style.display = "none";
    };
    chapterSelectionDiv.style.display = "flex";
}

function changeUsername() {
    let username = prompt("Entrez votre nom pour commencer le jeu");
    if (username) {
        setCookie("username", username, 365);
        document.getElementById("username").textContent = username;
    }
}

function resetGame() {
    if (confirm("Voulez-vous vraiment effacer toutes vos données de jeu ? Cette action est irréversible.")) {
        deleteAllCookies();
        window.location.reload();
    }
}

function openSettings() {
    let settingsDiv = document.getElementById("settingsDiv");
    if (!settingsDiv) {
        settingsDiv = document.createElement("div");
        settingsDiv.id = "settingsDiv";
        settingsDiv.style.display = "flex";

        let settingsTitle = document.createElement("h2");
        settingsTitle.textContent = "Paramètres";
        settingsDiv.appendChild(settingsTitle);

        let closeButton = document.createElement("button");
        closeButton.id = "closeButton";
        closeButton.textContent = "X";
        closeButton.onclick = () => {
            settingsDiv.style.display = "none";
        }
        settingsDiv.appendChild(closeButton);

        let settingsList = document.createElement("ul");
        settingsDiv.appendChild(settingsList);  

        let dialogueReset = document.createElement("li");
        let dialogueResetCheckbox = document.createElement("input");
        dialogueResetCheckbox.type = "checkbox";
        dialogueResetCheckbox.id = "dialogueResetCheckbox";
        dialogueResetCheckbox.checked = getCookie("dialogueReset") === "true";
        dialogueResetCheckbox.onchange = () => {
            setCookie("dialogueReset", dialogueResetCheckbox.checked, 365);
        }
        dialogueReset.appendChild(dialogueResetCheckbox);
        let dialogueResetLabel = document.createElement("label");
        dialogueResetLabel.htmlFor = "dialogueResetCheckbox";
        dialogueResetLabel.textContent = "Réinitialiser les dialogues au raffraîchissement de la page";
        dialogueReset.appendChild(dialogueResetLabel);
        settingsList.appendChild(dialogueReset);

        document.body.appendChild(settingsDiv); 
    } else {
        settingsDiv.style.display = "flex";
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let username = getCookie("username");
    if (!username) {
        changeUsername();
    } else {
        document.getElementById("username").textContent = username
    }
    document.getElementById("changeUsername").onclick = changeUsername;
    document.getElementById("resetButton").onclick = resetGame;
    document.getElementById("settingsButton").onclick = openSettings;
    const text = "Bienvenue dans Little White Hat, un jeu d'investigation numérique. Serez-vous à la hauteur ?";
    let index = 0;
    let startButton = document.getElementById("startButton");
    startButton.style.position = 'absolute';
    startButton.style.top = window.innerHeight - 2*startButton.offsetHeight + 'px';
    startButton.style.left = window.innerWidth/2 - startButton.offsetWidth/2 + 'px';
    startButton.addEventListener("click", selectChapter);
    function typeEffect() {
        if (index < text.length) {
            document.getElementById("intro-text").textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 50);
        }
    }
    typeEffect();
});