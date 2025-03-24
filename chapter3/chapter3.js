import { loadDialogues, showDialogue } from '../dialogues.js';

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
}

function goToComputer() {
    changeScene('computer');
    document.body.style.backgroundImage = 'url("img/computer.png")';
    showDialogue(1);
}

loadDialogues(goToComputer);

document.getElementById("folder").addEventListener("dblclick", () => {
    window.location.href = "decryptage/recherche.html";
    showDialogue(2);
});