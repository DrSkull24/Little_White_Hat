import { setCookie } from "../../../cookies.js";
import { loadDialogues } from "../../../dialogues.js";

const conversations = {
    utilisateurs: [
        {
            id: 1,
            nom: "Rosso",
            messages: [
                { type: "texte", contenu: "...", auteur: "Rosso" },
                { type: "texte", contenu: "Compris, Chef !", auteur: "Bianco" },
                { type: "texte", contenu: "...", auteur: "Rosso" },
                { type: "texte", contenu: "En effet, les informations ont correctement dissimulées.", auteur: "Bianco" },
                { type: "texte", contenu: "... !", auteur: "Rosso" },
                { type: "texte", contenu: "Très bien. Je m'en occupe avec Blu", auteur: "Bianco" },
                { type: "texte", contenu: "...", auteur: "Rosso" },
                { type: "texte", contenu: "Terminé.", auteur: "Bianco" },
            ],
        },
        {
            id: 2,
            nom: "Blu",
            messages: [
                { type: "texte", contenu: "Alors ?", auteur: "Blu" },
                { type: "texte", contenu: "J'ai le feu vert de Rosso.", auteur: "Bianco" },
                { type: "image", contenu: "../images/chien.jpg", auteur: "Bianco", metadata: { GPS: { Nom: "Poppy", Latitude: "48.8584", Longitude: "2.2945" } } },
                { type: "texte", contenu: "Très bien.", auteur: "Blu" },
            ],
        },
        {
            id: 3,
            nom: "Verde",
            messages: [
                { type: "texte", contenu: "Tiens l'un des lieux clé.", auteur: "Verde" },
                { type: "image", contenu: "../images/lapin.jpg", auteur: "Verde", metadata: { GPS: { Latitude: "48.8566", Longitude: "2.3522" } } },
                { type: "texte", contenu: "Merci pour l'info, j'envoie Giallo.", auteur: "Bianco" },
                { type: "texte", contenu: "Tiens, vas-y. Blu t'attends.", auteur: "Bianco" },
                { type: "image", contenu: "../images/chien.jpg", auteur: "Bianco", metadata: { GPS: { Nom: "Poppy", Latitude: "48.8584", Longitude: "2.2945" } } },
                { type: "texte", contenu: "Hmph, toujours avec ton chien. Comme quoi, tu n'es pas qu'une tête pensante avec un regard froid.", auteur: "Verde" },
            ],
        },
        {
            id: 4,
            nom: "Giallo",
            messages: [
                { type: "texte", contenu: "Ta mission est accomplie ?", auteur: "Bianco" },
                { type: "texte", contenu: "C'est bon j'ai detruit tout le matériel du prof", auteur: "Giallo" },
                { type: "texte", contenu: "Bien. On n'a plus à se soucier de ce parasite.", auteur: "Bianco" },
                { type: "texte", contenu: "J'ai des affaires à te confier pour la suite des opérations", auteur: "Bianco" },
                { type: "texte", contenu: "OK.", auteur: "Giallo" },
                { type: "texte", contenu: "Trouve-moi un lieu tranquille.", auteur: "Bianco" },
                { type: "texte", contenu: "Voilà le lieu de rendez-vous", auteur: "Giallo" },
                { type: "image", contenu: "../images/chat.jpg", auteur: "Giallo", metadata: { GPS: { Latitude: "48.8606", Longitude: "2.3376" } } },
                { type: "texte", contenu: "Excellent.", auteur: "Bianco" },
            ],
        },
    ],
};

let utilisateurSelectionne = null;

const entrepotCoordinates = {
    latitude: "48.8606",
    longitude: "2.3376"
};

