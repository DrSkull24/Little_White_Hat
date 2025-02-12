import { getCookie, setCookie } from "./cookies.js";

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
    setCookie("username", username, 365);
    document.getElementById("username").textContent = username;
}