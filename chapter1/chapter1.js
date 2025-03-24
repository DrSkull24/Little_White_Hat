
import { setCookie } from "../cookies.js";
import {loadDialogues, showDialogue} from "../dialogues.js";

let currentScene = 'laboratory';
let printingHouseFound = false;

function manageBackButton(display, functionToCall = null) {
    let backButton = document.getElementById('backButton');
    backButton.style.display = display;
    backButton.onclick = functionToCall;
    addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            functionToCall();
        }
    });
}

function changeScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
    currentScene = sceneId;
}

function goToHouseEntrance() {
    changeScene('houseEntrance');
    document.body.style.backgroundImage = "url('img/houseEntrance.jpeg')";
    showDialogue(1, goToHouse);
}

function goToHouse() {
    changeScene('house');
    document.body.style.backgroundImage = "url('img/house.jpeg')";
    showDialogue(2, inspectorArrives);
}

function inspectorArrives() {
    document.getElementById('inspector').style.transform = 'translateX(-100%)';
    document.getElementById('inspector').style.transition = 'transform 1s';
    showDialogue(3, phoneRings);
}

function phoneRings() {
    let phoneSound = document.getElementById('phoneSound');
    phoneSound.style.display = 'block';
    
    let count = 0;
    const maxBlinks = 5;
    const interval = setInterval(() => {
        phoneSound.style.opacity = phoneSound.style.opacity === "0" ? "1" : "0";
        count++;
        if (count >= maxBlinks * 2) { 
            clearInterval(interval);
            phoneSound.style.display = 'none'; 
        }
    }, 500);
    showDialogue(4, showPhone);
}

function showPhone() {
    document.getElementById('phone').style.display = 'none';
    document.getElementById('phoneSound').style.display = 'none';
    document.getElementById('smartphone').style.display = 'block';
    showDialogue(5);
}

function backFromTracking() {
    changeScene('house');
    document.body.style.backgroundImage = "url('img/house.jpeg')";
    manageBackButton('none');
    if (printingHouseFound) {
        showDialogue(6);
        setCookie('Chapter1', 'true', 365);
        document.getElementById("nextChapter").style.display = "block";
    }
}

function track() {
    changeScene('track');
    document.body.style.backgroundImage = "none";
    manageBackButton('block', backFromTracking);
}

function startTracking() {
    document.getElementById("phoneInput").value.trim();
    
    document.getElementById("status").innerHTML = "🔍 Scan en cours...";
    document.getElementById("status").classList.add("scan");
        
    let phone = "+33 6 45 78 12 90";

    setTimeout(() => {
        if (document.getElementById("phoneInput").value.trim() !== phone) {
            document.getElementById("status").innerHTML = "❌ Numéro de téléphone incorrect";
            document.getElementById("status").classList.remove("scan");
            return;
        } else {
            printingHouseFound = true;
            let name = "Imprimerie GraphiPrint";
            let city = "Paris";
            let lat = 48.841010;
            let lon = 2.309650;
            let stat = document.getElementById("status");
            stat.innerHTML = "📍 Dernière localisation confirmée :<br> <strong>" + name;
            stat.innerHTML += " (" + city + ")<br>📞 <strong>" + phone + "</strong>";

            document.getElementById("map").style.display = "block";

            let map = L.map('map').setView([lat, lon], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`📍 ${name} (${city})<br>📞 ${phone}`)
                .openPopup();
        }
    }, 3000);
}

document.getElementById("phoneNotification").addEventListener("click", track);
document.getElementById("trackButton").addEventListener("click", startTracking);
document.getElementById("nextChapter").addEventListener("click", () => window.location.href = "../chapter2/chapter2.html");

loadDialogues(goToHouseEntrance);