import { getCookie, setCookie } from "./cookies.js";

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


document.addEventListener("DOMContentLoaded", function() {
    let username = getCookie("username");
    if (!username) {
        changeUsername();
    } else {
        document.getElementById("username").textContent = username
    }
    document.getElementById("changeUsername").onclick = changeUsername;
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

function changeUsername() {
    let username = prompt("Entrez votre nom pour commencer le jeu");
    if (username) {
        setCookie("username", username, 365);
        document.getElementById("username").textContent = username;
    }
}