import { loadDialogues } from "../../../dialogues.js";

document.getElementById("afficher-metadata").addEventListener("click", afficherMetadata);
document.getElementById("ajouter-coordonnees").addEventListener("click", addGPSMetadata);

if (!sessionStorage.getItem("chevalImage")) {
    const chevalImage = {
        contenu: "../images/cheval.jpg",
        metadata: {
            GPS: {
                Latitude: "48.8566",
                Longitude: "2.3522",
                LatitudeRef: "N",
                LongitudeRef: "E"
            }
        }
    };
    sessionStorage.setItem("chevalImage", JSON.stringify(chevalImage));
    sessionStorage.setItem("derniereImageEnregistree", JSON.stringify(chevalImage));
}

function afficherMetadata() {
    if (sessionStorage.getItem("metadata") === null) {
        loadDialogues(null, 8, "../../dialogues.json");
        sessionStorage.setItem("metadata", "true");
    }
    const derniereImageEnregistree = JSON.parse(sessionStorage.getItem("derniereImageEnregistree"));

    if (!derniereImageEnregistree) {
        afficherNotification("Aucune image enregistrée.");
        return;
    }

    const metadata = derniereImageEnregistree.metadata || {
        GPS: {
            Latitude: "48.8566",
            Longitude: "2.3522",
        }
    };

    let metadataOutput = `📄 Nom de l'image : ${derniereImageEnregistree.contenu}<br>📄 Métadonnées :<br>`;
    for (const tag in metadata) {
        metadataOutput += `<strong>${tag}:</strong> ${JSON.stringify(metadata[tag])}<br>`;
    }
    document.getElementById("metaResult").innerHTML = metadataOutput;
}

function addGPSMetadata() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    if (!latitude || !longitude) {
        afficherNotification("Veuillez entrer des coordonnées GPS valides.");
        return;
    }

    const chevalImage = JSON.parse(sessionStorage.getItem("chevalImage"));

    if (!chevalImage) {
        afficherNotification("Aucune image cheval.jpg enregistrée.");
        return;
    }

    const metadata = {
        GPS: {
            Latitude: latitude,
            Longitude: longitude,
            LatitudeRef: latitude >= 0 ? "N" : "S",
            LongitudeRef: longitude >= 0 ? "E" : "W",
        }
    };

    chevalImage.metadata = metadata;
    sessionStorage.setItem("chevalImage", JSON.stringify(chevalImage));

    afficherNotification("Coordonnées GPS ajoutées avec succès à cheval.jpg.");
    afficherMetadataCheval();
    if (sessionStorage.getItem("connected") === null) {
        loadDialogues(null, 10, "../../dialogues.json");
    }
}

function afficherMetadataCheval() {
    const chevalImage = JSON.parse(sessionStorage.getItem("chevalImage"));

    if (!chevalImage) {
        document.getElementById("chevalMetaResult").innerHTML = "Aucune métadonnée pour cheval.jpg.";
        return;
    }

    const metadata = chevalImage.metadata || {
        GPS: {
            Latitude: "48.8566",
            Longitude: "2.3522",
        }
    };

    let metadataOutput = `📄 Nom de l'image : ${chevalImage.contenu}<br>📄 Métadonnées :<br>`;
    for (const tag in metadata) {
        metadataOutput += `<strong>${tag}:</strong> ${JSON.stringify(metadata[tag])}<br>`;
    }
    document.getElementById("chevalMetaResult").innerHTML = metadataOutput;
}

function afficherNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener("DOMContentLoaded", afficherMetadataCheval);