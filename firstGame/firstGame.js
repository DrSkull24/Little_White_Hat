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
        body.style.backgroundImage = "none";
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
    manageBackButton('block', function() {
        zoomOutObject(object);
    });
}

function zoomOutObject(object) {
    object.style = styleBeforeZoom;
    document.getElementById(currentScene).querySelectorAll('.object').forEach(otherObject => {
        otherObject.style.display = 'block';
    });
    document.getElementById('backButton').style.display = 'none';
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
