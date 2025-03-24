import { loadDialogues, showDialogue } from "../../dialogues.js";

const fileNames = [
    "fichiers/affaires.txt",
    "fichiers/aventure_spatiale.txt",
    "fichiers/bleu.txt",
    "fichiers/civilisations_perdues.txt",
    "fichiers/forensique.txt",
    "fichiers/france.txt",
    "fichiers/ia.txt",
    "fichiers/mandarine.txt",
    "fichiers/organisation.txt",
    "fichiers/pizza.txt",
    "fichiers/profondeurs.txt",
    "fichiers/quantique.txt",
    "fichiers/robots.txt"
];

const MAX_CHARS_PER_LINE = 80;

const SECRET_KEY = "NotteStellata";

const HIDDEN_FILE = "fichiers/affaires_cachees.txt";

function loadFiles() {
    const fileListElement = document.getElementById("file-list");
    fileListElement.innerHTML = "";

    fileNames.forEach(fileName => {
        fetch(fileName)
            .then(response => response.text())
            .then(content => {
                const fileElement = document.createElement("div");
                fileElement.className = "file";
                fileElement.textContent = `📄 ${fileName.split("/")[1]}`;
                fileElement.addEventListener("click", () => displayFileContent(content));
                fileListElement.appendChild(fileElement);
            })
            .catch(error => console.error("Erreur de chargement du fichier :", error));
    });
}

function displayFileContent(content) {
    let formattedContent = "";
    let currentLineLength = 0;

    for (let i = 0; i < content.length; i++) {
        formattedContent += content[i];
        currentLineLength++;

        if (currentLineLength >= MAX_CHARS_PER_LINE && content[i] === " ") {
            formattedContent += "\n";
            currentLineLength = 0;
        }
    }

    document.getElementById("file-output").textContent = formattedContent.trim();
}

function openToolbox() {
    document.getElementById("toolbox-popup").style.display = "block";
}

function closeToolbox() {
    document.getElementById("toolbox-popup").style.display = "none";
}

let activeTool = null;

function openTool(tool) {
    closeTool();

    activeTool = tool;

    if (tool === "search") {
        document.getElementById("search-tool").style.display = "block";
    } else if (tool === "decrypt") {
        document.getElementById("decrypt-tool").style.display = "block";
    } else if (tool === "analyze") {
        document.getElementById("analyze-tool").style.display = "block";
    }
}

function closeTool() {
    document.getElementById("search-tool").style.display = "none";
    document.getElementById("decrypt-tool").style.display = "none";
    document.getElementById("analyze-tool").style.display = "none";

    document.getElementById("search-results").innerHTML = "";
    document.getElementById("decrypt-message").textContent = "";
    document.getElementById("analyze-results").innerHTML = "";

    activeTool = null;
}

function searchKeyword() {
    const keyword = document.getElementById("search-keyword").value.toLowerCase();
    const searchResultsElement = document.getElementById("search-results");
    searchResultsElement.innerHTML = "<p>Recherche en cours...</p>";

    setTimeout(() => {
        let results = [];
        fileNames.forEach(fileName => {
            fetch(fileName)
                .then(response => response.text())
                .then(content => {
                    const lines = content.split("\n");
                    lines.forEach((line, index) => {
                        if (line.toLowerCase().includes(keyword)) {
                            const highlightedLine = line.replace(
                                new RegExp(keyword, "gi"),
                                match => `<span style="background-color: yellow; color: black;">${match}</span>`
                            );
                            results.push(`
                                <li>
                                    <strong>${fileName.split("/")[1]}</strong> (ligne ${index + 1}) :
                                    <blockquote>${highlightedLine}</blockquote>
                                </li>
                            `);
                        }
                    });
                })
                .catch(error => console.error("Erreur de chargement du fichier :", error))
                .finally(() => {
                    if (results.length > 0) {
                        searchResultsElement.innerHTML = `
                            <p>Résultats de la recherche pour "${keyword}" :</p>
                            <ul>${results.join("")}</ul>
                        `;
                    } else {
                        searchResultsElement.innerHTML = `<p>Aucun résultat trouvé pour "${keyword}".</p>`;
                    }
                });
        });
    }, 1000);
}

function decryptFile() {
    const fileName = document.getElementById("file-name").value;
    const key = document.getElementById("decrypt-key").value;
    const messageElement = document.getElementById("decrypt-message");
    const accessServerBtn = document.getElementById("access-server-btn");

    if (fileName === "affaires.txt" && key === SECRET_KEY) {
        fetch(HIDDEN_FILE)
            .then(response => response.text())
            .then(content => {
                document.getElementById("file-output").textContent = content;
                messageElement.textContent = "Fichier décrypté avec succès !";
                messageElement.style.color = "#4CAF50";
                accessServerBtn.style.display = "block";
            })
            .catch(error => {
                console.error("Erreur de chargement du fichier caché :", error);
                messageElement.textContent = "Erreur lors du décryptage.";
                messageElement.style.color = "#ff5555";
            });
    } else {
        messageElement.textContent = "Nom de fichier ou clé incorrecte. Indice : Le mot de passe est lié à la pizzeria.";
        messageElement.style.color = "#ff5555";
    }
}

function accessServer() {
    window.location.href = "../mafiaserver/index.html";
}

function analyzeFile() {
    const analyzeResultsElement = document.getElementById("analyze-results");
    const progressBar = document.querySelector(".progress-bar .progress");

    analyzeResultsElement.innerHTML = "<p>Analyse en cours...</p>";
    progressBar.style.width = "0";

    setTimeout(() => {
        progressBar.style.width = "100%";
    }, 100);

    setTimeout(() => {
        analyzeResultsElement.innerHTML = `
            <p>Résultat de l'analyse :</p>
            <ul>
                <li>Fichier analysé : <strong>affaires.txt</strong></li>
                <li>Statut : <span style="color: red;">Crypté</span></li>
                <li>Type de cryptage : AES-256 avec signature CRYPTED_V1</li>
                <li>Recommandation : Utilisez l'outil de décryptage pour accéder au contenu.</li>
            </ul>
        `;
    }, 2000);
}

loadFiles();
loadDialogues();

document.getElementById("toolbox-icon").addEventListener("click", () => openToolbox());
document.getElementById("toolbox-close-btn").addEventListener("click", () => closeToolbox());
document.getElementById("search").addEventListener("click", () => openTool("search"));
document.getElementById("decrypt").addEventListener("click", () => openTool("decrypt"));
document.getElementById("analyze").addEventListener("click", () => openTool("analyze"));
document.getElementById("search-close-btn").addEventListener("click", () => closeTool());
document.getElementById("decrypt-close-btn").addEventListener("click", () => closeTool());
document.getElementById("analyze-close-btn").addEventListener("click", () => closeTool());
document.getElementById("search-btn").addEventListener("click", () => searchKeyword());
document.getElementById("decrypt-btn").addEventListener("click", () => decryptFile());
document.getElementById("analyze-btn").addEventListener("click", () => analyzeFile());
document.getElementById("access-server-btn").addEventListener("click", () => accessServer());