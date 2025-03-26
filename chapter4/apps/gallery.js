const GalleryApp = {
    open: function() {
        document.getElementById("gallery-modal").style.display = "block";
    },
    
    close: function() {
        document.getElementById("gallery-modal").style.display = "none";
    },

    viewImage: function(src) {
        let img = document.getElementById("fullscreen-img");

        if (src) {
            img.src = src;
            document.getElementById("fullscreen-view").style.display = "flex";
        }
    },

    closeFullscreen: function() {
        document.getElementById("fullscreen-view").style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const photos = [
        { name: "1.jpg", date: "2024-04-18", time: "14:30", size: "2.5 MB", dimensions: "1920x1080" },
        { name: "image_sombre.jpg", date: "2024-04-18", time: "09:15", size: "3.1 MB", dimensions: "2560x1440" },
        { name: "menu_pizza.jpg", date: "2024-04-17", time: "20:45", size: "1.8 MB", dimensions: "1280x720" },
        { name: "1.jpg", date: "2024-04-17", time: "10:00", size: "2.2 MB", dimensions: "1920x1080" },
    ];

    // Trier les photos par date (descendant) puis par heure (descendant)
    photos.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time); // Trier par heure descendante
        }
        return b.date.localeCompare(a.date); // Trier par date descendante
    });

    const galleryGrid = document.querySelector(".gallery-grid");
    const modal = document.querySelector(".photo-modal");
    const modalImage = document.querySelector(".modal-image");
    const detailsBtn = document.querySelector(".details-btn");
    const detailsDiv = document.querySelector(".photo-details");
    const closeModal = document.querySelector(".close-modal");

    // Affichage des images dans la galerie
    photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = `${photo.name}`; // Remplace "images/" par le bon chemin
        img.alt = photo.name;
        img.dataset.info = JSON.stringify(photo);
        galleryGrid.appendChild(img);

        // Ouvrir la modale au clic sur une image
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalImage.dataset.info = img.dataset.info;
            detailsDiv.style.display = "none"; // Masquer les détails au début
        });
    });

    // Afficher les détails quand on clique sur "Détails"
    detailsBtn.addEventListener("click", () => {
        const photoInfo = JSON.parse(modalImage.dataset.info);
        detailsDiv.innerHTML = `
            <p><strong>Nom :</strong> ${photoInfo.name}</p>
            <p><strong>Date :</strong> ${photoInfo.date} à ${photoInfo.time}</p>
            <p><strong>Dimensions :</strong> ${photoInfo.dimensions}</p>
            <p><strong>Taille :</strong> ${photoInfo.size}</p>
        `;
        detailsDiv.style.display = "block";
    });

    // Fermer la modale
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fermer la modale en cliquant à l'extérieur
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
