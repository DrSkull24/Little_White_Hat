let isCleared = false;
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
    if (text == 'mdp') {
        alert('mot de passe trouvé');
        window.location.href = 'desktop.php';
    } else {
        alert('mot de passe incorrect');
    }
}