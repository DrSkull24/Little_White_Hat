// ====================
// 🔹 MESSAGERIE SECRÈTE
// ====================

// Données des utilisateurs et conversations
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

// Variable pour vérifier si l'utilisateur est connecté
let utilisateurConnecte = false;

// Variable pour stocker l'utilisateur actuellement sélectionné
let utilisateurSelectionne = null;

// Coordonnées GPS de l'entrepôt
const entrepotCoordinates = {
    latitude: "48.8606",
    longitude: "2.3376"
};

// Fonction pour gérer la connexion
function seConnecter() {
    const identifiant = document.getElementById("identifiant").value;
    const motDePasse = document.getElementById("mot-de-passe").value;

    if (identifiant === "Bianco" && motDePasse === "Poppy") {
        utilisateurConnecte = true;
        afficherNotification("Connexion réussie.");
        mettreAJourBoutonEnvoi();
    } else {
        afficherNotification("Identifiant ou mot de passe incorrect.");
    }
}

// Fonction pour afficher une notification en bas à droite
function afficherNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Fonction pour mettre à jour le bouton d'envoi de message
function mettreAJourBoutonEnvoi() {
    const boutonEnvoyer = document.getElementById("bouton-envoyer-message");

    if (utilisateurSelectionne && utilisateurConnecte) {
        boutonEnvoyer.textContent = "Envoyer un message";
        boutonEnvoyer.disabled = false;
        boutonEnvoyer.style.backgroundColor = "#007bff"; // Couleur active
        boutonEnvoyer.style.color = "white"; // Couleur du texte active
    } else {
        boutonEnvoyer.textContent = "Sélectionnez un utilisateur et connectez-vous";
        boutonEnvoyer.disabled = true;
        boutonEnvoyer.style.backgroundColor = "#ccc"; // Couleur désactivée
        boutonEnvoyer.style.color = "#666"; // Couleur du texte grisé
    }
}

// Fonction pour afficher une bulle de message temporaire
function afficherBulle(message) {
    const bulle = document.getElementById("bulle-message");
    const bulleTexte = document.getElementById("bulle-texte");
    bulleTexte.textContent = message;
    bulle.style.display = "block";

    // Masquer la bulle après 2 secondes
    setTimeout(() => {
        bulle.style.display = "none";
    }, 2000);
}

// Fonction pour enregistrer une image lorsqu'on clique dessus
function enregistrerImage(image) {
    // Stocker l'image dans le localStorage
    localStorage.setItem("derniereImageEnregistree", JSON.stringify(image));
    console.log("Image enregistrée :", image);

    // Afficher une notification de confirmation
    afficherNotification("Image enregistrée");
}

// Fonction pour afficher la conversation d'un utilisateur
function afficherConversation(utilisateurId) {
    utilisateurSelectionne = conversations.utilisateurs.find((u) => u.id === utilisateurId);
    const messagesDiv = document.getElementById("messages");
    const nomUtilisateur = document.getElementById("nom-utilisateur");

    // Affiche le nom de l'utilisateur
    nomUtilisateur.textContent = `Conversation avec ${utilisateurSelectionne.nom}`;

    // Affiche les messages
    messagesDiv.innerHTML = ""; // Vide les messages précédents
    utilisateurSelectionne.messages.forEach((message) => {
        if (message.type === "texte") {
            const p = document.createElement("p");
            p.textContent = `${message.auteur}: ${message.contenu}`;
            messagesDiv.appendChild(p);
        } else if (message.type === "image") {
            const imgContainer = document.createElement("div");
            imgContainer.className = "message-image-container";

            // Afficher l'image avec le nom de l'expéditeur
            const img = document.createElement("img");
            img.src = message.contenu;
            img.className = "message-image";
            img.addEventListener("click", () => enregistrerImage(message)); // Enregistrer l'image au clic
            imgContainer.appendChild(img);

            // Afficher le nom de l'expéditeur
            const expediteur = document.createElement("p");
            expediteur.textContent = `Envoyé par ${message.auteur}`;
            expediteur.style.fontSize = "0.9em";
            expediteur.style.color = "#666";
            imgContainer.appendChild(expediteur);

            messagesDiv.appendChild(imgContainer);
        }
    });

    // Met à jour le bouton d'envoi de message
    mettreAJourBoutonEnvoi();
}

