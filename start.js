window.onload = function() {
    let startButton = document.getElementById("startButton");
    startButton.style.position = 'absolute';
    startButton.style.top = window.innerHeight - 2*startButton.offsetHeight + 'px';
    startButton.style.left = window.innerWidth/2 - startButton.offsetWidth/2 + 'px';
};

document.addEventListener("DOMContentLoaded", function() {
    const text = "Bienvenue dans Little White Hat, un jeu d'investigation numérique. Serez-vous à la hauteur ?";
    let index = 0;
    function typeEffect() {
        if (index < text.length) {
            document.getElementById("intro-text").textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 50);
        }
    }
    typeEffect();
});