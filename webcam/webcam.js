navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    document.getElementById('video').srcObject = stream;
})
.catch(err => {
    console.error("Erreur d'accès à la caméra :", err);
    document.getElementById('error-message').textContent = "Impossible d'accéder à la caméra.";
});