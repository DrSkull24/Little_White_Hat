const FilesApp = {
    open: function() {
        document.getElementById("files-modal").style.display = "block";
        document.getElementById("file-list").style.display = "block";
        document.getElementById("file-viewer").style.display = "none";
    },
    close: function() {
        document.getElementById("files-modal").style.display = "none";
    },
    openFile: function(title, content) {
        let titleElement = document.getElementById("file-title");
        let contentElement = document.getElementById("file-content");
        let fileList = document.getElementById("file-list");
        let fileViewer = document.getElementById("file-viewer");

        if (!titleElement || !contentElement || !fileList || !fileViewer) {
            console.error("Erreur: Un des éléments nécessaires est introuvable !");
            return;
        }

        titleElement.textContent = title;
        contentElement.innerHTML = content.replace(/\n/g, "<br>"); // ✅ Ajout des sauts de ligne

        fileList.style.display = "none";
        fileViewer.style.display = "block";
    },
    backToFiles: function() {
        document.getElementById("file-list").style.display = "block";
        document.getElementById("file-viewer").style.display = "none";
    }
};


