let isCleared = false;
let password = 'mdp'
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
        window.location.href = 'desktop.php';
    } else {
        alert('mot de passe incorrect');
    }
}