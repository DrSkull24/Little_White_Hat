let isCleared = false;
let password = 'mdp'

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
    changeBackground(sceneId);
}

function changeBackground(sceneId) {
    const body = document.body;
    if (sceneId === 'desktop') {
        body.style.backgroundImage = "url('img/desktop.jpeg')";
    } else if (sceneId === 'laptop') {
        body.style.backgroundImage = "none";
    } else if (sceneId === 'computer') {
        body.style.backgroundImage = "url('img/computer.png')";
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
    const text = element.value;
    if (text == password) {
        changeScene('computer');
    } else {
        alert('mot de passe incorrect');
    }
}