// Fonction pour afficher une popup
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
        <button onclick="fermerPopup()">Fermer</button>
    `;
    document.body.appendChild(popup);
}

// Fonction pour fermer la popup
function fermerPopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.remove();
    }
}

// Fonction pour envoyer l'image à un utilisateur
function envoyerImageAUtilisateur() {
    if (!utilisateurConnecte) {
        afficherNotification("Vous devez être connecté pour envoyer une image.");
        return;
    }

    const chevalImage = JSON.parse(localStorage.getItem("chevalImage"));

    // Vérifier si l'utilisateur sélectionné est Giallo
    if (utilisateurSelectionne.nom !== "Giallo") {
        afficherNotification("Destinataire non pertinent. Veuillez sélectionner Giallo.");
        return;
    }

    // Vérifier si les coordonnées GPS correspondent à celles de l'entrepôt
    const imageLatitude = chevalImage.metadata?.GPS?.Latitude;
    const imageLongitude = chevalImage.metadata?.GPS?.Longitude;

    if (!imageLatitude || !imageLongitude) {
        afficherNotification("Coordonnées GPS non existantes. Veuillez ajouter les coordonnées GPS.");
        return;
    }

    if (imageLatitude !== entrepotCoordinates.latitude || imageLongitude !== entrepotCoordinates.longitude) {
        afficherNotification("Les coordonnées GPS de cheval.jpg ne correspondent pas à celles de l'entrepôt.");
        return;
    }

    // Simuler l'envoi de l'image et du message texte à Giallo
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

    // Ajouter les messages à la conversation de Giallo
    const gialloConversation = conversations.utilisateurs.find(u => u.nom === "Giallo");
    if (gialloConversation) {
        gialloConversation.messages.push(messageImage);
        gialloConversation.messages.push(messageTexte);
        afficherNotification("Image et message envoyés à Giallo avec succès.");
        afficherConversation(gialloConversation.id); // Rafraîchir l'affichage de la conversation
        afficherPopup("FIN"); // Afficher la popup après l'envoi des messages
    } else {
        afficherNotification("Erreur : Conversation de Giallo introuvable.");
    }
}

// Affiche la liste des utilisateurs
function afficherUtilisateurs() {
    const listeUtilisateurs = document.getElementById("liste-utilisateurs");
    listeUtilisateurs.innerHTML = ""; // Vide la liste

    conversations.utilisateurs.forEach((utilisateur) => {
        const li = document.createElement("li");
        li.textContent = utilisateur.nom;
        li.addEventListener("click", () => {
            afficherConversation(utilisateur.id);
            mettreAJourBoutonEnvoi(); // Mettre à jour le bouton après la sélection de l'utilisateur
        });
        listeUtilisateurs.appendChild(li);
    });
}

// Initialisation de la messagerie
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("messagerie.html")) {
        afficherUtilisateurs();

        // Ajouter un popup personnalisé
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
            <button onclick="fermerPopup()">Fermer</button>
        `;
        document.body.appendChild(popup);

        // Ajouter l'événement pour le bouton d'envoi de message
        const boutonEnvoyer = document.getElementById("bouton-envoyer-message");
        boutonEnvoyer.addEventListener("click", envoyerImageAUtilisateur);

        // Ajouter l'événement pour le bouton d'envoi d'image
        const boutonEnvoyerImage = document.getElementById("bouton-envoyer-image");
        boutonEnvoyerImage.addEventListener("click", envoyerImageAUtilisateur);
    }
});