let isCleared = false;
let password = 'mdp';
let styleBeforeZoom;
let currentScene = 'desktop';

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
    changeBackground(sceneId);
}

function manageBackButton(display, functionToCall) {
    var backButton = document.getElementById('backButton');
    backButton.style.display = display;
    backButton.onclick = functionToCall;
    addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            functionToCall();
        }
    });
}

function changeBackground(sceneId) {
    const body = document.body;
    if (sceneId === 'desktop') {
        body.style.backgroundImage = "url('img/desktop.jpeg')";
        currentScene = 'desktop';
        manageBackButton('none', null);
    } else if (sceneId === 'laptop') {
        body.style.backgroundImage = "url('img/laptopBackground.jpeg')";
        currentScene = 'laptop';
        manageBackButton('block', function() {
            changeScene('desktop');
        });
    } else if (sceneId === 'computer') {
        body.style.backgroundImage = "url('img/computer.png')";
        currentScene = 'computer';
        manageBackButton('block', function() {
            changeScene('desktop');
        });
    }
}

function zoomOnObject(object) {
    document.getElementById(currentScene).querySelectorAll('.object').forEach(otherObject => {
        if (otherObject !== object) otherObject.style.display = 'none';
    });
    styleBeforeZoom = object.style;
    object.style.position = 'absolute';
    object.style.top = '25%';
    object.style.left = '25%';
    object.style.width = "50%";
    object.style.height = "50%";
    object.onclick = "null";
    manageBackButton('block', function() {
        zoomOutObject(object);
    });

    if (object.id === 'hiddenQRCode') {
        btn = document.createElement('button');
        btn.onclick = function() {
            downloadFile(object.src);
        };
        btn.innerHTML = "Télécharger l'image";
        btn.style.fontSize = "15px";
        btn.style.position = 'absolute';
        btn.style.width = '10%';
        btn.style.height = '5%';
        var bounding = object.getBoundingClientRect();
        btn.style.top = bounding.top + bounding.height + 15 + 'px';
        btn.style.left = "45%";
        object.parentElement.appendChild(btn);
    }
}

function zoomOutObject(object) {
    object.style = styleBeforeZoom;
    document.getElementById(currentScene).querySelectorAll('.object').forEach(otherObject => {
        otherObject.style.display = 'block';
    });
    document.getElementById('backButton').style.display = 'none';
    if (object.id === 'hiddenQRCode') {
        object.parentElement.removeChild(object.parentElement.lastChild);
    }
    object.onclick = function() {
        zoomOnObject(object);
    };
}

function downloadFile(fileUrl) {
    if (confirm("vous allez télécharger le fichier")){

        fetch(fileUrl)
            .then(response => response.blob()) // Convertir en blob
            .then(blob => {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = fileUrl; // Nom du fichier téléchargé
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error("Erreur de téléchargement :", error));
    }
}

function clearText(element) {
    if (!isCleared) {
        element.value = '';
        isCleared = true;
    }
}

function handleEnterKey(event, element) {
    if (event.key === 'Enter') {
        event.preventDefault();
        myFunction(element);
    }
}

function myFunction(element) {
    var text = element.value;
    if (text == password) {
        changeScene('computer');
    } else {
        alert('mot de passe incorrect');
    }
}

function openFolder(element) {
    element.children[0].style.display = 'none';
    element.children[1].style.display = 'block';
    var folderBackground = element.children[1].children[0];
    var quitFolder = element.children[1].children[1];
    quitFolder.style.left = folderBackground.style.left + folderBackground.width - 30 + 'px';
    quitFolder.style.top = folderBackground.style.top + 10 + "px";
    quitFolder.onclick = function() {
        closeFolder(element);
    }
}

function closeFolder(element) {
    element.children[0].style.display = 'block';
    element.children[1].style.display = 'none';
}
