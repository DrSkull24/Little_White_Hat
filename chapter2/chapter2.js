import { loadDialogues, showDialogue } from '../dialogues.js';

let currentScene = 'printingHouse';

document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const input = document.getElementById("input");
    const form = document.getElementById("commandForm");

    const NETWORKS = [
        { BSSID: "AA:BB:CC:DD:EE:FF", CH: 6, ENCR: "WPA2", POWER: -45, ESSID: "FreeWifi" },
        { BSSID: "11:22:33:44:55:66", CH: 11, ENCR: "WEP", POWER: -60, ESSID: "OldNetwork" },
    ];

    const commands = {
        help: () => {
            return "Commandes disponibles :\n- scan : Scanner les réseaux Wi-Fi\n- attack <cible> : Lancer une attaque sur un réseau\n- clear : Effacer le terminal";
        },
        scan: () => {
            let output = "Scanning for networks...\n";
            output += "--------------------------------\n";
            output += "BSSID              CH  ENCR  POWER  ESSID\n";
            output += "--------------------------------\n";
            NETWORKS.forEach(network => {
                output += `${network.BSSID}  ${network.CH}   ${network.ENCR}   ${network.POWER}   ${network.ESSID}\n`;
            });
            output += "--------------------------------\n";
            output += "Scan completed.";
            return output;
        },
        attack: (target) => {
            const network = NETWORKS.find(net => net.ESSID === target);
            if (!network) {
                return `Erreur : Réseau '${target}' introuvable.`;
            }
            let output = `Selecting target network: ${target}\n`;
            output += "Starting attack...\n";
            output += "--------------------------------\n";
            output += "[+] Sending deauth packets...\n";
            output += "[+] Capturing handshake...\n";
            output += "[!] Handshake captured!\n";
            output += "[+] Cracking password...\n";
            output += "[!] Password found: 'password123'\n";
            output += "--------------------------------\n";
            output += "Attack completed.";

            if (target === "FreeWifi") {
                setTimeout(() => {
                    changeScene('webcam');
                }, 4000); 
            } else {
                setTimeout(() => {
                    showDialogue(2);
                }, 4000); 
            }
            return output;
        },
        clear: () => {
            terminal.innerHTML = ""; 
            return null;
        },
    };

    function handleCommand(event) {
        event.preventDefault();
        const commandLine = input.value.trim();
        if (!commandLine) return;

        const commandElement = document.createElement("div");
        commandElement.className = "command";
        commandElement.textContent = `$ > ${commandLine}`;
        terminal.appendChild(commandElement);

        const [command, ...args] = commandLine.split(" ");
        if (commands[command]) {
            const result = commands[command](args.join(" "));
            if (result) {
                const outputElement = document.createElement("div");
                outputElement.className = "output";
                outputElement.textContent = "";
                let charIndex = 0;
                const typeWriterEffect = setInterval(() => {
                    if (charIndex < result.length) {
                        outputElement.textContent += result[charIndex];
                        charIndex++;
                    } else {
                        clearInterval(typeWriterEffect);
                    }
                }, 10);
                terminal.appendChild(outputElement);
            }
        } else {
            const errorElement = document.createElement("div");
            errorElement.className = "error";
            errorElement.textContent = `Erreur : Commande '${command}' non reconnue.`;
            terminal.appendChild(errorElement);
        }

        terminal.scrollTo(0, terminal.scrollHeight);
        input.value = "";
    }

    form.addEventListener("submit", handleCommand);
    document.getElementById("hack-button").addEventListener("click", hackWebcam);
});

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
    currentScene = sceneId;
}

function goToWifite() {
    changeScene('wifite');
    showDialogue(1);
}

function goToPrintingHouse() {
    changeScene('printingHouse');
}

let camHackDialogueIndex = 3;

function hackWebcam() {
    showDialogue(camHackDialogueIndex++);
    document.getElementById('webcam-video').style.display = 'none';
    document.getElementById('live-text').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('hack-button').style.display = 'none';

    setTimeout(function() {
        document.getElementById('webcam-video').style.display = 'block';
        document.getElementById('live-text').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('hack-button').style.display = 'block';
        if (camHackDialogueIndex === 8) goToPrintingHouse();
        showDialogue(camHackDialogueIndex++);
    }, 10000);
}

loadDialogues(goToWifite);