const terminal = document.getElementById("terminal");
const input = document.getElementById("input");
let metasploitStarted = false;

function printToTerminal(text) {
    terminal.innerHTML += `<p>${text}</p>`;
    terminal.scrollTop = terminal.scrollHeight;
}

function addsServerAccess() {
    let serverAccess = document.createElement("p");
    serverAccess.id = "serverAccess";
    serverAccess.innerHTML = "Acceder au serveur";
    serverAccess.addEventListener("click", () => window.location.href = "../../piege/index.html");
    document.body.appendChild(serverAccess);
}

// Message de bienvenue
printToTerminal("Bienvenue dans la simulation de terminal. Tapez 'help' pour voir les commandes disponibles.");

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = input.value;
        printToTerminal("$ " + command);
        input.value = "";

        setTimeout(() => {
            if (command === "nmap -sS -sV -T4 192.168.1.0/24") {
                printToTerminal("[*] Scanning for targets...");
                setTimeout(() => {
                    printToTerminal("[+] Found target: 192.168.1.50 (Mafia Server)");
                    printToTerminal("[+] Open ports:");
                    printToTerminal("    - 22/tcp (SSH)");
                    printToTerminal("    - 80/tcp (HTTP - Apache 2.4.49)");
                    printToTerminal("    - 3306/tcp (MySQL)");
                }, 2000);
            } 
            else if (command === "msfconsole") {
                metasploitStarted = true;
                printToTerminal("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
                printToTerminal("MMMMMMMMMMM                MMMMMMMMMM");
                printToTerminal("MMMN$                           vMMMM");
                printToTerminal("MMMNl  MMMMM             MMMMM  JMMMM");
                printToTerminal("MMMNl  MMMMMMMN       NMMMMMMM  JMMMM");
                printToTerminal("MMMNl  MMMMMMMMMNmmmNMMMMMMMMM  JMMMM");
                printToTerminal("MMMNI  MMMMMMMMMMMMMMMMMMMMMMM  jMMMM");
                printToTerminal("MMMNI  MMMMMMMMMMMMMMMMMMMMMMM  jMMMM");
                printToTerminal("MMMNI  MMMMM   MMMMMMM   MMMMM  jMMMM");
                printToTerminal("MMMNI  MMMMM   MMMMMMM   MMMMM  jMMMM");
                printToTerminal("MMMNI  MMMNM   MMMMMMM   MMMMM  jMMMM");
                printToTerminal("MMMNI  WMMMM   MMMMMMM   MMMM#  JMMMM");
                printToTerminal("MMMMR  ?MMNM             MMMMM .dMMMM");
                printToTerminal("MMMMNm `?MMM             MMMM` dMMMMM");
                printToTerminal("MMMMMMN  ?MM             MM?  NMMMMMN");
                printToTerminal("MMMMMMMMNe                 JMMMMMNMMM");
                printToTerminal("MMMMMMMMMMNm,            eMMMMMNMMNMM");
                printToTerminal("MMMMNNMNMMMMMNx        MMMMMMNMMNMMNM");
                printToTerminal("MMMMMMMMNMMNMMMMm+..+MMNMMNMNMMNMMNMM");
                printToTerminal("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
                printToTerminal("       =[ metasploit v6.3.0-dev      ]");
                printToTerminal("+ -- --=[ 2291 exploits - 1205 auxiliary - 404 post       ]");
                printToTerminal("+ -- --=[ 867 payloads - 45 encoders - 11 nops            ]");
                printToTerminal("+ -- --=[ 9 evasion                                       ]");
                printToTerminal("");
                printToTerminal("msf6 > Tapez 'search exploit apache 2.4.49' pour continuer.");
            } 
            else if (command === "search exploit apache 2.4.49" && metasploitStarted) {
                printToTerminal("[*] Searching exploits for Apache 2.4.49...");
                setTimeout(() => {
                    printToTerminal("[+] Found: exploit/unix/http/apache_2.4.49_lfi_rce");
                }, 2000);
            } 
            else if (command === "use exploit/unix/http/apache_2.4.49_lfi_rce" && metasploitStarted) {
                printToTerminal("[*] Using exploit: apache_2.4.49_lfi_rce");
                printToTerminal("[*] Options: set RHOSTS 192.168.1.50");
            } 
            else if (command.startsWith("set RHOSTS") && metasploitStarted) {
                printToTerminal("[*] Target set: " + command.split(" ")[2]);
            } 
            else if (command === "run" && metasploitStarted) {
                printToTerminal("[*] Launching exploit...");
                setTimeout(() => {
                    printToTerminal("[+] Exploit successful! Gaining shell access...");
                    printToTerminal("meterpreter > ls");
                    printToTerminal("drwxr-xr-x  root  root  /var/www/html");
                    printToTerminal("-rw-r--r--  root  root  /etc/passwd");
                    printToTerminal("[+] Found: /admin/");
                    printToTerminal("[+] Found: /controllers/server_dump.php?access=root");
                    printToTerminal("[+] Found: /logs/hidden/backup.zip");
                    addsServerAccess();
                }, 3000);
            }
            else if (command === "help") {
                printToTerminal("Commandes disponibles:");
                printToTerminal("- nmap -sS -sV -T4 192.168.1.0/24 : Scanner le réseau");
                printToTerminal("- msfconsole : Lancer Metasploit Framework");
                printToTerminal("- search exploit [nom] : Rechercher des exploits");
                printToTerminal("- use [exploit] : Utiliser un exploit spécifique");
                printToTerminal("- set RHOSTS [ip] : Définir la cible");
                printToTerminal("- run : Lancer l'exploit");
                printToTerminal("- dir_scanner : Scanner les répertoires");
                printToTerminal("- help : Afficher cette aide");
                printToTerminal("certaines commandes nécessitent d'avoir lancé Metasploit Framework");
            }
            else {
                printToTerminal("[-] Commande inconnue: " + command);
            }
        }, 500);
    }
});