function seConnecter() {
    const identifiant = document.getElementById("identifiant").value;
    const motDePasse = document.getElementById("mot-de-passe").value;

    if (identifiant === "Bianco" && motDePasse === "Poppy") {
        afficherNotification("Connexion réussie.");
        sessionStorage.setItem("connected", "true");
        mettreAJourBoutonEnvoi();
    } else {
        afficherNotification("Identifiant ou mot de passe incorrect.");
    }
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

function mettreAJourBoutonEnvoi() {
    const boutonEnvoyer = document.getElementById("bouton-envoyer-message");

    if (utilisateurSelectionne && sessionStorage.getItem("connected") === "true") {
        boutonEnvoyer.textContent = "Envoyer un message";
        boutonEnvoyer.disabled = false;
        boutonEnvoyer.style.backgroundColor = "#007bff"; 
        boutonEnvoyer.style.color = "white";
    } else {
        boutonEnvoyer.textContent = "Sélectionnez un utilisateur et connectez-vous";
        boutonEnvoyer.disabled = true;
        boutonEnvoyer.style.backgroundColor = "#ccc";
        boutonEnvoyer.style.color = "#666"; 
    }
}

function afficherBulle(message) {
    const bulle = document.getElementById("bulle-message");
    const bulleTexte = document.getElementById("bulle-texte");
    bulleTexte.textContent = message;
    bulle.style.display = "block";

    setTimeout(() => {
        bulle.style.display = "none";
    }, 2000);
}

function enregistrerImage(image) {
    if (sessionStorage.getItem("derniereImageEnregistree") === null) loadDialogues(null, 7, "../../dialogues.json");
    sessionStorage.setItem("derniereImageEnregistree", JSON.stringify(image));
    console.log("Image enregistrée :", image);

    afficherNotification("Image enregistrée");
}

function afficherConversation(utilisateurId) {
    utilisateurSelectionne = conversations.utilisateurs.find((u) => u.id === utilisateurId);
    const messagesDiv = document.getElementById("messages");
    const nomUtilisateur = document.getElementById("nom-utilisateur");

    nomUtilisateur.textContent = `Conversation avec ${utilisateurSelectionne.nom}`;

    messagesDiv.innerHTML = ""; 
    utilisateurSelectionne.messages.forEach((message) => {
        if (message.type === "texte") {
            const p = document.createElement("p");
            p.textContent = `${message.auteur}: ${message.contenu}`;
            messagesDiv.appendChild(p);
        } else if (message.type === "image") {
            const imgContainer = document.createElement("div");
            imgContainer.className = "message-image-container";

            const img = document.createElement("img");
            img.src = message.contenu;
            img.className = "message-image";
            img.addEventListener("click", () => enregistrerImage(message));
            imgContainer.appendChild(img);

            const expediteur = document.createElement("p");
            expediteur.textContent = `Envoyé par ${message.auteur}`;
            expediteur.style.fontSize = "0.9em";
            expediteur.style.color = "#666";
            imgContainer.appendChild(expediteur);

            messagesDiv.appendChild(imgContainer);
        }
    });

    mettreAJourBoutonEnvoi();
}

function afficherPopup(message) {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "white";
    popup.style.padding = "20px";
    popup.style.border = "1px solid #ccc";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1000";
    popup.innerHTML = `
        <p>${message}</p>
        <button">Fermer</button>
    `;
    document.body.appendChild(popup);
    popup.addEventListener("click", fermerPopup);
}

function fermerPopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.remove();
    }
}

function envoyerImageAUtilisateur() {
    if (sessionStorage.getItem("connected") !== "true") {
        afficherNotification("Vous devez être connecté pour envoyer une image.");
        return;
    }

    const chevalImage = JSON.parse(sessionStorage.getItem("chevalImage"));

    if (utilisateurSelectionne.nom !== "Giallo") {
        afficherNotification("Destinataire non pertinent. Veuillez sélectionner Giallo.");
        return;
    }

    const imageLatitude = chevalImage.metadata?.GPS?.Latitude;
    const imageLongitude = chevalImage.metadata?.GPS?.Longitude;

    if (!imageLatitude || !imageLongitude) {
        afficherNotification("Coordonnées GPS non existantes. Veuillez ajouter les coordonnées GPS.");
        return;
    }

    if (imageLatitude !== entrepotCoordinates.latitude || imageLongitude !== entrepotCoordinates.longitude) {
        loadDialogues(null, 11, "../../dialogues.json");
        return;
    }

    const messageImage = {
        type: "image",
        contenu: "../images/cheval.jpg",
        auteur: "Bianco",
        metadata: chevalImage.metadata
    };

    const messageTexte = {
        type: "texte",
        contenu: "C'est urgent, y a une taupe. Tu sais où te te rendre",
        auteur: "Bianco"
    };

    const gialloConversation = conversations.utilisateurs.find(u => u.nom === "Giallo");
    if (gialloConversation) {
        gialloConversation.messages.push(messageImage);
        gialloConversation.messages.push(messageTexte);
        afficherNotification("Image et message envoyés à Giallo avec succès.");
        afficherConversation(gialloConversation.id); 
        loadDialogues(null, 12, "../../dialogues.json");
        document.getElementById("nextChapter").style.display = "block";
    } else {
        afficherNotification("Erreur : Conversation de Giallo introuvable.");
    }
}

function afficherUtilisateurs() {
    const listeUtilisateurs = document.getElementById("liste-utilisateurs");
    listeUtilisateurs.innerHTML = ""; 

    conversations.utilisateurs.forEach((utilisateur) => {
        const li = document.createElement("li");
        li.textContent = utilisateur.nom;
        li.addEventListener("click", () => {
            afficherConversation(utilisateur.id);
            mettreAJourBoutonEnvoi(); 
        });
        listeUtilisateurs.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    afficherUtilisateurs();
    mettreAJourBoutonEnvoi();
    if (sessionStorage.getItem("connected") === "true") {
        document.getElementById("identifiant").value = "Bianco";
        document.getElementById("mot-de-passe").value = "Poppy";
    }

    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.display = "none";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "white";
    popup.style.padding = "20px";
    popup.style.border = "1px solid #ccc";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1000";
    popup.innerHTML = `
        <p id="popup-message"></p>
        <button>Fermer</button>
    `;
    document.body.appendChild(popup);
    popup.addEventListener("click", fermerPopup);

    document.getElementById("bouton-envoyer-message").addEventListener("click", envoyerImageAUtilisateur);
    document.getElementById("connect").addEventListener("click", seConnecter);
    document.getElementById("nextChapter").addEventListener("click", () => {
        sessionStorage.clear();
        setCookie("chapter3", "completed", 365);
        window.location.href = "../../../chapter4/chapter4.html";
    });
});