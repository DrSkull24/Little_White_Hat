document.addEventListener("DOMContentLoaded", function () {
    fetch("logs.txt")
        .then(response => response.text())
        .then(text => {
            const logs = text.split("\n");
            displayLogs(logs);
        });
});

function displayLogs(logs) {
    const logContainer = document.getElementById("log-container");
    logContainer.textContent = logs.join("\n"); // Affiche tous les logs d'un coup
}

// Base de données étendue avec les coordonnées GPS
const macDatabase = {
    "00:14:22:01:23:45": { lieu: "Café", latitude: "48.8566", longitude: "2.3522" },
    "00:16:17:02:34:56": { lieu: "Bureau", latitude: "48.8584", longitude: "2.2945" },
    "00:18:19:03:45:67": { lieu: "Entrepôt", latitude: "48.8606", longitude: "2.3376" },
    "00:20:21:04:56:78": { lieu: "Imprimerie", latitude: "48.8625", longitude: "2.2874" },
    "00:22:23:05:67:89": { lieu: "Pizzeria", latitude: "48.8643", longitude: "2.3201" }
};

function lookupMac() {
    const inputMac = document.getElementById("mac-input").value.trim();
    const result = macDatabase[inputMac] || { lieu: "Localisation inconnue", latitude: "N/A", longitude: "N/A" };

    // Afficher le lieu
    document.getElementById("location-result").innerText = "Lieu : " + result.lieu;

    // Afficher les coordonnées GPS
    document.getElementById("gps-coordinates").innerText = 
        `Coordonnées GPS : Latitude ${result.latitude}, Longitude ${result.longitude}`;
}

function openToolbox() {
    document.getElementById("toolbox-popup").style.display = "block";
}

function closeToolbox() {
    document.getElementById("toolbox-popup").style.display = "none";
}

function openTool(tool) {
    closeToolbox(); 
    if (tool === "mac-lookup") {
        document.getElementById("mac-tool").style.display = "block";
    }
}

function closeTool() {
    document.getElementById("mac-tool").style.display = "none";
}