import { getCookie } from './cookies.js';

let dialogues;
let currentDialogueIndex = 0;
let currentDialoguePartIndex = 0;
let dialogueContainer;
let dialogueText;
let speakerName;
let endDialogueFunction


export function loadDialogues(functionToCall = null) {
    fetch('dialogues.json')
        .then(response => response.json())
        .then(dialoguesJSON => {
            const username = getCookie('username');  

            dialoguesJSON.forEach(dialogue => {
                dialogue.forEach(dialoguePart => {
                    dialoguePart.text = dialoguePart.text.replace("{{username}}", username);
                    dialoguePart.name = dialoguePart.name.replace("{{username}}", username);
                });
            });
            
            dialogues = dialoguesJSON;

            dialogueContainer = document.createElement("div");
            dialogueContainer.id = "dialogue-container";
            dialogueContainer.innerHTML = `
                <div id="dialogue-box">
                    <p id="speaker-name"></p>
                    <p id="dialogue-text"></p>
                    <button class="dialogue-btn" id="next-dialogue">Suivant</button>
                    <button class="dialogue-btn" id="skip-dialogues">Passer</button>
                </div>
            `;
            document.body.appendChild(dialogueContainer);

            dialogueText = document.getElementById("dialogue-text");
            speakerName = document.getElementById("speaker-name");

            document.getElementById("next-dialogue").addEventListener("click", nextDialogue);
            document.getElementById("skip-dialogues").addEventListener("click", endDialogues);

            showDialogue(0, functionToCall);
        }).catch(error => console.error('Erreur lors du chargement des dialogues:', error));
}

export function showDialogue(dialoguePartIndex = 0, functionToCall = null) {
    currentDialoguePartIndex = dialoguePartIndex;
    endDialogueFunction = functionToCall;
    const currentDialogue = dialogues[dialoguePartIndex][currentDialogueIndex];
    speakerName.textContent = currentDialogue.name + " :";
    dialogueText.textContent = currentDialogue.text;
    dialogueContainer.style.display = "block";
    currentDialogueIndex++;
  }

function nextDialogue() {
    if (currentDialogueIndex < dialogues[currentDialoguePartIndex].length) {
        showDialogue(currentDialoguePartIndex, endDialogueFunction);
    } else {
        endDialogues();
    }
}

function endDialogues() {
    currentDialogueIndex = 0;
    dialogueContainer.style.display = "none";
    if (endDialogueFunction) endDialogueFunction();
}