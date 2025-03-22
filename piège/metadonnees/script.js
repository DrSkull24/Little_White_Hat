// ====================
// 🔹 LIRE LES MÉTADONNÉES
// ====================

document.getElementById("afficher-metadata").addEventListener("click", afficherMetadata);
document.getElementById("ajouter-coordonnees").addEventListener("click", addGPSMetadata);

// Vérifier si l'image cheval.jpg est déjà stockée dans le localStorage
if (!localStorage.getItem("chevalImage")) {
    // Créer l'image cheval.jpg avec des métadonnées par défaut
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
    localStorage.setItem("chevalImage", JSON.stringify(chevalImage));
    localStorage.setItem("derniereImageEnregistree", JSON.stringify(chevalImage));
}

function afficherMetadata() {
    // Récupérer l'image enregistrée depuis le localStorage
    const derniereImageEnregistree = JSON.parse(localStorage.getItem("derniereImageEnregistree"));

    if (!derniereImageEnregistree) {
        afficherNotification("Aucune image enregistrée.");
        return;
    }

    // Récupérer les métadonnées de l'image
    const metadata = derniereImageEnregistree.metadata || {
        GPS: {
            Latitude: "48.8566",
            Longitude: "2.3522",
        }
    };

    // Afficher le nom de l'image et les métadonnées
    let metadataOutput = `📄 Nom de l'image : ${derniereImageEnregistree.contenu}<br>📄 Métadonnées :<br>`;
    for (const tag in metadata) {
        metadataOutput += `<strong>${tag}:</strong> ${JSON.stringify(metadata[tag])}<br>`;
    }
    document.getElementById("metaResult").innerHTML = metadataOutput;
}

// ====================
// 🔹 AJOUTER DES COORDONNÉES GPS À CHEVAL.JPG
// ====================

function addGPSMetadata() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    if (!latitude || !longitude) {
        afficherNotification("Veuillez entrer des coordonnées GPS valides.");
        return;
    }

    const chevalImage = JSON.parse(localStorage.getItem("chevalImage"));

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
    localStorage.setItem("chevalImage", JSON.stringify(chevalImage));

    afficherNotification("Coordonnées GPS ajoutées avec succès à cheval.jpg.");
    afficherMetadataCheval();
}

function afficherMetadataCheval() {
    const chevalImage = JSON.parse(localStorage.getItem("chevalImage"));

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

// Afficher les métadonnées de cheval.jpg au chargement de la page
document.addEventListener("DOMContentLoaded", afficherMetadataCheval);