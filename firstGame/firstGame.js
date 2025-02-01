let isCleared = false;
let password = 'mdp';
let styleBeforeZoom;
let currentScene = 'desktop';

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
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

function goToComputer() {
    changeScene('computer');
    document.body.style.backgroundImage = "url('img/computer.png')";
    currentScene = 'computer';
    manageBackButton('block', function () {
        goToDesktop();
    });
}

function goToLaptop() {
    changeScene('laptop');
    document.body.style.backgroundImage = "url('img/laptopBackground.jpeg')";
    currentScene = 'laptop';
    let laptop = document.getElementById('laptop');
    laptop.querySelectorAll('.folder').forEach(object => {
        initClosedFolderDisplay(object);
    });
    manageBackButton('block', function () {
        goToDesktop();
    });
}


function goToDesktop() {
    changeScene('desktop');
    document.body.style.backgroundImage = "url('img/desktop.jpeg')";
    currentScene = 'desktop';
    manageBackButton('none', null);
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
        tryPassword(element);
    }
}

function tryPassword(element) {
    var text = element.value;
    if (text == password) {
        goToComputer();
    } else {
        alert('mot de passe incorrect');
    }
}

function initClosedFolderDisplay(object) {
    let closedFolder = object.children[0];
    let name = object.children[1];
    let bounding = closedFolder.getBoundingClientRect();
    name.style.position = 'absolute';
    name.style.left = bounding.left + bounding.width / 2 - name.width / 2 + 'px';
    name.style.top = bounding.top + bounding.height - 50 + 'px';
}

function openFolder(element) {
    element.children[0].style.display = 'none';
    element.children[1].style.display = 'none';
    element.children[2].style.display = 'block';
    var folderBackground = element.children[2].children[0];
    var quitFolder = element.children[2].children[1];
    quitFolder.style.left = folderBackground.style.left + folderBackground.width - 30 + 'px';
    quitFolder.style.top = folderBackground.style.top + 10 + "px";
    quitFolder.onclick = function() {
        closeFolder(element);
    }
}

function closeFolder(element) {
    element.children[0].style.display = 'block';
    element.children[1].style.display = 'block';
    element.children[2].style.display = 'none';
}
